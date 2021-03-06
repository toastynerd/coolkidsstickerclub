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

const Mutations = {
  signup,
  login,
};

module.exports = {
  Mutations,
};
