import web3 from './web3';
import RealEstateFactory from './build/RealEstateFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(RealEstateFactory.interface),
  '0x8BaE1E3d0ecE84613a16FD4EA3B26Afba9C4fd62'
);

export default instance;
