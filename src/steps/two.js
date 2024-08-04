import { VenomBot } from "../lib/venom"
import { menu } from '../menu'
import { storage } from "../storage"
import { STEPS } from "."

export const stepTwo = {
  async exec(params) {
    const message = params.message.trim()
    const isMessageValid = /[1|2|3|4|5|#|*]/.test(message)

    let msg =
    '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if(!isMessageValid) {
      if(['#', '*'].includes(message)) {
        const option = options[message]()
        msg = option[message]
        storage[params.from].stage = option.nextStep
      } else {
        msg = `
        ✅ *${menu[message].description}* foi adicionado no carrinho sucesso!! \n\n` +
        '```Digite outra opção```: \n\n' +
        '\n-----------------------------------\n#️⃣ - ```CONCLUIR pedido``` \n*️⃣ - ```CANCELAR pedido```'
        storage[params.from].itens.push(menu(message))
      }

      if(storage[params.from].step === STEPS.INICIAL) {
        storage[params.from].itens = []
      }
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })
  },
}