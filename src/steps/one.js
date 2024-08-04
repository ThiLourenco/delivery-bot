import { storage } from "../storage"
import { VenomBot } from "../lib/venom"
import { Steps } from './index.js'

export const initialStep = {
  async exec({ from }) {
    storage[from].step = Steps.MENU

    const venomBot = await VenomBot.getInstance()
    
    const message = `
    👋 Olá, como vai?
     Me chamo Rapidin 🙋‍♂️, sou o *assistente virtual* da ${venomBot.getSessionName},
     *Como posso te ajudar ?*
     ---------------------------------------------------
      1️⃣ - FAZER PEDIDO
      2️⃣ - VERIFICAR TAXA DE ENTREGA
      0️⃣ - FALAR COM ATENDENTE
    `

    await venomBot.sendText({ to: from, message })
  }
  
}