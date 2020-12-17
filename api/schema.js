const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    info: String!,
    subscribedUsers: [User]!,
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

    createShipment(
      shipDate: String!
      optionOne: [String]
      optionTwo: [String]
    ): Shipment

    createUserShipment(
      shipmentId: Int!
      userId: Int!
    ): UserShipment

    chooseStickers(
      shipmentId: Int!
      choices: [String]!
    ): UserShipment
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    subscribed: String
    subscriptionExpiration: String
    userShipments: [UserShipment]
    activeSubscription: Boolean
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
    choices: [String]!
    dateShipped: String
  }
`
