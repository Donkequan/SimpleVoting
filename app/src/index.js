import Web3 from "web3";
import voting_artifacts from "../../build/contracts/Voting.json";

const candidates = {"111":"c1", "222":"c2", "333":"c3"};

let Voting;

window.voteForCandidate = function (){
  $("#msg").html("good");
  let candidateName = $("#candidate").val();
  $("#candidate").val("");
  console.log(candidateName);
  Voting.methods.vote(candidateName).send({from: "0x006673C338abF1a9fA8938c4071211f20Bf2d38D" }).then(res=>{
    console.log(res);
    let div_id = candidates[candidateName];
    Voting.methods.totalVotesFor(candidateName).call().then(function (result){
      $("#"+div_id).html(result.toString());
    });
  })
};

$(document).ready(function (){
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  let accounts = web3.eth.getAccounts()
  console.log(accounts);
  web3.eth.net.getId().then(function (networkId){
    const deployedNetwork = voting_artifacts.networks[networkId];
    console.log(deployedNetwork);
     Voting = new web3.eth.Contract(
        voting_artifacts.abi,
        deployedNetwork.address,
    );
    let candidateList = Object.keys(candidates);
    for(let i=0; i<candidateList.length; i++){
      let name = candidateList[i];
      Voting.methods.totalVotesFor(name).call().then(function (result){
        $("#"+candidates[name]).html(result.toString());
      });
    }
  });
});