import web3 from './web3';
import RealEstate from './build/RealEstate.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(RealEstate.interface), address);
};
