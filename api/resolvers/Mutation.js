const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { 
      ...args,
      password,
      role: 'COOLKID',
    }
  });

  const token = jwt.sign({ userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  }
};

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });

  if (!user) throw new Error('no such user');

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
};

async function createShipment(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('need admin access');

  const shipDate = new Date(args.shipDate);
  const shipment = await context.prisma.shipment.create({ data: { ...args, shipDate } });

  return shipment;
};

async function createUserShipment(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('need admin access');
  console.log(args);

  const shipment = await context.prisma.shipment.findUnique({ where: { id: args.shipmentId } });
  if (!shipment) throw new Error('no such shipment');

  const userToAdd = await context.prisma.user.findUnique({ where: { id: args.userId } });
  if (!userToAdd) throw new Error('no such user');

  const userShipment = await context.prisma.userShipment.create({
    data: {
      user: {
        connect: { id: args.userId }
      },
      shipment: {
        connect: { id: args.shipmentId }
      },
      choices: args.choices || []
    }
  });

  console.log(args);
  console.log(userShipment);

  return userShipment;
};

const Mutation = {
  signup,
  login,
  createShipment,
  createUserShipment,
};

module.exports = {
  Mutation,
};
