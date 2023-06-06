import fetch from 'node-fetch'
import ipRegex from 'ip-regex';

export default async (ctx) => {
  let messageText = ctx.message.text
  if (ipRegex({exact: true}).test(messageText)) {
    const response = await fetch(`https://ipwhois.app/json/${messageText}`)
    const data = await response.json()
    try {
      return ctx.reply(JSON.stringify(data, null, 2))
    } catch (err) {
      return ctx.replyWithMarkdown('*Something wrong...*\nError details:\n' + JSON.stringify(err))
    }
  } else {
    return ctx.replyWithMarkdown(
      `${messageText} is not an IP address. Please send IP address in correct IPv4 or IPv6 format e.g.\n\`12.34.43.21\`\n\`2001:cdba:0000:0000:0000:0000:3257:9652\``)
  }
}
