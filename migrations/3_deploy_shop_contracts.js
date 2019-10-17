const fs = require('fs');

const BackgroudShop = artifacts.require('BackgroundShop');

module.exports = async (deployer) => {
  await deployer.deploy(BackgroudShop);
  backgroundShop = await BackgroudShop.deployed();
  await backgroundShop.addBackground(100, 1);
};
