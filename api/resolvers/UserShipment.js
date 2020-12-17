const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');

async function createUserShipment(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('need admin access');
  console.log(args);

  const shipment = await context.prisma.shipment.findUnique({ where: { id: args.shipmentId } });
  if (!shipment) throw new Error('no such shipment');

  const userToAdd = await context.prisma.user.findUnique({ where: { id: args.userId } });
  if (!userToAdd) throw new Error('no such user');

  const userShipments = await context.prisma.findMany({
    where: {
      userId: userToAdd.id,
      shipmentId: shipment.Id
    }
  });

  if (userShipments.length) throw new Error('user already added to that shipment');

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

  return userShipment;
};

async function chooseStickers(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error('Not a valid user');

  const userShipments = await context.prisma.userShipment.findMany({
    where: {
      userId,
      shipmentId: args.shipmentId
    },

  });

  const userShipment = await context.prisma.userShipment.update({
    where: {
      id: userShipments[0].id
    },
    data: {
      choices: args.choices
    }
  });

  return userShipment;
};

async function adminChooseStickers(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('requires admin');

  const userShipments = await context.prisma.userShipment.findMany({
    where: {
      userId: args.userId,
      shipmentId: args.shipmentId
    }
  });

  if (!userShipments.length) throw new Error('no user shipment');

  const userShipment = await context.prisma.userShipment.update({ 
    where: {
      id: userShipments[0].id
    },
    data: {
      choices: args.choices
    }
  });
};

const Mutations = {
  createUserShipment,
  chooseStickers,
  adminChooseStickers,
};

module.exports = {
  Mutations,
};

