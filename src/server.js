import { VenomBot } from './lib/venom.js'

const app = async () => {
  try {
    const venomBot = await VenomBot.getInstance().init({
      session: 'Delivery App',
      debug: true,
      logQRCode: true,
      headless: true,
      useChrome: false,
    })

    venomBot.onMessage(async (message) => {
      if (message.isGrupMsg) return

      const currentStage = getState({ from: message.from })

      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body
      })
    })
  } catch (error) {
    console.error(error)
  }
}

app()