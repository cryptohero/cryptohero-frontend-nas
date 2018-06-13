import { BigNumber } from 'bignumber.js';
import heroProfile from '@/config/cards.json';// '@/heroProfile.json';
import Contract from './contract';

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
    return result;
  }

  async getDrawPrice() {
    const result = await this.call({ functionName: 'getPrice' });
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
    const id = await this.call(
      {
        functionName: 'getCardIdByTokenId',
        args: [token],
      });
    return heroProfile[id];
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
