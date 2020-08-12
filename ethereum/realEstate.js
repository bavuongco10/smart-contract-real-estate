import web3 from './web3';
import Binary from './build/MyREToken.json';

const RealEstate = address => {
  return new web3.eth.Contract(JSON.parse(Binary.interface), address);
};

export default RealEstate
