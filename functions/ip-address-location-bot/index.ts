import { Logger } from '@aws-lambda-powertools/logger';
import { Context, Telegraf } from 'telegraf';
import { start } from './middleware/start';
import { help } from './middleware/help';
import { botToken } from './config/config';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Update } from '@telegraf/types/update';
import { ip } from './middleware/ip';
import { message } from 'telegraf/filters';

export const logger = new Logger({ serviceName: 'ip-address-location-bot' });

const bot = new Telegraf(botToken);

bot.start(start);
bot.help(help);
bot.on(message('text'), ip);

bot.catch((err, ctx: Context) => {
  logger.error(`Ooops, encountered an error for ${ctx.updateType}, ${JSON.stringify(ctx.message)}`, { err });
});

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body!) as Update;
    logger.info('body -->', { body });
    await bot.handleUpdate(body);
  } catch (error: unknown) {
    logger.error('error -->', { error });
  }
  // respond to Telegram that the webhook has been received.
  // if this is not sent, telegram will try to resend the webhook over and over again.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'function executed successfully' }),
  };
};
