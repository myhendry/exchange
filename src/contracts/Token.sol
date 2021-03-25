pragma solidity >= 0.5.12;

contract Token {
  string public name = "DAPP";
  string public symbol = "D";
  uint public decimals = 18;
  uint public totalSupply;

  constructor() public {
    totalSupply = 1000000 * (10 ** decimals);
  }
}