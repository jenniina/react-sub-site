import { IUser } from '.'

export interface ICartItem {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  details: string // user-added details
}

export interface ICart {
  user: IUser['_id'] | 'guest'
  email: string
  name: string
  items: ICartItem[]
  total: number
  details: string
  createdAt: Date
  updatedAt: Date
}

export enum EShoppingCart {
  en = 'Shopping Cart',
  es = 'Carrito de compras',
  fr = 'Panier',
  de = 'Einkaufswagen',
  pt = 'Carrinho de compras',
  cs = 'Nákupní vozík',
  fi = 'Ostoskori',
}
export enum ECart {
  en = 'Cart',
  es = 'Carrito',
  fr = 'Panier',
  de = 'Wagen',
  pt = 'Carrinho',
  cs = 'Košík',
  fi = 'Ostoskori',
}
export enum EAddToCart {
  en = 'Add to cart',
  es = 'Añadir al carrito',
  fr = 'Ajouter au panier',
  pt = 'Adicionar ao carrinho',
  de = 'In den Warenkorb',
  cs = 'Přidat do košíku',
  fi = 'Lisää ostoskoriin',
}
export enum ESubtractFromCart {
  en = 'Subtract from cart',
  es = 'Restar del carrito',
  fr = 'Soustraire du panier',
  pt = 'Subtrair do carrinho',
  de = 'Vom Warenkorb abziehen',
  cs = 'Odečtěte z košíku',
  fi = 'Vähennä ostoskorista',
}
export enum EDeleteFromCart {
  en = 'Delete from cart',
  es = 'Eliminar del carrito',
  fr = 'Supprimer du panier',
  pt = 'Excluir do carrinho',
  de = 'Aus dem Warenkorb löschen',
  cs = 'Odstraňte z košíku',
  fi = 'Poista ostoskorista',
}
export enum EVAT {
  en = 'VAT 25.5%',
  es = 'IVA 25.5%',
  fr = 'TVA 25.5%',
  de = 'MwSt 25.5%',
  pt = 'IVA 25.5%',
  cs = 'DPH 25.5%',
  fi = 'ALV 25.5%',
}
export enum EContainsVAT {
  en = 'contains VAT 25.5%',
  es = 'contiene IVA 25.5%',
  fr = 'contient TVA 25.5%',
  de = 'enthält MwSt 25.5%',
  pt = 'contém IVA 25.5%',
  cs = 'obsahuje DPH 25.5%',
  fi = 'sisältää ALV 25.5%',
}

export enum EPrice {
  en = 'Price',
  es = 'Precio',
  fr = 'Prix',
  de = 'Preis',
  pt = 'Preço',
  cs = 'Cena',
  fi = 'Hinta',
}
export enum EQuantity {
  en = 'Quantity',
  es = 'Cantidad',
  fr = 'Quantité',
  de = 'Menge',
  pt = 'Quantidade',
  cs = 'Množství',
  fi = 'Määrä',
}
export enum ETotal {
  en = 'Total',
  es = 'Total',
  fr = 'Total',
  de = 'Total',
  pt = 'Total',
  cs = 'Celkem',
  fi = 'Yhteensä',
}
export enum EProducts {
  en = 'Products',
  es = 'Productos',
  fr = 'Produits',
  de = 'Produkte',
  pt = 'Produtos',
  cs = 'Produkty',
  fi = 'Tuotteet',
}
export enum EGraphicDesign {
  en = 'Graphic Design',
  es = 'Diseño gráfico',
  fr = 'Graphisme',
  de = 'Grafikdesign',
  pt = 'Design gráfico',
  cs = 'Grafický design',
  fi = 'Graafinen suunnittelu',
}
