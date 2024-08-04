import { create } from 'venom-bot'

export class VenomBot {
  #venombot 
  #session

  static getInstance() {
    if (VenomBot.instance === undefined) VenomBot.instance = new VenomBot()

    return VenomBot.instance
  }

  async init({ session, headless, useChrome, debug, logQRCode  }) {
    this.#session = session
    this.#venombot = await create({
      session,
      headless,
      useChrome,
      debug,
      logQRCode,
      multidevice: false, // test for multidevice
    })

    return this
  }

  get getSessionNumber() {
    return this.#session
  }

  async onMessage(callback) {
    if(!this.#venombot) throw new Error('Bot is not connected')
      return await this.#venombot.onMessage(callback)
  }

  async sendText({ to, message}) {
    if(!this.#venombot) throw new Error('Bot is not connected')
      return await this.#venombot.sendText(to, message)
  }

  async sendImage({ to, path }) {
    if(!this.#venombot) throw new Error('Bot is not connected')
      return await this.#venombot.sendImage(to, path)
  }
  async markUnseenMessage({ to }) {
    if(!this.#venombot) throw new Error('Bot is not connected')
      return await this.#venombot.markUnseenMessage(to)
  }
}