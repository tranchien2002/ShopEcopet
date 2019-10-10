pragma solidity ^0.5.0;

contract BackgroundShop {
  address contractOwner;

  struct Background {
      uint id;
      uint inStock;
      uint price;
      uint petType;
  }

  constructor() public{
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
  mapping(address => Background[]) ownerToBackgroundList;
  mapping(address => uint) ownerBackgroundCount;

  // add more background item to shop
  function addBackground(uint _inStock, uint _price) public onlyOwner{
    uint id = backgroundList.length++;
    backgroundList[id] = Background(id,_inStock,_price,0);
  }

  // get sum of background type in shop
  function getBackgroundListLength() public view returns (uint){
      return backgroundList.length;
  }

  // get 1 background in shop
  function getBackgroundInShop(uint _index) public view returns(uint, uint, uint,uint) {
    require(_index < backgroundList.length);
    Background memory background = backgroundList[_index];
    return (
        background.id,
        background.inStock,
        background.price,
        background.petType
    );
  }

  // user buy 1 background in shop. background.inStock will decrease
  function buyBackground( uint _id) external payable {

    Background storage background = backgroundList[_id];
    require(msg.value == background.price);
    require(background.inStock > 0);
    background.inStock--;
    ownerToBackgroundList[msg.sender].push(background);
    ownerBackgroundCount[msg.sender]++;

  }

  // get sum of backgrounds in user's list
  function getOwnerBackgroundCount() public view returns (uint){
      return ownerBackgroundCount[msg.sender];
  }

  // get 1 background in user's list
  function getBackgroundInOwnerList(uint _index) public view returns(uint, uint, uint,uint) {
    require(_index < ownerBackgroundCount[msg.sender]);
    Background[] memory backgrounds = ownerToBackgroundList[msg.sender];
    Background memory background = backgrounds[_index];
    return (
        background.id,
        background.inStock,
        background.price,
        background.petType
    );
  }

  // put/change 1 background to a pet
  function putBackgroundToPet(uint _backgroundId, uint _petType) public{
    require( ownerBackgroundCount[msg.sender] >0);
    Background[] storage backgrounds = ownerToBackgroundList[msg.sender];
    Background storage background = backgrounds[_backgroundId];
    background.petType = _petType;
  }
}
