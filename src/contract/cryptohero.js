import { BigNumber } from 'bignumber.js';
import heroProfile from '@/config/cards.json';// '@/heroProfile.json';
import Contract from './contract';

function getCardInfoByHeroId(id) {
  const str = `Card Hero id ${id}`;
  console.error(str);
  const basic = heroProfile[id];
  const cardImage = {
    front: `http://test.cdn.hackx.org/heros/${id}.jpg`,
    back: `http://test.cdn.hackx.org/back/back_${id}.jpg`,
  };
  return Object.assign(basic, cardImage);
  // return basic;
}

export default class LinkIdolContract extends Contract {
  constructor() {
    super({
      contractAddress: 'n1jkpnTHaPeEm8S7sQSWf2R4n5WrSebonZ3',
      network: 'testnet',
    });
  }

  async draw(referrer = 'n1MmUacQExJwkD1xHggwaEvTpKgUeSmV4Af', value) {
    this.call({
      functionName: 'multiDraw',
      value: new BigNumber(value).times(1000000000000000000).toString(),
      args: [referrer],
    }).then(console.info);
    const result = await this.send(
      {
        functionName: 'multiDraw',
        value,
        data: [referrer],
      });
    return result;
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
    const result = await Promise.all(tokenIds.map(async (token) => {
      const heroId = await this.call(
        {
          functionName: 'getCardIdByTokenId',
          args: [token],
        });
      return getCardInfoByHeroId(heroId);
    }));
    return result;
  }

  async buyToken(id) {
    const result = await this.call(
      {
        functionName: 'buyToken',
        args: [id],
      });
    return JSON.parse(result);
  }
  async setTokenPrice({ tokenId, value }) {
    const result = await this.call(
      {
        functionName: 'setTokenPrice',
        args: [tokenId, value],
      });
    return JSON.parse(result);
  }
  async claim() {
    const result = await this.call(
      {
        functionName: 'claim',
        args: [],
      });
    return JSON.parse(result);
  }
}
