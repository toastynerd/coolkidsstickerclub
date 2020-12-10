const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({ data: { ...args, password } });

  const token = jwt.sign({ userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  }
};

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { email: args.email } });

  if (!user) throw new Error('no such user');

  const valid = await becrypt.compare(args.password, user.password);

  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
};

const Mutation = {
  signup,
  login,
};

module.exports = {
  Mutation,
};
