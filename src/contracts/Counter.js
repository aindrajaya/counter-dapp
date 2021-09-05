import Artifacts from './combined.json' //artifacts is copy from the build folder
import { getWeb3, getAccount } from '../eth/network';

//code for create a Counter web3 contrat object, it just creates a javascript object that acts as a wrapper to a contract previously deployed at a specified address
export default function Counter(web3, address=null, options = {}){
  const name = "contracts/Counter.sol:Counter";
  const artifact = Artifacts.contracts[name];
  const abi = JSON.parse(artifact.abi)
  const data = '0x'+artifact.bin;
  return new web3.eth.Contract(abi, address, {data, ...options});
}

//code for obtaining a web3 contract instance of the Counter contract
export async function getDeployed(){
  const web3 = getWeb3();
  const from = await getAccount();
  const addr = process.env.REACT_APP_COUNTER_ADDRESS;
  return Counter(web3, addr, {from});
}