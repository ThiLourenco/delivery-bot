import { VenomBot } from "../lib/venom"
import { storage } from "../storage"
import { STEPS } from "."

export const stepFour = {
  async exec({ from, message }) {
    const address = storage[from].address
    const phone = from.split('@')

    storage[from].step = STEPS.FALAR_COM_ATENDENTE

    storage[from].finalStep = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(120), // 2 minute inactivity
    }

    const itens = storage[from].itens
    const drinks = itens.map((item) => item.description).join(', ')
    const total = storage[from].itens.length

    const msg = `🔔 *NOVO PEDIDO* 🔔: \n\n📞 Cliente: +${phone[0]} \n🍹Bebidas: *${drinks}* \n📍 Endereço: *${address}* \n🚚 Taxa de entrega: *a confirmar*. \n💰 Valor total: *${total * 6},00 reais*. \n⏳ Tempo de entrega: *20 minutos*. \n🛑 Detalhes: *${message}*`

    await VenomBot.getInstance().sendText({ to: from, message: msg })
  }
}