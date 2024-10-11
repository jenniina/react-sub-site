import axios from 'axios'
import { ELanguages } from '../interfaces'
import { ICart, ICartItem } from '../interfaces/store-cart'

export interface ICartResponse {
  success: boolean
  message: string
  cart: ICart
}

const url =
  import.meta.env.VITE_BASE_URI ??
  'https://react-bg.braveisland-7060f196.westeurope.azurecontainerapps.io'
const baseUrl = `${url}/api/cart`

// export const orderConfirmation = async (req: Request, res: Response) => {
//   try {
//     const { user, language, orderId } = req.params
//     const { email, name, items, details } = req.body
//     const subject = `${
//       EThankYouForYourOrder[(language as ELanguages) ?? 'en']
//     } (React.Jenniina.fi)`
//     const link = 'https://react.jenniina.fi'
//     const message = `
//       ${EYourOrderHasBeenReceived[(language as ELanguages) ?? 'en']}
//       \n\n
//       ${EOrderId[(language as ELanguages) ?? 'en']} ${orderId}.
//       \n\n
//       ${EOrderDetails[(language as ELanguages) ?? 'en']} ${items
//       .map((item: ICartItem) => {
//         if (item.quantity === 1) return `${item.name}: ${item.details}`
//         else return `${item.name} x ${item.quantity}: ${item.details}`
//       })
//       .join(', \n')}.
//       \n\n
//       ${ETotal[(language as ELanguages) ?? 'en']} ${items.reduce(
//       (acc: number, item: ICartItem) => acc + item.price * item.quantity,
//       0
//     )}€.
//       \n\n
//         ${details ?? ''}
//     `
//     await sendMail(subject, message, email, link)
//     const admin = process.env.NODEMAILER_USER
//     const adminMessage = `
//         ${ENewOrderFrom[(language as ELanguages) ?? 'en']} ${email}, ${name}.
//         \n\n
//         ${EUser[(language as ELanguages) ?? 'en']}: ${user}
//         \n\n
//         ${EOrderDetails[(language as ELanguages) ?? 'en']} ${items
//       .map((item: ICartItem) => {
//         if (item.quantity === 1) return `${item.name}: ${item.details}`
//         else return `${item.name} x ${item.quantity}: ${item.details}`
//       })
//       .join(', \n')}.
//       \n\n
//       ${ETotal[(language as ELanguages) ?? 'en']} ${items.reduce(
//       (acc: number, item: ICartItem) => acc + item.price * item.quantity,
//       0
//     )}€.
//     \n\n
//     ${details ?? ''}
//     `
//     await sendMail(subject, adminMessage, admin, link)
//     res.status(200).json({ message: EEmailSent[(language as ELanguages) ?? 'en'] })
//   } catch (error) {
//     const language = req.params.language
//     console.error(error)
//     res.status(500).json({
//       message: `${EErrorSendingMail[(language as ELanguages) ?? 'en']}, ${
//         (error as Error).message
//       }`,
//     })
//   }
// }

// export const newOrder = async (req: Request, res: Response) => {
//   try {
//     const { user, language } = req.params
//     const { email, name, items, details, total } = req.body
//     const createdAt = getFinnishTime()
//     if (user === 'guest') {
//       const cart = new Cart({
//         email,
//         name,
//         items,
//         total,
//         details,
//         createdAt,
//       })
//       await cart.save()
//       await orderConfirmation(req, res)
//       res.status(201).json({
//         success: true,
//         message: EThankYouForYourOrder[(language as ELanguages) ?? 'en'],
//         cart,
//       })
//     } else {
//       const cart = new Cart({
//         user,
//         email,
//         name,
//         items,
//         total,
//         details,
//         createdAt,
//       })
//       await cart.save()
//       await orderConfirmation(req, res)
//       res.status(201).json({
//         success: true,
//         message: EThankYouForYourOrder[(language as ELanguages) ?? 'en'],
//         cart,
//       })
//     }
//   } catch (error) {
//     const language = req.params.language
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: `${EError[(language as ELanguages) ?? 'en']}: ${(error as Error).message}`,
//     })
//   }
// }
//router.post('/api/cart/:user/:language', newOrder)

const newOrder = async (
  user: ICart['user'],
  language: ELanguages,
  order: {
    email: ICart['email']
    name: ICart['name']
    items: ICartItem[]
    details: ICart['details']
    total: ICart['total']
  }
) => {
  const response = await axios.post(`${baseUrl}/${user}/${language}`, order)
  return response.data as ICartResponse
}

export default {
  newOrder,
}
