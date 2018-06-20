import Contract from './contract';

export default class NasId extends Contract {
  constructor() {
    super({ contractAddress: 'n1g3dNR43HN62cT8i72wGt747Z55dBYv1im' });
    this.accountDetail = {};
  }

  async fetchAccountDetail(address) {
    if (address === null) {
      return null;
    }
    const result = await this.call({ from: address, functionName: 'get' });
    return JSON.parse(result);
  }
}
