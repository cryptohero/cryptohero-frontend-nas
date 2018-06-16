import { BigNumber } from 'bignumber.js';
import heroProfile from '@/config/cards.json';// '@/heroProfile.json';
import Contract from './contract';

import NebPay from 'nebpay.js';

const nebPay = new NebPay();

function getCardInfoByHeroId(id, tokenId) {
  const basic = heroProfile[id];
  if (!basic) {
    console.error(`error detected id is ${id}`);
  }
  const cardImage = {
    code: id,
    front: `http://test.cdn.hackx.org/heros/${id}.jpg`,
    back: `http://test.cdn.hackx.org/back/back_${id}.jpg`,
    tokenId,
  };
  return Object.assign(basic, cardImage);
  // return basic;
}

export default class LinkIdolContract extends Contract {
  constructor() {
    super({
      // contractAddress: 'n1jkpnTHaPeEm8S7sQSWf2R4n5WrSebonZ3',
      // contractAddress: 'n1dwSSgbeZEGV81GWhdQmN5XfD4Bt2WDSb7',
      contractAddress: 'n1gpvXuBn8PoxgwpnyYD9zzE4MUwfPqSijh',
      network: 'testnet',
    });
  }

  async draw(referrer = '', value) {
    const t = this.call({
      functionName: 'draw',
      value: new BigNumber(value).times(1000000000000000000).toString(),
      args: [referrer],
    }).then(console.info);
    console.log(`call return:${t}`);
    // const result = await this.send(
    //   {
    //     functionName: 'multiDraw',
    //     value,
    //     data: [referrer],
    //   });
    return new Promise((resolve) => {
      const result = this.send(
        {
          functionName: 'draw',
          value,
          data: [referrer],
          options: {
            callback: NebPay.config.testnetUrl,
            listener(serialNumber, data) {
              console.log(`serialNumberrrr:${serialNumber} data: ${JSON.stringify(data)}`);
              if (data === 'Error: Transaction rejected by user' || data === false || data === true) {
                resolve('cancel');
              } else {
                resolve(serialNumber);
              }
              // 返回式样：
              // serialNumber:MiTRVkmRZOx0anWMZTgwhpJGrm50LHYr data: false (点二维码下方取消支付时显示)
              // serialNumber:MiTRVkmRZOx0anWMZTgwhpJGrm50LHYr data: "Error: Transaction rejected by user"
              // serialNumber:Nqjj6WPtQvcKxUf0OlCVRKYadqYUHI7r data: {"txhash":"f7a0316f3f7b74f493d008a6fc8f058e7b8da0238453f42a00e5c025820098ab","contract_address":""}
              // resolve(serialNumber);
            },
          },
        });
      console.log(`send: ${result}`);
    });
    // return result;
  }

  async getDrawCardsLeft() {
    const result = await this.call({ functionName: 'getCardsLeft' });
    return JSON.parse(result);
  }

  async getDrawPrice() {
    const result = await this.call({ functionName: 'getDrawPrice' });
    return JSON.parse(result);
  }

  async getTokenIDsByAddress(address) {
    const result = await this.call(
      {
        functionName: 'getTokenIDsByAddress',
        args: [address],
      });
    return JSON.parse(result);
  }
  async getCardInfoByTokenId(token) {
    const heroId = await this.call(
      {
        functionName: 'getCardIdByTokenId',
        args: [token],
      });
    return heroProfile[heroId];
  }

  async getUserCards(address) {
    const tokenIds = await this.getTokenIDsByAddress(address);
    console.error(tokenIds);
    const result = await Promise.all(tokenIds.map(async (token) => {
      const heroId = await this.call(
        {
          functionName: 'getCardIdByTokenId',
          args: [token],
        });
      return getCardInfoByHeroId(heroId, token);
    }));
    return result;
  }

  async getCarInfo(heroId) {
    return this.getCardInfoByHeroId(heroId);
  }
  async buyToken(id) {
    const result = await this.send(
      {
        functionName: 'buyToken',
        data: [id],
      });
    return JSON.parse(result);
  }
  async setTokenPrice({ tokenId, value }) {
    const result = await this.send(
      {
        functionName: 'setTokenPrice',
        data: [tokenId, value],
      });
    console.log(result);
    return JSON.parse(result);
  }
  async claim() {
    const result = await this.send(
      {
        functionName: 'claim',
        args: [],
      });
    return JSON.parse(result);
  }
  async ownerOf(tokenId) { // added by Dawn
    const owner = await this.call({
      functionName: 'ownerOf',
      args: [tokenId],
    });
    return JSON.parse(owner);
  }
  async priceOf(tokenId) { // added by Dawn
    const price = await this.call({
      functionName: 'priceOf',
      args: [tokenId],
    });
    return JSON.parse(price);
  }

  async getCarInfoByTokenId(tokenIds) { // added by Dawn
    const result = await Promise.all(tokenIds.map(async (token) => {
      const heroId = await this.call(
        {
          functionName: 'getCardIdByTokenId',
          args: [token],
        });
      return getCardInfoByHeroId(heroId, token);
    }));
    return result;
  }

  async checkSerialNumber(sn) {
    return await nebPay.queryPayInfo(sn, {
      callback: NebPay.config.testnetUrl,
    });
    // .then(function (resp) {
    //       console.log("snrespres:"+resp);
    // })
    // .catch(function (err) {
    //       console.log("snrespres:"+err);
    // });
  }
}
