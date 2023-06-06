const startText = `Welcome!
Just send me any valid IP address`

export default (ctx, next) => {
    return ctx.reply(startText)
}
