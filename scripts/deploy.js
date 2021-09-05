const Web3 = require('web3');
const fs = require('fs');
const Artifacts = require('../src/contracts/combined.json');

function getWeb3(){
  const providerURL = process.env.PROVIDER_URL || 'http://127.0.0.1:8545';
  return new Web3(providerURL)
}

async function getSender(web3){
  return process.env.FROM || (await web3.eth.getAccounts()[0]);
}

function getCounterContract(web3){
  const artifact = Artifacts.contracts["contracts/Counter.sol:Counter"];
  const abi = JSON.parse(artifact.abi);
  const data = '0x' + artifact.bin;
  return new web3.eth.Contract(abi, null, {data});
}

function saveAddress(address){
  fs.appendFileSync('.env', `\nREACT_APP_COUNTER_ADDRESS=${address}\n`);
}

async function main(){
  const web3 = getWeb3();
  // const from = await getSender(web3);
  const from = "0x33719B186Eb764e6F47345bE01e284aD807399a5"
  const Counter = getCounterContract(web3);
  const counter = await Counter.deploy().send({
    from, gas: 1000000
  });
  const address = counter.options.address;
  console.log(`This counter contract deployed at ${address}`);
  saveAddress(address)
}

main()