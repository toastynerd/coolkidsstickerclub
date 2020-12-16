const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    info: String!
  }

  type Mutation {
    signup(
      email: String!
      password: String! 
    ): AuthPayload

    login(
      email: String!
      password: String!
    ): AuthPayload

    createshipment(
      shipDate: String!
      optionOne: [String]
      optionTwo: [String]
    ): Shipment
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    subscribed: String
    subscriptionExpiration: String
    userShipments: [UserShipment]
  }

  type AuthPayload {
    token: String
    user: User
  }

  enum Role {
    ADMIN
    COOLKID
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
