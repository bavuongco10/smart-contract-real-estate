const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const compiledFactory = require('./build/MyREToken.json');

// const mnemonic = 'call glow acoustic vintage front ring trade assist shuffle mimic volume reject'
// const provider = new HDWalletProvider(
//   mnemonic,
//   'https://ropsten.infura.io/v3/f55a035e0f9c4adab3ba431f142ce1b4'
// );

const mnemonic = 'thank man end snake erase easy vocal enjoy forum cross bomb ability'
const provider = new HDWalletProvider(
  mnemonic,
  'http://localhost:7545'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  process.exit()
};
deploy();
