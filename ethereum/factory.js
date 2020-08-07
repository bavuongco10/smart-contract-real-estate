import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xeF41c4A9D46c1aBa88009129CDE23BaD6Cc9A2fe'
);

export default instance;
