export type paid = 'none' | 'partial' | 'full'
export type status = 'pending' | 'in progress' | 'completed' | 'cancelled'

export interface ICartItem {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  details: string // user-added details
  paid: paid
  status: status
}
export interface IInfo {
  email: string
  name: string
  companyName?: string
  businessID?: string
  zip?: string
  city?: string
  address?: string
  country?: string
  phone?: string
}

export interface ICart {
  orderID: string
  info: IInfo
  items: ICartItem[]
  total: number
  extra: string
  status: status
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
export enum EEmptyCart {
  en = 'Your cart is empty',
  es = 'Tu carrito está vacío',
  fr = 'Votre panier est vide',
  de = 'Ihr Warenkorb ist leer',
  pt = 'Seu carrinho está vazio',
  cs = 'Váš košík je prázdný',
  fi = 'Ostoskorisi on tyhjä',
}
export enum EClearCart {
  en = 'Clear cart',
  es = 'Vaciar carrito',
  fr = 'Vider le panier',
  de = 'Warenkorb leeren',
  pt = 'Limpar carrinho',
  cs = 'Vyčistit košík',
  fi = 'Tyhjennä ostoskori',
}
export enum ESubmitOrder {
  en = 'Submit order',
  es = 'Enviar pedido',
  fr = 'Envoyer la commande',
  de = 'Bestellung abschicken',
  pt = 'Enviar pedido',
  cs = 'Odeslat objednávku',
  fi = 'Lähetä tilaus',
}
export enum EPleaseChooseAProduct {
  en = 'Please choose a product',
  es = 'Por favor, elige un producto',
  fr = 'Veuillez choisir un produit',
  de = 'Bitte wählen Sie ein Produkt',
  pt = 'Por favor, escolha um produto',
  cs = 'Vyberte prosím produkt',
  fi = 'Valitse tuote',
}
export enum EAddedToCart {
  en = 'Added to cart',
  es = 'Añadido al carrito',
  fr = 'Ajouté au panier',
  de = 'In den Warenkorb gelegt',
  pt = 'Adicionado ao carrinho',
  cs = 'Přidáno do košíku',
  fi = 'Lisätty ostoskoriin',
}
export enum EBackToStore {
  en = 'Back to store',
  es = 'Volver a la tienda',
  fr = 'Retour à la boutique',
  de = 'Zurück zum Geschäft',
  pt = 'Voltar à loja',
  cs = 'Zpět do obchodu',
  fi = 'Takaisin kauppaan',
}
export enum ERequestsAndNeeds {
  en = 'Requests and needs',
  es = 'Solicitudes y necesidades',
  fr = 'Demandes et besoins',
  de = 'Wünsche und Bedürfnisse',
  pt = 'Pedidos e necessidades',
  cs = 'Přání a potřeby',
  fi = 'Toiveet ja tarpeet',
}
export enum EBusinessID {
  en = 'Business ID',
  es = 'NIF',
  fr = 'Numéro de TVA',
  de = 'USt-IdNr.',
  pt = 'NIF',
  cs = 'DIČ',
  fi = 'Y-tunnus',
}
export enum ECompanyName {
  en = 'Company name',
  es = 'Nombre de la empresa',
  fr = "Nom de l'entreprise",
  de = 'Firmenname',
  pt = 'Nome da empresa',
  cs = 'Název společnosti',
  fi = 'Yrityksen nimi',
}
export enum EAssociationName {
  en = 'Association name',
  es = 'Nombre de la asociación',
  fr = "Nom de l'association",
  de = 'Vereinsname',
  pt = 'Nome da associação',
  cs = 'Název sdružení',
  fi = 'Yhdistyksen nimi',
}
export enum EContactPerson {
  en = 'Contact person',
  es = 'Persona de contacto',
  fr = 'Personne de contact',
  de = 'Kontaktperson',
  pt = 'Pessoa de contato',
  cs = 'Kontaktní osoba',
  fi = 'Yhteyshenkilö',
}
export enum EAddress {
  en = 'Address',
  es = 'Dirección',
  fr = 'Adresse',
  de = 'Adresse',
  pt = 'Endereço',
  cs = 'Adresa',
  fi = 'Osoite',
}
export enum EPostalCode {
  en = 'Postal code',
  es = 'Código postal',
  fr = 'Code postal',
  de = 'Postleitzahl',
  pt = 'Código postal',
  cs = 'PSČ',
  fi = 'Postinumero',
}
export enum ECity {
  en = 'City',
  es = 'Ciudad',
  fr = 'Ville',
  de = 'Stadt',
  pt = 'Cidade',
  cs = 'Město',
  fi = 'Kaupunki',
}
export enum ECountry {
  en = 'Country',
  es = 'País',
  fr = 'Pays',
  de = 'Land',
  pt = 'País',
  cs = 'Země',
  fi = 'Maa',
}
export enum EPhone {
  en = 'Phone',
  es = 'Teléfono',
  fr = 'Téléphone',
  de = 'Telefon',
  pt = 'Telefone',
  cs = 'Telefon',
  fi = 'Puhelin',
}
export enum ECompanyOrAssociation {
  en = 'Company or association',
  es = 'Empresa o asociación',
  fr = 'Entreprise ou association',
  de = 'Unternehmen oder Verein',
  pt = 'Empresa ou associação',
  cs = 'Společnost nebo sdružení',
  fi = 'Yritys tai yhdistys',
}
export enum ECompany {
  en = 'Company',
  es = 'Empresa',
  fr = 'Entreprise',
  de = 'Unternehmen',
  pt = 'Empresa',
  cs = 'Společnost',
  fi = 'Yritys',
}
export enum EAssociation {
  en = 'Association',
  es = 'Asociación',
  fr = 'Association',
  de = 'Verein',
  pt = 'Associação',
  cs = 'Sdružení',
  fi = 'Yhdistys',
}
export enum EPrivatePerson {
  en = 'Private person',
  es = 'Persona privada',
  fr = 'Personne privée',
  de = 'Privatperson',
  pt = 'Pessoa privada',
  cs = 'Soukromá osoba',
  fi = 'Yksityishenkilö',
}
export enum EBillingAddress {
  en = 'Billing address',
  es = 'Dirección de facturación',
  fr = 'Adresse de facturation',
  de = 'Rechnungsadresse',
  pt = 'Endereço de faturação',
  cs = 'Fakturační adresa',
  fi = 'Laskutusosoite',
}
export enum EOrderID {
  en = 'Order ID',
  es = 'ID del pedido',
  fr = 'ID de commande',
  de = 'Bestellnummer',
  pt = 'ID do pedido',
  cs = 'ID objednávky',
  fi = 'Tilausnumero',
}
export enum EOrders {
  en = 'Orders',
  es = 'Pedidos',
  fr = 'Commandes',
  de = 'Bestellungen',
  pt = 'Pedidos',
  cs = 'Objednávky',
  fi = 'Tilaukset',
}
export enum EOrder {
  en = 'Order',
  es = 'Pedido',
  fr = 'Commande',
  de = 'Bestellung',
  pt = 'Pedido',
  cs = 'Objednávka',
  fi = 'Tilaus',
}
export enum EOrdered {
  en = 'Ordered',
  es = 'Ordenado',
  fr = 'Commandé',
  de = 'Bestellt',
  pt = 'Encomendado',
  cs = 'Objednáno',
  fi = 'Tilattu',
}

export enum ETextAndImageContentIsNotIncluded {
  en = 'The production or translation of text and image content is not included in the basic package',
  es = 'La producción o traducción de contenido de texto e imagen no está incluida en el paquete básico',
  fr = "La production ou la traduction de contenu textuel et visuel n'est pas incluse dans le forfait de base",
  de = 'Die Produktion oder Übersetzung von Text- und Bildinhalten ist nicht im Basispaket enthalten',
  pt = 'A produção ou tradução de conteúdo de texto e imagem não está incluída no pacote básico',
  cs = 'Výroba nebo překlad textového a obrazového obsahu není zahrnut v základním balíčku',
  fi = 'Tekstin ja kuvien tuotanto tai kääntäminen ei sisälly peruspakettiin',
}
export enum EWebHostingAndDomainNotIncluded {
  en = 'Web hosting and domain are not included in the price',
  es = 'El alojamiento web y el dominio no están incluidos en el precio',
  fr = "L'hébergement web et le domaine ne sont pas inclus dans le prix",
  de = 'Webhosting und Domain sind nicht im Preis enthalten',
  pt = 'A hospedagem e o domínio não estão incluídos no preço',
  cs = 'Webhosting a doména nejsou zahrnuty v ceně',
  fi = 'Webhotelli ja verkkotunnus eivät sisälly hintaan',
}
export enum EPrintingCostsNotIncluded {
  en = 'Printing costs are not included in the price',
  es = 'Los costos de impresión no están incluidos en el precio',
  fr = "Les coûts d'impression ne sont pas inclus dans le prix",
  de = 'Druckkosten sind nicht im Preis enthalten',
  pt = 'Os custos de impressão não estão incluídos no preço',
  cs = 'Náklady na tisk nejsou zahrnuty v ceně',
  fi = 'Painokustannukset eivät sisälly hintaan',
}
export enum ESimpleReactWebsite {
  en = 'Simple React Website',
  es = 'Sitio web de React simple',
  fr = 'Site web React simple',
  de = 'Einfache React-Website',
  pt = 'Site React simples',
  cs = 'Jednoduchý web React',
  fi = 'Yksinkertainen React-verkkosivusto',
}
export enum EReactWebsite {
  en = 'React Website',
  es = 'Sitio web de React',
  fr = 'Site web React',
  de = 'React-Website',
  pt = 'Site React',
  cs = 'Web React',
  fi = 'React-verkkosivusto',
}
export enum ESimpleWordPressWebsite {
  en = 'Simple WordPress Website',
  es = 'Sitio web de WordPress simple',
  fr = 'Site web WordPress simple',
  de = 'Einfache WordPress-Website',
  pt = 'Site WordPress simples',
  cs = 'Jednoduchý web WordPress',
  fi = 'Yksinkertainen WordPress-verkkosivusto',
}
export enum EReactWebsiteWithContactFormAndOtherFunctionality {
  en = 'NodeJS + React Website with Contact Form and other functionality',
  es = 'Sitio web de NodeJS + React con formulario de contacto y otra funcionalidad',
  fr = 'Site Web NodeJS + React avec formulaire de contact et autres fonctionnalités',
  de = 'NodeJS + React-Website mit Kontaktformular und anderen Funktionen',
  pt = 'Site NodeJS + React com formulário de contato e outra funcionalidade',
  cs = 'NodeJS + React Web s kontaktním formulářem a další funkcionalitou',
  fi = 'NodeJS + React-verkkosivusto yhteydenottolomakkeella ja jollakin muulla toiminnallisuudella',
}
export enum EAnAccessibleSinglePageWebsite {
  en = 'An accessible single page website without extra functionalities.',
  es = 'Un sitio web de una sola página accesible sin funcionalidades adicionales.',
  fr = "Un site web d'une seule page accessible sans fonctionnalités supplémentaires.",
  de = 'Eine barrierefreie Einzelseiten-Website ohne zusätzliche Funktionen.',
  pt = 'Um site de uma única página acessível sem funcionalidades extras.',
  cs = 'Přístupný jednostránkový web bez dalších funkcí.',
  fi = 'Saavutettava yksisivuinen verkkosivusto ilman ylimääräisiä toimintoja.',
}
export enum EMayContainEffects {
  en = 'May contain effects such as a modal window that opens when an image is clicked, or small animations.',
  es = 'Puede contener efectos como una ventana modal que se abre al hacer clic en una imagen, o pequeñas animaciones.',
  fr = "Peut contenir des effets tels qu'une fenêtre modale qui s'ouvre lorsqu'une image est cliquée, ou de petites animations.",
  de = 'Kann Effekte wie ein Modalfenster enthalten, das sich öffnet, wenn auf ein Bild geklickt wird, oder kleine Animationen.',
  pt = 'Pode conter efeitos como uma janela modal que se abre quando uma imagem é clicada, ou pequenas animações.',
  cs = 'Může obsahovat efekty, jako je modální okno, které se otevře při kliknutí na obrázek, nebo malé animace.',
  fi = 'Sisältää kuitenkin tarvittaessa pieniä efektejä, kuten esimerkiksi modaalisen ikkunan, joka avautuu kuvaa klikattaessa, tai pieniä animaatioita.',
}
export enum EAnAccessibleMultiPageWebsite {
  en = 'An accessible multi-page website without extra functionalities.',
  es = 'Un sitio web de varias páginas accesible sin funcionalidades adicionales.',
  fr = 'Un site web multi-pages accessible sans fonctionnalités supplémentaires.',
  de = 'Eine barrierefreie Mehrseiten-Website ohne zusätzliche Funktionen.',
  pt = 'Um site de várias páginas acessível sem funcionalidades extras.',
  cs = 'Přístupný vícestránkový web bez dalších funkcí.',
  fi = 'Saavutettava monisivuinen verkkosivusto ilman ylimääräisiä toimintoja.',
}
export enum EAnAccessibleWebsiteWithBlogAndContactForm {
  en = 'An accessible website with a blog section and contact form.',
  es = 'Un sitio web accesible con una sección de blog y formulario de contacto.',
  fr = 'Un site web accessible avec une section blog et un formulaire de contact.',
  de = 'Eine barrierefreie Website mit einem Blogbereich und einem Kontaktformular.',
  pt = 'Um site acessível com uma seção de blog e formulário de contato.',
  cs = 'Přístupný web s blogovou sekcí a kontaktním formulářem.',
  fi = 'Saavutettava verkkosivusto, jossa on blogiosio ja yhteydenottolomake.',
}
export enum ETheBlogSectionCanBeNewsArticlesEtc {
  en = 'The blog section can also be news, articles, etc.',
  es = 'La sección de blog también puede ser noticias, artículos, etc.',
  fr = 'La section blog peut également être des nouvelles, des articles, etc.',
  de = 'Der Blogbereich kann auch Nachrichten, Artikel usw. sein.',
  pt = 'A seção de blog também pode ser notícias, artigos, etc.',
  cs = 'Blogová sekce může být také zprávy, články atd.',
  fi = 'Blogiosio voi olla myös uutisia, artikkeleita, jne.',
}
export enum EAnAccessibleWebsiteWithContactFormAndOtherFunctionality {
  en = 'An accessible website with a contact form and some other functionality.',
  es = 'Un sitio web accesible con un formulario de contacto y alguna otra funcionalidad.',
  fr = 'Un site web accessible avec un formulaire de contact et une autre fonctionnalité.',
  de = 'Eine barrierefreie Website mit einem Kontaktformular und einer anderen Funktionalität.',
  pt = 'Um site acessível com um formulário de contato e alguma outra funcionalidade.',
  cs = 'Přístupný web s kontaktním formulářem a nějakou jinou funkcí.',
  fi = 'Saavutettava verkkosivusto, jossa on yhteydenottolomake ja jokin muu toiminnallisuus.',
}
export enum EAnAccessibleWebsiteWithBlogContactFormAndOnlineStore {
  en = 'An accessible website with a blog section, contact form, and online store.',
  es = 'Un sitio web accesible con una sección de blog, formulario de contacto y tienda en línea.',
  fr = 'Un site web accessible avec une section blog, un formulaire de contact et une boutique en ligne.',
  de = 'Eine barrierefreie Website mit einem Blogbereich, einem Kontaktformular und einem Online-Shop.',
  pt = 'Um site acessível com uma seção de blog, formulário de contato e loja online.',
  cs = 'Přístupný web s blogovou sekcí, kontaktním formulářem a online obchodem.',
  fi = 'Saavutettava verkkosivusto, jossa on blogiosio, yhteydenottolomake ja verkkokauppa.',
}
export enum EReactFullPackage {
  en = 'React Full Package',
  es = 'Paquete completo de React',
  fr = 'Forfait complet React',
  de = 'React Vollpaket',
  pt = 'Pacote completo React',
  cs = 'React plný balíček',
  fi = 'React täyspaketti',
}

export enum EIncludesADesignMeetingWithTheClientForWebsite {
  en = "Includes a design meeting with the client (online or in person), design of the website's appearance with three rounds of drafts, technical implementation, publication, and an hour of user training.",
  es = 'Incluye una reunión de diseño con el cliente (en línea o en persona), diseño de la apariencia del sitio web con tres rondas de borradores, implementación técnica, publicación y una hora de capacitación para el usuario.',
  fr = "Comprend une réunion de conception avec le client (en ligne ou en personne), la conception de l'apparence du site Web avec trois tours de brouillons, la mise en œuvre technique, la publication et une heure de formation pour l'utilisateur.",
  de = 'Beinhaltet ein Design-Meeting mit dem Kunden (online oder persönlich), Design des Aussehens der Website mit drei Entwürfen, technische Umsetzung, Veröffentlichung und eine Stunde Benutzerschulung.',
  pt = 'Inclui uma reunião de design com o cliente (online ou pessoalmente), design da aparência do site com três rodadas de rascunhos, implementação técnica, publicação e uma hora de treinamento do usuário.',
  cs = 'Obsahuje schůzku o designu s klientem (online nebo osobně), design vzhledu webu s třemi kolečky návrhů, technickou implementaci, publikaci a hodinu uživatelského školení.',
  fi = 'Sisältää suunnittelukokouksen asiakkaan kanssa (verkossa tai henkilökohtaisesti), verkkosivuston ulkoasun suunnittelun ja kolme luonnoskierrosta, teknisen toteutuksen, julkaisun ja tunnin käyttäjäkoulutusta.',
}
export enum EAnAccessibleWebsiteWithBlogContactFormAndOnlineStoreWooCommerce {
  en = 'An accessible website with a blog section, contact form, and small online store (WooCommerce).',
  es = 'Un sitio web accesible con una sección de blog, formulario de contacto y una pequeña tienda en línea (WooCommerce).',
  fr = 'Un site web accessible avec une section blog, un formulaire de contact et une petite boutique en ligne (WooCommerce).',
  de = 'Eine barrierefreie Website mit einem Blogbereich, einem Kontaktformular und einem kleinen Online-Shop (WooCommerce).',
  pt = 'Um site acessível com uma seção de blog, formulário de contato e uma pequena loja online (WooCommerce).',
  cs = 'Přístupný web s blogovou sekcí, kontaktním formulářem a malým online obchodem (WooCommerce).',
  fi = 'Saavutettava verkkosivusto, jossa on blogiosio, yhteydenottolomake ja pieni verkkokauppa (WooCommerce).',
}
export enum EWordPressFullPackage {
  en = 'WordPress Full Package',
  es = 'Paquete completo de WordPress',
  fr = 'Forfait complet WordPress',
  de = 'WordPress Vollpaket',
  pt = 'Pacote completo WordPress',
  cs = 'WordPress plný balíček',
  fi = 'WordPress täyspaketti',
}
export enum EAddingABlogAndContactFormToAnExistingWebsite {
  en = 'Adding a Blog and Contact Form to an Existing Website',
  es = 'Agregar un blog y un formulario de contacto a un sitio web existente',
  fr = "Ajout d'un blog et d'un formulaire de contact à un site Web existant",
  de = 'Hinzufügen eines Blogs und eines Kontaktformulars zu einer vorhandenen Website',
  pt = 'Adicionar um blog e um formulário de contato a um site existente',
  cs = 'Přidání blogu a kontaktního formuláře na existující web',
  fi = 'Blogin ja yhteydenottolomakkeen lisääminen olemassa olevaan verkkosivustoon',
}
export enum EAddingAWebStoreToAnExistingWebsite {
  en = 'Adding a Web Store (WooCommerce) to an existing WordPress website',
  es = 'Agregar una tienda web (WooCommerce) a un sitio web de WordPress existente',
  fr = "Ajout d'un magasin en ligne (WooCommerce) à un site Web WordPress existant",
  de = 'Hinzufügen eines Webshops (WooCommerce) zu einer vorhandenen WordPress-Website',
  pt = 'Adicionar uma loja online (WooCommerce) a um site WordPress existente',
  cs = 'Přidání webového obchodu (WooCommerce) na existující web WordPress',
  fi = 'Verkkokaupan (WooCommerce) lisääminen olemassa olevaan WordPress-verkkosivustoon',
}
export enum EWebStore {
  en = 'Web store',
  es = 'Tienda en línea',
  fr = 'Boutique en ligne',
  de = 'Webshop',
  pt = 'Loja online',
  cs = 'Webový obchod',
  fi = 'Verkkokauppa',
}
export enum EBlogAndContactForm {
  en = 'Blog and Contact Form',
  es = 'Blog y formulario de contacto',
  fr = 'Blog et formulaire de contact',
  de = 'Blog und Kontaktformular',
  pt = 'Blog e formulário de contato',
  cs = 'Blog a kontaktní formulář',
  fi = 'Blogi ja yhteydenottolomake',
}
export enum EWordPressWebsiteWithBlogAndContactForm {
  en = 'WordPress Website with Blog and Contact Form',
  es = 'Sitio web de WordPress con blog y formulario de contacto',
  fr = 'Site Web WordPress avec blog et formulaire de contact',
  de = 'WordPress-Website mit Blog und Kontaktformular',
  pt = 'Site WordPress com blog e formulário de contato',
  cs = 'Web WordPress s blogem a kontaktním formulářem',
  fi = 'WordPress-verkkosivusto blogilla ja yhteydenottolomakkeella',
}
export enum EWordPressWebsiteWithBlogContactFormAndOnlineStore {
  en = 'WordPress Website with Blog, Contact Form, and Online Store',
  es = 'Sitio web de WordPress con blog, formulario de contacto y tienda en línea',
  fr = 'Site Web WordPress avec blog, formulaire de contact et boutique en ligne',
  de = 'WordPress-Website mit Blog, Kontaktformular und Online-Shop',
  pt = 'Site WordPress com blog, formulário de contato e loja online',
  cs = 'Web WordPress s blogem, kontaktním formulářem a online obchodem',
  fi = 'WordPress-verkkosivusto blogilla, yhteydenottolomakkeella ja verkkokaupalla',
}
export enum ETranslationWork {
  en = 'Translation Work (English & Finnish)',
  es = 'Trabajo de traducción (inglés y finlandés)',
  fr = 'Travail de traduction (anglais et finnois)',
  de = 'Übersetzungsarbeit (Englisch & Finnisch)',
  pt = 'Trabalho de tradução (inglês e finlandês)',
  cs = 'Překladatelská práce (angličtina a finština)',
  fi = 'Käännöstyö (englanti ja suomi)',
}
export enum EWebsiteContentUpdatesOrModifications {
  en = 'Website content updates or code modifications',
  es = 'Actualizaciones de contenido del sitio web o modificaciones de código',
  fr = 'Mises à jour du contenu du site Web ou modifications du code',
  de = 'Website-Inhaltsaktualisierungen oder Code-Änderungen',
  pt = 'Atualizações de conteúdo do site ou modificações de código',
  cs = 'Aktualizace obsahu webu nebo úpravy kódu',
  fi = 'Verkkosivuston sisällön päivitykset tai koodin muutokset',
}
export enum EHour {
  en = 'hour',
  es = 'hora',
  fr = 'heure',
  de = 'Stunde',
  pt = 'hora',
  cs = 'hodina',
  fi = 'tunti',
}
export enum EHours {
  en = 'hours',
  es = 'horas',
  fr = 'heures',
  de = 'Stunden',
  pt = 'horas',
  cs = 'hodin',
  fi = 'tuntia',
}
export enum EHourlyWork {
  en = 'Hourly work',
  es = 'Trabajo por hora',
  fr = 'Travail horaire',
  de = 'Stundenarbeit',
  pt = 'Trabalho por hora',
  cs = 'Hodinová práce',
  fi = 'Tuntityö',
}
export enum EForWordPressOrReactNodeBasedWebsites {
  en = 'for WordPress or React & Node-based websites',
  es = 'para sitios web basados en WordPress o React y Node',
  fr = 'pour les sites Web basés sur WordPress ou React et Node',
  de = 'für WordPress- oder React- und Node-basierte Websites',
  pt = 'para sites baseados em WordPress ou React e Node',
  cs = 'pro webové stránky postavené na WordPressu nebo Reactu a Node',
  fi = 'WordPress- tai React- ja Node-pohjaisille verkkosivustoille',
}
export enum EWebsiteMaintenance {
  en = 'Website Maintenance',
  es = 'Mantenimiento del sitio web',
  fr = 'Maintenance du site Web',
  de = 'Website-Wartung',
  pt = 'Manutenção do site',
  cs = 'Údržba webu',
  fi = 'Verkkosivuston ylläpito',
}
export enum EIncludesADesignMeetingWithTheClientOnlineOrInPersonAndThreeDrafts {
  en = 'Includes a design meeting with the client (online or in person) and three rounds of drafts.',
  es = 'Incluye una reunión de diseño con el cliente (en línea o en persona) y tres rondas de borradores.',
  fr = 'Comprend une réunion de conception avec le client (en ligne ou en personne) et trois tours de brouillons.',
  de = 'Beinhaltet ein Design-Meeting mit dem Kunden (online oder persönlich) und drei Entwurfsrunden.',
  pt = 'Inclui uma reunião de design com o cliente (online ou pessoalmente) e três rodadas de rascunhos.',
  cs = 'Obsahuje designovou schůzku s klientem (online nebo osobně) a tři kola návrhů.',
  fi = 'Sisältää suunnittelukokouksen asiakkaan kanssa (verkossa tai henkilökohtaisesti) ja kolme luonnoskierrosta.',
}
export enum EPosterAndProgramme {
  en = 'Poster and Programme',
  es = 'Cartel y programa',
  fr = 'Affiche et programme',
  de = 'Poster und Programm',
  pt = 'Cartaz e programa',
  cs = 'Plakát a program',
  fi = 'Juliste ja ohjelma',
}
export enum EPosterAndProgrammeDesign {
  en = 'Poster and Programme Design',
  es = 'Diseño de cartel y programa',
  fr = "Conception d'affiches et de programmes",
  de = 'Poster- und Programmgestaltung',
  pt = 'Design de cartaz e programa',
  cs = 'Návrh plakátu a programu',
  fi = 'Julisteen ja ohjelman suunnittelu',
}
export enum EPosterAndProgrammeCombo {
  en = 'Poster and Programme Combo',
  es = 'Combo de cartel y programa',
  fr = 'Combo affiche et programme',
  de = 'Poster- und Programm-Combo',
  pt = 'Combo de cartaz e programa',
  cs = 'Kombo plakátu a programu',
  fi = 'Julisteen ja ohjelman yhdistelmä',
}
export enum ELogoDesign {
  en = 'Logo Design',
  es = 'Diseño de logotipo',
  fr = 'Conception de logo',
  de = 'Logo-Design',
  pt = 'Design de logotipo',
  cs = 'Návrh loga',
  fi = 'Logon/liikemerkin suunnittelu',
}
export enum EIncludesPrintableAndWebVersionOfTheLogo {
  en = 'Includes a printable and web version of the logo.',
  es = 'Incluye una versión imprimible y web del logotipo.',
  fr = 'Comprend une version imprimable et web du logo.',
  de = 'Beinhaltet eine druckbare und Web-Version des Logos.',
  pt = 'Inclui uma versão imprimível e web do logotipo.',
  cs = 'Zahrnuje tisknutelnou a webovou verzi loga.',
  fi = 'Sisältää tulostettavan ja verkkoversion logosta.',
}
export enum EBusinessCardDesign {
  en = 'Business Card Design',
  es = 'Diseño de tarjeta de visita',
  fr = 'Conception de carte de visite',
  de = 'Visitenkarten-Design',
  pt = 'Design de cartão de visita',
  cs = 'Návrh vizitky',
  fi = 'Käyntikortin suunnittelu',
}
export enum EOneSidedBusinessCard {
  en = 'One-sided business card',
  es = 'Tarjeta de visita de una cara',
  fr = 'Carte de visite recto',
  de = 'Einseitige Visitenkarte',
  pt = 'Cartão de visita de um lado',
  cs = 'Jednostranná vizitka',
  fi = 'Yksipuolinen käyntikortti',
}
export enum ETwoSidedBusinessCard {
  en = 'Two-sided business card',
  es = 'Tarjeta de visita de dos caras',
  fr = 'Carte de visite recto verso',
  de = 'Zweiseitige Visitenkarte',
  pt = 'Cartão de visita de dois lados',
  cs = 'Oboustranná vizitka',
  fi = 'Kaksipuolinen käyntikortti',
}
export enum EWebsites {
  en = 'Websites',
  es = 'Sitios web',
  fr = 'Sites Web',
  de = 'Webseiten',
  pt = 'Sites',
  cs = 'Webové stránky',
  fi = 'Verkkosivut',
}
export enum EGoToCart {
  en = 'Go to cart',
  es = 'Ir al carrito',
  fr = 'Aller au panier',
  de = 'Zum Warenkorb',
  pt = 'Ir para o carrinho',
  cs = 'Jít do košíku',
  fi = 'Siirry ostoskoriin',
}
export enum EWordPressPaidPluginsNotIncluded {
  en = 'Possible WordPress paid plugins are not included in the price.',
  es = 'Los posibles complementos de pago de WordPress no están incluidos en el precio.',
  fr = 'Les éventuels plugins payants de WordPress ne sont pas inclus dans le prix.',
  de = 'Mögliche kostenpflichtige WordPress-Plugins sind nicht im Preis enthalten.',
  pt = 'Possíveis plugins pagos do WordPress não estão incluídos no preço.',
  cs = 'Možné placené pluginy WordPress nejsou zahrnuty v ceně.',
  fi = 'Mahdolliset maksulliset WordPress-lisäosat eivät sisälly hintaan.',
}
export enum ETheseAreAgreedSeparately {
  en = 'These are agreed separately.',
  es = 'Estos se acuerdan por separado.',
  fr = 'Ces éléments sont convenus séparément.',
  de = 'Diese werden separat vereinbart.',
  pt = 'Estes são acordados separadamente.',
  cs = 'Tyto jsou dohodnuty samostatně.',
  fi = 'Nämä sovitaan erikseen.',
}
export enum ERequestForQuote {
  en = 'Request for Quote',
  es = 'Solicitud de presupuesto',
  fr = 'Demande de devis',
  de = 'Angebot anfordern',
  pt = 'Pedido de orçamento',
  cs = 'Žádost o cenovou nabídku',
  fi = 'Tarjouspyyntö',
}
export enum ERequestForQuoteForProductsNotInStore {
  en = 'Request for quote for products not in store',
  es = 'Solicitud de presupuesto para productos que no están en la tienda',
  fr = 'Demande de devis pour des produits non disponibles en magasin',
  de = 'Angebot anfordern für Produkte, die nicht im Geschäft sind',
  pt = 'Pedido de orçamento para produtos não disponíveis na loja',
  cs = 'Žádost o cenovou nabídku pro produkty, které nejsou v obchodě',
  fi = 'Tarjouspyyntö tuotteille, joita ei löydy verkkokaupasta',
}
export enum EEGInfographicsOrMotionGraphics {
  en = 'E.g. infographics or motion graphics',
  es = 'Por ejemplo, infografías o gráficos en movimiento',
  fr = 'Par exemple, infographies ou graphiques animés',
  de = 'Zum Beispiel Infografiken oder Bewegungsgrafiken',
  pt = 'Por exemplo, infográficos ou gráficos em movimento',
  cs = 'Například infografiky nebo pohyblivé grafiky',
  fi = 'Esimerkiksi infografiikkaa tai liikegrafiikkaa',
}
export enum EWordPressWebsite {
  en = 'WordPress Website',
  es = 'Sitio web de WordPress',
  fr = 'Site Web WordPress',
  de = 'WordPress-Website',
  pt = 'Site WordPress',
  cs = 'Web WordPress',
  fi = 'WordPress-verkkosivusto',
}
export enum EPosterDesign {
  en = 'Poster Design',
  es = 'Diseño de póster',
  fr = "Conception d'affiche",
  de = 'Poster-Design',
  pt = 'Design de cartaz',
  cs = 'Návrh plakátu',
  fi = 'Julisteen suunnittelu',
}
export enum EFlyerDesign {
  en = 'Flyer Design',
  es = 'Diseño de folleto',
  fr = 'Conception de flyer',
  de = 'Flyer-Design',
  pt = 'Design de folheto',
  cs = 'Návrh letáku',
  fi = 'Lehtisen suunnittelu',
}
export enum EOneSided {
  en = 'One-sided',
  es = 'De una cara',
  fr = 'Recto',
  de = 'Einseitig',
  pt = 'De um lado',
  cs = 'Jednostranný',
  fi = 'Yksipuoleinen',
}
export enum ETwoSided {
  en = 'Two-sided',
  es = 'De dos caras',
  fr = 'Recto verso',
  de = 'Zweiseitig',
  pt = 'De dois lados',
  cs = 'Oboustranný',
  fi = 'Kaksipuoleinen',
}
export enum EProgrammeDesign {
  en = 'Programme Design',
  es = 'Diseño de programa',
  fr = 'Conception de programme',
  de = 'Programm-Design',
  pt = 'Design de programa',
  cs = 'Návrh programu',
  fi = 'Ohjelman suunnittelu',
}
export enum EFourPageA5SizeProgramme {
  en = 'Four-page A5-size programme (A4 folded)',
  es = 'Programa de cuatro páginas de tamaño A5 (A4 plegado)',
  fr = 'Programme de quatre pages au format A5 (A4 plié)',
  de = 'Vierseitiges A5-Programm (A4 gefaltet)',
  pt = 'Programa de quatro páginas no formato A5 (A4 dobrado)',
  cs = 'Čtyřstránkový program ve formátu A5 (A4 složený)',
  fi = 'Nelisivuinen A5-kokoinen ohjelma (A4 taitettuna)',
}
export enum ESeeTranslationServiceProduct {
  en = 'See translation service product for English and Finnish translations',
  es = 'Consulte el producto de servicios de traducción para las traducciones al inglés y finlandés',
  fr = 'Voir le produit de service de traduction pour les traductions en anglais et en finnois',
  de = 'Siehe Übersetzungsdienstprodukt für englische und finnische Übersetzungen',
  pt = 'Consulte o produto de serviço de tradução para traduções em inglês e finlandês',
  cs = 'Podívejte se na produkt překladatelských služeb pro anglické a finské překlady',
  fi = 'Katso käännöspalvelun tuote englannin ja suomen käännöksille',
}

export enum EBuy5Get6 {
  en = 'Buy 5 hours, get 6 hours!',
  es = '¡Compra 5 horas, obtén 6 horas!',
  fr = 'Achetez 5 heures, obtenez 6 heures!',
  de = 'Kaufen Sie 5 Stunden, erhalten Sie 6 Stunden!',
  pt = 'Compre 5 horas, ganhe 6 horas!',
  cs = 'Kupte si 5 hodin, získejte 6 hodin!',
  fi = 'Osta 5 tuntia, saat 6 tuntia!',
}
export enum EPayFor5HoursGet6 {
  en = 'Pay for five hours of work at once, and you will get six hours worth of work.',
  es = 'Pague por cinco horas de trabajo de una vez, y obtendrá seis horas de trabajo.',
  fr = "Payez cinq heures de travail d'un coup, et vous obtiendrez six heures de travail.",
  de = 'Zahlen Sie fünf Stunden Arbeit auf einmal, und Sie erhalten sechs Stunden Arbeit.',
  pt = 'Pague por cinco horas de trabalho de uma só vez e você receberá seis horas de trabalho.',
  cs = 'Zaplaťte za pět hodin práce najednou a dostanete šest hodin práce!',
  fi = 'Maksa kerralla viiden tunnin työstä, niin saat kuuden tunnin edestä työtä.',
}
export enum EPayFor10HoursGet13 {
  en = 'Pay for ten hours of work at once, and you will get thirteen hours worth of work!',
  es = '¡Pague por diez horas de trabajo de una vez, y obtendrá trece horas de trabajo!',
  fr = "Payez dix heures de travail d'un coup, et vous obtiendrez treize heures de travail!",
  de = 'Zahlen Sie zehn Stunden Arbeit auf einmal, und Sie erhalten dreizehn Stunden Arbeit!',
  pt = 'Pague por dez horas de trabalho de uma só vez e você receberá treze horas de trabalho!',
  cs = 'Zaplaťte za deset hodin práce najednou a dostanete třináct hodin práce!',
  fi = 'Maksa kerralla kymmenen tunnin työstä, niin saat kolmentoista tunnin edestä työtä!',
}

export enum EHourlyWorkCanBeUsed {
  en = 'Hourly work can be used (for example) an hour at a time every month until the hours are used up.',
  es = 'El trabajo por horas se puede utilizar (por ejemplo) una hora a la vez cada mes hasta que se agoten las horas.',
  fr = 'Le travail horaire peut être utilisé (par exemple) une heure à la fois chaque mois jusqu’à épuisement des heures.',
  de = 'Stundenarbeit kann (zum Beispiel) stundenweise jeden Monat verwendet werden, bis die Stunden aufgebraucht sind.',
  pt = 'O trabalho por hora pode ser usado (por exemplo) uma hora de cada vez a cada mês até que as horas sejam usadas.',
  cs = 'Hodinová práce může být použita (například) hodinu za hodinu každý měsíc, dokud hodiny nebudou vyčerpány.',
  fi = 'Tuntityötä voidaan käyttää (esimerkiksi) tunti kerrallaan joka kuukausi, kunnes tunnit on käytetty loppuun.',
}
export enum EFreeHourUnlocked {
  en = 'Free hour unlocked!',
  es = '¡Hora gratis desbloqueada!',
  fr = 'Heure gratuite débloquée!',
  de = 'Kostenlose Stunde freigeschaltet!',
  pt = 'Hora gratuita desbloqueada!',
  cs = 'Odemyká se zdarma!',
  fi = 'Ilmainen tunti saatu!',
}
export enum EReferenceForInvoice {
  en = 'Reference for invoice',
  es = 'Referencia para la factura',
  fr = 'Référence pour la facture',
  de = 'Referenz für Rechnung',
  pt = 'Referência para fatura',
  cs = 'Reference pro fakturu',
  fi = 'Viite laskua varten',
}
export enum ESaveTheFollowingAmountOfMoney {
  en = 'Save',
  es = 'Ahorra',
  fr = 'Économisez',
  de = 'Spare',
  pt = 'Poupe',
  cs = 'Ušetřete',
  fi = 'Säästä',
}
export enum EOrderCompleted {
  en = 'Order completed',
  es = 'Pedido completado',
  fr = 'Commande terminée',
  de = 'Bestellung abgeschlossen',
  pt = 'Pedido concluído',
  cs = 'Objednávka dokončena',
  fi = 'Tilaus valmis',
}
export enum EOrderNotCompleted {
  en = 'Order not completed',
  es = 'Pedido no completado',
  fr = 'Commande non terminée',
  de = 'Bestellung nicht abgeschlossen',
  pt = 'Pedido não concluído',
  cs = 'Objednávka nebyla dokončena',
  fi = 'Tilaus ei valmis',
}
export enum EMissingPayment {
  en = 'Missing payment',
  es = 'Pago faltante',
  fr = 'Paiement manquant',
  de = 'Fehlende Zahlung',
  pt = 'Pagamento em falta',
  cs = 'Chybějící platba',
  fi = 'Maksu puuttuu',
}
export enum ENoPayment {
  en = 'No payment',
  es = 'Sin pago',
  fr = 'Pas de paiement',
  de = 'Keine Zahlung',
  pt = 'Sem pagamento',
  cs = 'Žádná platba',
  fi = 'Ei maksua',
}
export enum EPaymentState {
  en = 'Payment state',
  es = 'Estado de pago',
  fr = 'État de paiement',
  de = 'Zahlungsstatus',
  pt = 'Estado de pagamento',
  cs = 'Stav platby',
  fi = 'Maksun tila',
}
export enum EPartial {
  en = 'Partial',
  es = 'Parcial',
  fr = 'Partiel',
  de = 'Teilweise',
  pt = 'Parcial',
  cs = 'Částečný',
  fi = 'Osittainen',
}
export enum EFull {
  en = 'Full',
  es = 'Completo',
  fr = 'Complet',
  de = 'Voll',
  pt = 'Completo',
  cs = 'Plný',
  fi = 'Täysi',
}
export enum EInProgress {
  en = 'In progress',
  es = 'En progreso',
  fr = 'En cours',
  de = 'In Bearbeitung',
  pt = 'Em andamento',
  cs = 'Probíhá',
  fi = 'Käynnissä',
}
export enum EPending {
  en = 'Pending',
  es = 'Pendiente',
  fr = 'En attente',
  de = 'Ausstehend',
  pt = 'Pendente',
  cs = 'Čeká',
  fi = 'Odottaa',
}
export enum ECancelled {
  en = 'Cancelled',
  es = 'Cancelado',
  fr = 'Annulé',
  de = 'Abgesagt',
  pt = 'Cancelado',
  cs = 'Zrušeno',
  fi = 'Peruttu',
}
export enum EIncludes {
  en = 'Includes',
  es = 'Incluye',
  fr = 'Comprend',
  de = 'Beinhaltet',
  pt = 'Inclui',
  cs = 'Obsahuje',
  fi = 'Sisältää',
}
export enum EReactSitesAppsAreFastAndResponsive {
  en = 'React sites/apps are fast and responsive, and they can be built with a variety of functionalities and interactivity.',
  es = 'Los sitios/aplicaciones de React son rápidos y receptivos, y se pueden construir con una variedad de funcionalidades e interactividad.',
  fr = "Les sites/applications React sont rapides et réactifs, et ils peuvent être construits avec une variété de fonctionnalités et d'interactivité.",
  de = 'React-Websites/Apps sind schnell und reaktionsschnell und können mit einer Vielzahl von Funktionen und Interaktivität erstellt werden.',
  pt = 'Os sites/aplicativos React são rápidos e responsivos e podem ser construídos com uma variedade de funcionalidades e interatividade.',
  cs = 'Weby/aplikace React jsou rychlé a responzivní a lze je postavit s různými funkcemi a interaktivitou.',
  fi = 'React-sivustot/-sovellukset ovat nopeita ja responsiivisia, ja niitä voidaan rakentaa monenlaisilla toiminnoilla ja vuorovaikutteisuudella.',
}
export enum EWordPressSitesAreVersatile {
  en = 'WordPress sites are versatile and can be built easily.',
  es = 'Los sitios de WordPress son versátiles y se pueden construir fácilmente.',
  fr = 'Les sites WordPress sont polyvalents et peuvent être construits facilement.',
  de = 'WordPress-Websites sind vielseitig und können leicht erstellt werden.',
  pt = 'Os sites WordPress são versáteis e podem ser construídos facilmente.',
  cs = 'Webové stránky na WordPress jsou všestranné a lze je snadno postavit.',
  fi = 'WordPress-sivustot ovat monipuolisia ja niitä voidaan rakentaa helposti.',
}
export enum EUpdatingWordPressIsSimple {
  en = 'Updating WordPress is a simple matter of clicking a button, but it is important to regularily keep the site up to date to prevent security vulnerabilities.',
  es = 'Actualizar WordPress es tan simple como hacer clic en un botón, pero es importante mantener el sitio regularmente actualizado para evitar vulnerabilidades de seguridad.',
  fr = 'Mettre à jour WordPress est aussi simple que de cliquer sur un bouton, mais il est important de garder le site régulièrement à jour pour éviter les vulnérabilités de sécurité.',
  de = 'Das Aktualisieren von WordPress ist eine einfache Angelegenheit, aber es ist wichtig, die Website regelmäßig auf dem neuesten Stand zu halten, um Sicherheitslücken zu vermeiden.',
  pt = 'Atualizar o WordPress é uma questão simples de clicar em um botão, mas é importante manter o site regularmente atualizado para evitar vulnerabilidades de segurança.',
  cs = 'Aktualizace WordPressu je jednoduchá záležitost kliknutím na tlačítko, ale je důležité pravidelně udržovat web aktuální, abyste předešli bezpečnostním hrozbám.',
  fi = 'WordPressin päivittäminen on yksinkertainen asia, mutta sivusto on pidettävä säännöllisesti ajan tasalla turvallisuusuhkien välttämiseksi.',
}
export enum EDesiredReference {
  en = 'Desired reference',
  es = 'Referencia deseada',
  fr = 'Référence souhaitée',
  de = 'Gewünschte Referenz',
  pt = 'Referência desejada',
  cs = 'Požadovaná reference',
  fi = 'Toivottu viite',
}
export enum EEG {
  en = 'e.g.',
  es = 'por ejemplo',
  fr = 'par exemple',
  de = 'z.B.',
  pt = 'por exemplo',
  cs = 'např.',
  fi = 'esim.',
}
export enum EAddingFunctionalityToAReactSite {
  en = 'Adding functionality to a React site',
  es = 'Agregar funcionalidad a un sitio de React',
  fr = 'Ajout de fonctionnalités à un site React',
  de = 'Hinzufügen von Funktionalität zu einer React-Website',
  pt = 'Adicionando funcionalidade a um site React',
  cs = 'Přidání funkcionality na web React',
  fi = 'Toiminnallisuuden lisääminen React-sivustolle',
}
export enum EFunctionalitiesCanBe {
  en = "Functionalities can be, for example, a restaurant menu and its editing, or a company's services and their editing, user login and order sending, or a blog and its editing.",
  es = 'Las funcionalidades pueden ser, por ejemplo, un menú de restaurante y su edición, o los servicios de una empresa y su edición, inicio de sesión de usuario y envío de pedidos, o un blog y su edición.',
  fr = "Les fonctionnalités peuvent être, par exemple, un menu de restaurant et son édition, ou les services d'une entreprise et leur édition, la connexion de l'utilisateur et l'envoi de commandes, ou un blog et son édition.",
  de = 'Funktionalitäten können beispielsweise ein Restaurantmenü und dessen Bearbeitung, oder die Dienstleistungen eines Unternehmens und deren Bearbeitung, Benutzeranmeldung und Bestellungssendung, oder ein Blog und dessen Bearbeitung sein.',
  pt = 'As funcionalidades podem ser, por exemplo, um menu de restaurante e sua edição, ou os serviços de uma empresa e sua edição, login do usuário e envio de pedidos, ou um blog e sua edição.',
  cs = 'Funkcionalita může být například menu restaurace a jeho úprava, nebo služby společnosti a jejich úprava, přihlášení uživatele a odesílání objednávek, nebo blog a jeho úprava.',
  fi = 'Toiminnallisuudet voivat olla esimerkiksi ravintolan menu ja sen muokkaus, tai yrityksen palvelut ja niiden muokkaus, käyttäjien kirjautuminen ja tilausten lähettäminen, tai vaikka blogi ja sen muokkaus.',
}
export enum EIfYouAreUnsureAboutReactOrWordPress {
  en = 'If you are unsure about whether React or WordPress is better suited to your needs, contact us and ask for advice. We can discuss which solution is best suited to your needs.',
  es = 'Si no está seguro de si React o WordPress se adapta mejor a sus necesidades, contáctenos y solicite asesoramiento. Podemos discutir qué solución se adapta mejor a sus necesidades.',
  fr = 'Si vous ne savez pas si React ou WordPress est le mieux adapté à vos besoins, contactez-nous et demandez conseil. Nous pouvons discuter de la solution la mieux adaptée à vos besoins.',
  de = 'Wenn Sie sich nicht sicher sind, ob React oder WordPress besser für Ihre Anforderungen geeignet ist, kontaktieren Sie uns und fragen Sie nach Rat. Wir können besprechen, welche Lösung am besten geeignet ist.',
  pt = 'Se você não tiver certeza se React ou WordPress é mais adequado para suas necessidades, entre em contato e peça um conselho. Podemos discutir qual solução é mais adequada para suas necessidades.',
  cs = 'Pokud si nejste jisti, zda je pro vaše potřeby vhodnější React nebo WordPress, kontaktujte nás a požádejte o radu. Můžeme společně projednat, které řešení je pro vás nejlepší.',
  fi = 'Jos olet epävarma siitä, sopiiko React vai WordPress paremmin tarpeisiinne, ota yhteyttä ja kysy neuvoa. Voimme keskustella siitä, mikä ratkaisu sopii parhaiten tarpeisiinne.',
}
export enum EColorsMayVaryInPrintedWorks {
  en = 'In printed works, it is always possible that the colors do not exactly match the colors displayed on the screen. This is because the screen uses light and the print uses ink. Colors may also vary with different printing materials.',
  es = 'En trabajos impresos, siempre es posible que los colores no coincidan exactamente con los colores que se muestran en la pantalla. Esto se debe a que la pantalla utiliza luz y la impresión utiliza tinta. Los colores también pueden variar con diferentes materiales de impresión.',
  fr = "Dans les travaux imprimés, il est toujours possible que les couleurs ne correspondent pas exactement aux couleurs affichées à l'écran. Cela est dû au fait que l'écran utilise la lumière et l'impression utilise l'encre. Les couleurs peuvent également varier avec différents matériaux d'impression.",
  de = 'Bei gedruckten Arbeiten ist es immer möglich, dass die Farben nicht genau mit den auf dem Bildschirm angezeigten Farben übereinstimmen. Dies liegt daran, dass der Bildschirm Licht verwendet und der Druck Tinte verwendet. Die Farben können auch bei verschiedenen Druckmaterialien variieren.',
  pt = 'Em trabalhos impressos, é sempre possível que as cores não correspondam exatamente às cores exibidas na tela. Isso ocorre porque a tela usa luz e a impressão usa tinta. As cores também podem variar com diferentes materiais de impressão.',
  cs = 'U tištěných prací je vždy možné, že barvy nebudou přesně odpovídat barvám zobrazeným na obrazovce. To je způsobeno tím, že obrazovka používá světlo a tisk používá inkoust. Barvy se mohou také lišit u různých tiskových materiálů.',
  fi = 'Tulostetöissä on aina mahdollista, että värit eivät vastaa täysin näytöllä näkyviä värejä. Tämä johtuu siitä, että näytöllä käytetään valoa ja tulosteessa mustetta. Värit voivat myös vaihdella eri tulostusmateriaaleilla.',
}
export enum EICanHelpWithFindingHosting {
  en = 'I can help with finding hosting solutions, but the subscriber is responsible for the costs and maintenance. I can also help with domain registration.',
  es = 'Puedo ayudar con la búsqueda de soluciones de alojamiento, pero el suscriptor es responsable de los costos y el mantenimiento. También puedo ayudar con el registro de dominios.',
  fr = "Je peux aider à trouver des solutions d'hébergement, mais l'abonné est responsable des coûts et de la maintenance. Je peux également aider à l'enregistrement de domaines.",
  de = 'Ich kann bei der Suche nach Hosting-Lösungen helfen, aber der Abonnent ist für die Kosten und die Wartung verantwortlich. Ich kann auch bei der Domainregistrierung helfen.',
  pt = 'Posso ajudar a encontrar soluções de hospedagem, mas o assinante é responsável pelos custos e pela manutenção. Posso também ajudar com o registro de domínios.',
  cs = 'Mohu pomoci s hledáním hostingových řešení, ale odběratel je zodpovědný za náklady a údržbu. Mohu také pomoci s registrací domény.',
  fi = 'Voin auttaa hosting-ratkaisujen löytämisessä, mutta tilaaja vastaa kustannuksista ja ylläpidosta. Voin myös auttaa verkkotunnuksen rekisteröinnissä.',
}
export enum ICanHelpWithFindingPrintingServices {
  en = 'I can help with finding printing services, but the subscriber is responsible for the costs.',
  es = 'Puedo ayudar con la búsqueda de servicios de impresión, pero el suscriptor es responsable de los costos.',
  fr = "Je peux aider à trouver des services d'impression, mais l'abonné est responsable des coûts.",
  de = 'Ich kann bei der Suche nach Druckdienstleistungen helfen, aber der Abonnent ist für die Kosten verantwortlich.',
  pt = 'Posso ajudar a encontrar serviços de impressão, mas o assinante é responsável pelos custos.',
  cs = 'Mohu pomoci s hledáním tiskových služeb, ale odběratel je zodpovědný za náklady.',
  fi = 'Voin auttaa painopalveluiden löytämisessä, mutta tilaaja vastaa kustannuksista.',
}
export enum ETrainingInWebsiteManagement {
  en = 'Training in website management',
  es = 'Entrenamiento en gestión de sitios web',
  fr = 'Formation à la gestion de sites Web',
  de = 'Schulung in der Website-Verwaltung',
  pt = 'Treinamento em gerenciamento de sites',
  cs = 'Školení v správě webu',
  fi = 'Koulutus verkkosivujen hallintaan',
}

export enum ETrainingInWebsiteManagementDescription {
  en = "Training in website management for those who need to update their website themselves. The training is tailored to the customer's needs and can be done online or in person.",
  es = 'Entrenamiento en gestión de sitios web para aquellos que necesitan actualizar su sitio web ellos mismos. El entrenamiento se adapta a las necesidades del cliente y se puede hacer en línea o en persona.',
  fr = 'Formation à la gestion de sites Web pour ceux qui ont besoin de mettre à jour leur site Web eux-mêmes. La formation est adaptée aux besoins du client et peut être effectuée en ligne ou en personne.',
  de = 'Schulung in der Website-Verwaltung für diejenigen, die ihre Website selbst aktualisieren müssen. Das Training wird auf die Bedürfnisse des Kunden zugeschnitten und kann online oder persönlich durchgeführt werden.',
  pt = 'Treinamento em gerenciamento de sites para aqueles que precisam atualizar seu site eles mesmos. O treinamento é adaptado às necessidades do cliente e pode ser feito online ou pessoalmente.',
  cs = 'Školení v správě webu pro ty, kteří potřebují aktualizovat svůj web sami. Školení je přizpůsobeno potřebám zákazníka a může být provedeno online nebo osobně.',
  fi = 'Koulutus verkkosivujen hallintaan niille, joilla on tarve päivittää verkkosivunsa itse. Koulutus räätälöidään asiakkaan tarpeiden mukaan ja se voidaan suorittaa verkossa tai henkilökohtaisesti.',
}
export enum ESitesByJenniina {
  en = 'Sites by Jenniina',
  es = 'Sitios de Jenniina',
  fr = 'Sites par Jenniina',
  de = 'Websites von Jenniina',
  pt = 'Sites por Jenniina',
  cs = 'Weby od Jenniiny',
  fi = 'Jenniinan toteuttamat verkkosivut',
}
export enum EForSitesByJenniina {
  en = 'For sites by Jenniina',
  es = 'Para sitios de Jenniina',
  fr = 'Pour les sites par Jenniina',
  de = 'Für Websites von Jenniina',
  pt = 'Para sites por Jenniina',
  cs = 'Pro weby od Jenniiny',
  fi = 'Jenniinan toteuttamille verkkosivuille',
}
export enum EOneHourOfTrainingIncluded {
  en = 'One hour of training is included in all website packages.',
  es = 'Una hora de entrenamiento está incluida en todos los paquetes de sitios web.',
  fr = 'Une heure de formation est incluse dans tous les forfaits de sites Web.',
  de = 'Eine Stunde Schulung ist in allen Website-Paketen enthalten.',
  pt = 'Uma hora de treinamento está incluída em todos os pacotes de sites.',
  cs = 'Jedna hodina školení je zahrnuta ve všech balíčcích webu.',
  fi = 'Yksi tunti koulutusta sisältyy kaikkiin verkkosivupaketteihin.',
}
export enum EOrchestraWebsite {
  en = 'Orchestra website',
  es = 'Sitio web de orquesta',
  fr = "Site Web de l'orchestre",
  de = 'Orchester-Website',
  pt = 'Site da orquestra',
  cs = 'Web orchestry',
  fi = 'Orkesterin verkkosivusto',
}
export enum EConferenceWebsite {
  en = 'Conference website',
  es = 'Sitio web de conferencias',
  fr = 'Site Web de conférence',
  de = 'Konferenz-Website',
  pt = 'Site de conferência',
  cs = 'Webové stránky konference',
  fi = 'Konferenssin verkkosivusto',
}
export enum EExampleSites {
  en = 'Example sites',
  es = 'Sitios de ejemplo',
  fr = "Sites d'exemple",
  de = 'Beispielseiten',
  pt = 'Sites de exemplo',
  cs = 'Příkladové weby',
  fi = 'Esimerkkisivustoja',
}
export enum EPsychologistWebsite {
  en = 'Psychologist website',
  es = 'Sitio web del psicólogo',
  fr = 'Site Web du psychologue',
  de = 'Psychologen-Website',
  pt = 'Site do psicólogo',
  cs = 'Webové stránky psychologa',
  fi = 'Psykologin verkkosivusto',
}
export enum EPleaseSeeThePortfolioPagesForExamplesofPossibleFeatures {
  en = 'Please see the portfolio pages for examples of possible features',
  es = 'Consulte las páginas del portafolio para ver ejemplos de posibles características',
  fr = 'Veuillez consulter les pages du portfolio pour des exemples de fonctionnalités possibles',
  de = 'Bitte sehen Sie sich die Portfolio-Seiten für Beispiele möglicher Funktionen an',
  pt = 'Consulte as páginas do portfólio para exemplos de possíveis recursos',
  cs = 'Podívejte se na stránky portfolia pro příklady možných funkcí',
  fi = 'Katso portfolion sivuja esimerkkeinä mahdollisista ominaisuuksista',
}
export enum ETermsRelatedToProducts {
  en = 'Terms related to products',
  es = 'Términos relacionados con productos',
  fr = 'Termes liés aux produits',
  de = 'Begriffe im Zusammenhang mit Produkten',
  pt = 'Termos relacionados a produtos',
  cs = 'Podmínky související s produkty',
  fi = 'Tuotteisiin liittyvät ehdot',
}
export enum EAddonsAreAdaptedToTheStyle {
  en = 'Add-ons are adapted to the style of the existing website.',
  es = 'Los complementos se adaptan al estilo del sitio web existente.',
  fr = 'Les modules complémentaires sont adaptés au style du site Web existant.',
  de = 'Add-Ons sind an den Stil der vorhandenen Website angepasst.',
  pt = 'Os complementos são adaptados ao estilo do site existente.',
  cs = 'Doplňky jsou přizpůsobeny stylu stávajícího webu.',
  fi = 'Lisäosat sovitetaan olemassaolevan verkkosivuston tyyliin.',
}
