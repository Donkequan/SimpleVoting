// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Voting{

    uint256[] public candidateList;
    constructor(uint256[] memory _candidateListName) {
        candidateList = _candidateListName;
    }
    mapping(uint256 => uint8) public voteReceived;

    function validateCandidate(uint256 candidateName) internal view returns(bool){
        for(uint8 i=0; i<candidateList.length; i++){
            if(candidateName == candidateList[i]){
                return true;
            }
        }
        return false;
    }

    function vote(uint256 candidateName) public {
        require(validateCandidate(candidateName));
        voteReceived[candidateName] += 1;
    }

    function totalVotesFor(uint256 candidateName) view public returns(uint8){
        require(validateCandidate(candidateName));
        return voteReceived[candidateName];
    }
}