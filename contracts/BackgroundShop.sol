pragma solidity ^0.5.0;

import './SafeMath.sol';

contract BackgroundShop {
    using SafeMath for uint;

    address payable contractOwner;

    struct Background {
        uint id;
        uint price;
        uint inStock;
        address bgOwner;
    }

    constructor() public {
        contractOwner = msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == contractOwner,
            "Only contract owner can call this function."
        );
        _;
    }

    Background[] backgroundList;

    mapping(address => uint[]) ownerToBackgroundList;
    mapping(address => uint) ownedBackgroundCount;
    mapping(address => uint) petToBackground;

    // add more background item to shop
    function addBackground(uint _inStock, uint _price) public onlyOwner {
        uint id = backgroundList.length++;
        backgroundList[id] = Background(id,_price,_inStock,msg.sender);
    }

    // get sum of background type in shop
    function bgCount() public view returns (uint){
        return backgroundList.length;
    }

    // get 1 background in shop
    function getBackgroundById(uint _id) public view returns(uint, uint, uint,address) {
        require(_id < backgroundList.length);
        Background memory background = backgroundList[_id];
        return (
            background.id,
            background.inStock,
            background.price,
            background.bgOwner
        );
    }

    // user buy 1 background in shop. background.inStock will decrease
    function buyBackground(uint _id) external payable {

        Background storage background = backgroundList[_id];
        require(background.inStock > 0);
        require(msg.value >= background.price);
        if (msg.value > (background.price) * 10 ** 18) {
            msg.sender.transfer(msg.value.sub(background.price));
        }
        background.inStock--;
        ownerToBackgroundList[msg.sender].push(background.id);
        ownedBackgroundCount[msg.sender]++;
    }

    // get sum of backgrounds in user's list
    function myBackgroundCount() public view returns (uint) {
        return ownedBackgroundCount[msg.sender];
    }

    // get id of 1 background in user's bg list
    function getOwnedBackgroundId(uint _index) public view returns (uint) {
        uint[] memory idList = ownerToBackgroundList[msg.sender];
        return idList[_index];
    }

    // put/change 1 background to a pet
    function putBackgroundToPet(uint _index, address _petAddress) public {
        require(ownedBackgroundCount[msg.sender] > 0);
        uint[] memory idList = ownerToBackgroundList[msg.sender];
        uint backgroundId = idList[_index];
        Background storage background = backgroundList[backgroundId];
        background.bgOwner = msg.sender;
        petToBackground[_petAddress] = background.id;
    }

    function transferBackground(uint _index, address _newOwner) public {
        uint[] storage idList = ownerToBackgroundList[msg.sender];
        uint id = idList[_index];
        Background storage background = backgroundList[id];
        require(background.bgOwner == msg.sender);
        background.bgOwner = _newOwner;
        idList[_index] = idList[idList.length - 1];
        idList.pop();
        ownedBackgroundCount[msg.sender]--;
        ownerToBackgroundList[_newOwner].push(id);
        ownedBackgroundCount[_newOwner]++;
    }

    function widthDraw(uint _amount) public payable onlyOwner {
        require(_amount <= address(this).balance);
        contractOwner.transfer(_amount);
    }
}
