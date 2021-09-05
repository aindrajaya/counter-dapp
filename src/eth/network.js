import Web3 from 'web3';

//creating a web3 object using MetaMask provider
let web3;
export function getWeb3(){
  if(!web3){
    //create the new Instance web3 provider
    web3 = new Web3(Web3.givenProvider);
  }
  return web3;
}

//added function


//function to retrieving the user's current default account, usually using the 0 index account
export async function getAccount(){
  //this method will not work for browsers that run in privacy mode
  /**
   * const web3 = getWeb3();
   * const accounts  = await web3.eth.getAccounts();
   * return accounts[0]
   */

  //for handling the privacy mode browser
  const accounts = await window.ethereum.enable();
  return accounts[0];  
}