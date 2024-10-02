import { Context } from 'telegraf';

const startText = `Welcome!
Just send me any valid IP address`;

export const start = async (ctx: Context) => {
  await ctx.reply(startText);
};
