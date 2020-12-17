const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');


async function subscribedUsers(parent, args, context, info) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user.role != 'ADMIN') throw new Error('need admin access');

  return context.prisma.user.findMany({
    where: {
      id: {
        not: userId
      },
      activeSubscription: true
    }
  });
}

const Query = {
  info: () => "Cool Kids Sticker Club!",
  subscribedUsers,
};

module.exports = {
  Query,
};
