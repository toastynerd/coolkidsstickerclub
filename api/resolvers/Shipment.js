const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');

async function createShipment(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('need admin access');

  const shipDate = new Date(args.shipDate);
  const shipment = await context.prisma.shipment.create({ data: { ...args, shipDate } });

  return shipment;
};

const Mutations = {
  createShipment,
};

module.exports = {
  Mutations,
};
