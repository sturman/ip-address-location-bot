import { Context } from 'telegraf';
import { Message } from '@telegraf/types/message';
import { isIP } from 'node:net';
import axios from 'axios';
import { code, fmt, pre } from 'telegraf/format';

export const ip = async (ctx: Context) => {
  const message = ctx.message as Message.TextMessage;
  const text = message.text;
  if (isIP(text) != 0) {
    const ipInfo = await fetchIpInfo(text);
    const ipInfoText = JSON.stringify(ipInfo, null, 2);
    await ctx.reply(pre('json')`${ipInfoText}`, { reply_parameters: { message_id: message.message_id } });
  } else {
    await ctx.reply(fmt`${code(text)} is not a valid IP address`, { reply_parameters: { message_id: message.message_id } });
  }
};

const fetchIpInfo = async (ipAddress: string) => {
  const response = await axios.get(`https://ipwhois.app/json/${ipAddress}`);
  return response.data;
};
