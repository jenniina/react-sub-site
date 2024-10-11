import { ELanguages, EWebsite } from '../../interfaces'
import StoreItems from './components/StoreItems'
import { FC } from 'react'
import { EGraphicDesign, EProducts, ICartItem } from '../../interfaces/store-cart'

const wordpress: Partial<ICartItem>[] = [
  {
    name: 'Simple WordPress Website',
    price: 230,
    quantity: 1,
    description:
      'An accessible single page website without extra functionalities. The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'Simple WordPress Website with Blog and Contact Form',
    price: 350,
    quantity: 1,
    description:
      'An accessible website with a blog section and contact form. The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'Simple WordPress Website with Blog, Contact Form, and Online Store',
    price: 540,
    quantity: 1,
    description:
      'An accessible website with a blog section, contact form, and online store (WooCommerce). The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'WordPress Full Package',
    price: 630,
    quantity: 1,
    description:
      "Includes a design meeting (online or live) with the client and three drafts, design of the website's appearance, technical implementation, publication, and an hour of user training. The production or translation of text and image content is not included in the basic package.",
    details: '',
  },
]

const react: Partial<ICartItem>[] = [
  {
    name: 'React Website',
    price: 380,
    quantity: 1,
    description:
      'An accessible single page website without extra functionalities. The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'React Website with Blog and Contact Form',
    price: 600,
    quantity: 1,
    description:
      'An accessible website with a blog section and contact form. The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'React Website with Blog, Contact Form, and Online Store',
    price: 800,
    quantity: 1,
    description:
      'An accessible website with a blog section, contact form, and online store. The production or translation of text and image content is not included in the basic package.',
    details: '',
  },
  {
    name: 'React Full Package',
    price: 980,
    quantity: 1,
    description:
      "Includes a design meeting (online or live) with the client and three drafts, design of the website's appearance, technical implementation, publication, and an hour of user training. The production or translation of text and image content is not included in the basic package.",
    details: '',
  },
]
const misc: Partial<ICartItem>[] = [
  {
    name: 'Website Translation Work (English & Finnish)',
    price: 22,
    quantity: 1,
    description: 'Translation work for websites (English & Finnish): 22€/hour.',
    details: '',
  },
  {
    name: 'Website Updates or Modifications',
    price: 22,
    quantity: 1,
    description:
      'Updates or modifications to websites: 22€/hour for React & Node-based websites.',
    details: '',
  },
  {
    name: 'Website Maintenance',
    price: 22,
    quantity: 1,
    description:
      'Website maintenance: 22€/hour for WordPress or React & Node-based websites.',
    details: '',
  },
]

const graphicDesign: Partial<ICartItem>[] = [
  {
    name: 'Poster and Flyer Design',
    price: 320,
    quantity: 1,
    description: 'Includes a design meeting with the client and three drafts.',
    details: '',
  },
  {
    name: 'Logo Design',
    price: 200,
    quantity: 1,
    description: 'Includes a design meeting with the client and three drafts.',
    details: '',
  },
  {
    name: 'Business Card Design',
    price: 120,
    quantity: 1,
    description: 'Includes a design meeting with the client and three drafts.',
    details: '',
  },
]

const itemsReact = react.map((item, index) => {
  item.id = 'react' + index.toString()
  return item
}) as ICartItem[]

const itemsWordPress = wordpress.map((item, index) => {
  item.id = 'wordpress' + index.toString()
  return item
}) as ICartItem[]

const itemsMisc = misc.map((item, index) => {
  item.id = 'misc' + index.toString()
  return item
}) as ICartItem[]

const itemsGraphic = graphicDesign.map((item, index) => {
  item.id = 'graphic' + index.toString()
  return item
}) as ICartItem[]

const items = itemsReact.concat(itemsWordPress, itemsMisc, itemsGraphic)

interface Props {
  language: ELanguages
}

const ScrollButton: FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <button
      onClick={() => {
        document.getElementById(id)?.scrollIntoView()
      }}
    >
      {name}
    </button>
  )
}

const Store: FC<Props> = ({ language }) => {
  const itemsNameArray = [
    { name: EWebsite[language], id: 'website', array: itemsMisc },
    { name: 'React', id: 'react', array: itemsReact },
    { name: 'WordPress', id: 'wordpress', array: itemsWordPress },
    { name: EGraphicDesign[language], id: 'graphic', array: itemsGraphic },
  ]
  return (
    <>
      {itemsNameArray.map((item) => (
        <ScrollButton key={item.id} name={item.name} id={item.id} />
      ))}
      {itemsNameArray.map((item) => (
        <StoreItems
          key={item.id}
          id={item.id}
          language={language}
          items={item.array}
          type={item.name}
        />
      ))}
    </>
  )
}

export default Store
