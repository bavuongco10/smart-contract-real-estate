import web3 from './web3';
import MysREToken from './build/MysREToken.json';

const instance = new web3.eth.Contract(
  JSON.parse(MysREToken.interface),
  '0x9749F2754347B3c334cBA63EE1956A8C8934fe12'
);

export default instance;
