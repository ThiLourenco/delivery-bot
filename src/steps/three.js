import { VenomBot } from "../lib/venom"
import { storage } from "../storage"
import { STEPS } from "."

export const stepThree = {
  async exec({ from, message}) {
    storage[from].address = message 
    storage[from].step = STEPS.PEDIDO

    let msg = '🔴 O Pedido foi *CANCELADO* com sucesso. \n\n ```Volte para realizar um novo pedido !!```'
    if(message === '*') {
      storage[from].stage = STEPS.INICIAL      
    } else {
      const itens = storage[from].itens 
      const drinks = itens.map((item) => item.description).join(', ')

      const total = storage[from].itens.length

      msg = `
      🗒️ *RESUMO DO PEDIDO*: \n\n🍹Bebidas: *${drinks}* \n🚚 Taxa de entrega: *a confirmar*. \n📍 Endereço: *${message}* \n💰 Valor total: *${total * 6},00 reais,  \n⏳ Tempo de entrega: *20 minutos*. \n\n` +
      '🔊 ```Agora por gentileza, nos informe a forma de pagamento, aceitamos todos os cartões, transfência pix, e dinheiro, se for dinheiro vai precisar de troco?```'
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })
  }
}
