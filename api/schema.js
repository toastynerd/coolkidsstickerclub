const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    info: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    subscribed: String
    subscriptionExpiration: String
    userShipments: [UserShipment]
  }

  type Shipment {
    id: ID!
    shipDate: String!
    optionOne: [String]
    optionTwo: [String]
    userShipments: [UserShipment]
  }

  type UserShipment {
    userId: Int
    shipmentId: Int
    choices: [String]
    dateShipped: String
  }
`
