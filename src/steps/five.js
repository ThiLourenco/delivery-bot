import { VenomBot } from "../lib/venom"
import { storage } from "../storage"
import { STEPS } from "."

export const finalStep = {
  async exec({ from, message}) {
    const msg = message.trim().toUpperCase()

    const currentDate = new Date()
    const history = storage[from].finalStep

    if(history.endsIn < currentDate.getTime() || msg === 'ENCERRAR') {
      storage[from].step = STEPS.INICIAL
      return VenomBot.getInstance().sendText({
        to: from,
        message: '🔚 *Atendimento encerrado* 🔚'
      })
    }
    storage[from].finalStage.endsIn = new Date().setSeconds(120) // more 2 minute of inactivity
  }
}