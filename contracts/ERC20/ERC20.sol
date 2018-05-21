pragma solidity ^0.4.23;

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
library SafeMath {

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}


contract ERC20 {
  using SafeMath for uint256;

  mapping(address => uint256) balances;
  mapping (address => mapping (address => uint256)) internal allowed;
  uint256 totalSupply_;
  uint256 initialSupply_;
  address owner_;
  string name_;
  string symbol_;
  uint8 decimal_;


  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor() public {
    owner_ = msg.sender;
    initialSupply_ = 50000;
    decimal_ = 18;
    totalSupply_ = 50000 * (10 ** decimal_);
    name_ = "TEST TOKEN";
    symbol_ = "TES";

  }

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function balanceOf(address who) public view returns (uint256) {
    return balances[owner_];
  }

  function transfer(address to, uint256 value) public returns (bool) {
    require(to != address(0));
    require(value <= balances[msg.sender]);

    balances[msg.sender] = balances[msg.sender].sub(value);
    balances[to] = balances[to].add(value);
    emit Transfer(msg.sender, to, value);
    return true;
  }

  function allowance(address owner, address spender) public view returns (uint256) {
    return allowed[owner][spender];
  }

  function transferFrom(address from, address to, uint256 value) public returns (bool) {
    require(to != address(0));
    require(value <= balances[from]);
    require(value <= allowed[from][msg.sender]);

    balances[from] = balances[from].sub(value);
    balances[to] = balances[to].add(value);
    allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
    emit Transfer(from, to, value);
    return true;
  }

  function approve(address spender, uint256 value) public returns (bool) {
    allowed[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }
}
