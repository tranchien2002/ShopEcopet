const fs = require('fs');

const BackgroudShop = artifacts.require('BackgroundShop');

module.exports = function(deployer) {
  deployer.deploy(BackgroudShop);
};
