const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');

const Authentication = require('./Authentication').Mutations;
const Shipment = require('./Shipment').Mutations;
const UserShipment = require('./UserShipment').Mutations;


const Mutation = {
  ...Authentication,
  ...Shipment,
  ...UserShipment,
};

module.exports = {
  Mutation,
};
