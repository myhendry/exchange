pragma solidity >= 0.5.12;

import './Token.sol';
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Exchange {
  using SafeMath for uint;

  address public feeAccount; // the account that recieves exchange fees
  uint public feePercent; // the fee percentage
  address constant ETHER = address(0); // store Ether in tokens mapping with blank address
  mapping(address => mapping(address => uint256)) public tokens;
  mapping(uint256 => _Order) public orders;
  uint256 public orderCount;
  mapping(uint256 => bool) public orderCancelled;

  struct _Order {
    uint256 id;
    address user;
    address tokenGet;
    uint256 amountGet;
    address tokenGive;
    uint256 amountGive;
    uint256 timestamp;
  }

  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);
  event Order(uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 timestamp);
  event Cancel(uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 timestamp);

  constructor(address _feeAccount, uint _feePercent) public {
    feeAccount = _feeAccount;
    feePercent = _feePercent;
  }

  // fallback: revers if Ether is sent to this smart contract by mistake
  function() external {
    revert();
  }

  function depositEther() public payable {
    // Manage Ether deposit - update balance
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    // Emit Event
    emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
  }

  function withdrawEther(uint _amount) public {
    // Ensure User's Ether Balance is more than amount to be withdrawn
    require(tokens[ETHER][msg.sender] >= _amount );
    // Manage Ether deposit - update balance
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
    // Send Ether back to the Sender
    msg.sender.transfer(_amount);
    // Emit Event
    emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
  }

    function depositToken(address _token, uint _amount) public {
    // Do not allow Ether deposits
    require(_token != ETHER);
    // send token to this Exchange
    require(Token(_token).transferFrom(msg.sender, address(this), _amount));
    // Manage Token deposit - update balance
    tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
    // Emit Event
    emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  function withdrawToken(address _token, uint256 _amount) public {
     require(_token != ETHER);
     require(tokens[_token][msg.sender] >= _amount);
     // Manage Token deposit - update balance
     tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
     require(Token(_token).transfer(msg.sender, _amount));
     // Emit Event
     emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  function balanceOf(address _token, address _user) public view returns (uint256) {
    return tokens[_token][_user];
  }

  function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public {
    orderCount = orderCount.add(1);
    orders[orderCount]  = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
    emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
  }

  function cancelOrder(uint256 _id) public {
    // Fetch order out from mapping orders
    _Order storage _order = orders[_id];
    // Must be my order
    require(address(_order.user) == msg.sender);
    // Must be valid order
    require(_order.id == _id);
    orderCancelled[_id] = true;
    emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
  }
}