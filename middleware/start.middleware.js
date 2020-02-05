const startText = `Welcome!
Just send me any valid IP address`

module.exports = (ctx, next) => {
  return ctx.reply(startText)
}
