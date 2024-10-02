import { Context } from 'telegraf';
import { code, fmt } from 'telegraf/format';

const helpText = fmt`Just send me an IP address for which you would like to know a location e.g. 
${code('12.34.43.21')}
${code('2606:4700:4700::1111')}`;

export const help = (ctx: Context) => {
  return ctx.reply(helpText);
};
