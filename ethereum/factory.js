import web3 from './web3';
import MysREToken from './build/MysREToken.json';

const instance = new web3.eth.Contract(
  JSON.parse(MysREToken.interface),
  '0x1ce9368994c89c9bc4beb01db43e0628dcec8455'
);

export default instance;
