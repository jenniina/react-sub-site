import { ELanguages } from '.'
import { SelectOption } from '../components/Select/Select'

export type TImageTypes = 'all' | 'photo' | 'illustration' | 'vector' | 'video'

export type TVideoTypes = 'all' | 'film' | 'animation'

export enum EPhoto {
  en = 'Photo',
  es = 'Foto',
  fr = 'Photo',
  de = 'Foto',
  pt = 'Foto',
  cs = 'Foto',
  fi = 'Valokuva',
}
export enum EIllustration {
  en = 'Illustration',
  es = 'Ilustración',
  fr = 'Illustration',
  de = 'Illustration',
  pt = 'Ilustração',
  cs = 'Ilustrace',
  fi = 'Kuvitus',
}

export enum EVector {
  en = 'Vector',
  es = 'Vector',
  fr = 'Vector',
  de = 'Vektor',
  pt = 'Vetor',
  cs = 'Vektor',
  fi = 'Vektori',
}

export enum EVideo {
  en = 'Video',
  es = 'Video',
  fr = 'Vidéo',
  de = 'Video',
  pt = 'Vídeo',
  cs = 'Video',
  fi = 'Video',
}

export enum Orientation {
  All = 'all',
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum Category {
  Backgrounds = 'backgrounds',
  Fashion = 'fashion',
  Nature = 'nature',
  Science = 'science',
  Education = 'education',
  Feelings = 'feelings',
  Health = 'health',
  People = 'people',
  Religion = 'religion',
  Places = 'places',
  Animals = 'animals',
  Industry = 'industry',
  Computer = 'computer',
  Food = 'food',
  Sports = 'sports',
  Transportation = 'transportation',
  Travel = 'travel',
  Buildings = 'buildings',
  Business = 'business',
  Music = 'music',
}

export enum Color {
  Grayscale = 'grayscale',
  Transparent = 'transparent',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Turquoise = 'turquoise',
  Blue = 'blue',
  Lilac = 'lilac',
  Pink = 'pink',
  White = 'white',
  Gray = 'gray',
  Black = 'black',
  Brown = 'brown',
}
export enum EOrientation {
  en = 'Orientation',
  es = 'Orientación',
  fr = 'Orientation',
  de = 'Orientierung',
  pt = 'Orientação',
  cs = 'Orientace',
  fi = 'Suunta',
}
export enum EAll {
  en = 'All',
  es = 'Todos',
  fr = 'Tous',
  de = 'Alle',
  pt = 'Todos',
  cs = 'Všechny',
  fi = 'Kaikki',
}
export enum EHorizontal {
  en = 'Horizontal',
  es = 'Horizontal',
  fr = 'Horizontal',
  de = 'Horizontal',
  pt = 'Horizontal',
  cs = 'Horizontální',
  fi = 'Vaakasuora',
}
export enum EVertical {
  en = 'Vertical',
  es = 'Vertical',
  fr = 'Vertical',
  de = 'Vertikal',
  pt = 'Vertical',
  cs = 'Vertikální',
  fi = 'Pystysuora',
}
export enum EBackgrounds {
  en = 'Backgrounds',
  es = 'Fondos',
  fr = 'Arrière-plans',
  de = 'Hintergründe',
  pt = 'Fundo',
  cs = 'Pozadí',
  fi = 'Taustat',
}
export enum EFashion {
  en = 'Fashion',
  es = 'Moda',
  fr = 'Mode',
  de = 'Mode',
  pt = 'Moda',
  cs = 'Móda',
  fi = 'Muoti',
}
export enum ENature {
  en = 'Nature',
  es = 'Naturaleza',
  fr = 'Nature',
  de = 'Natur',
  pt = 'Natureza',
  cs = 'Příroda',
  fi = 'Luonto',
}
export enum EScience {
  en = 'Science',
  es = 'Ciencia',
  fr = 'Science',
  de = 'Wissenschaft',
  pt = 'Ciência',
  cs = 'Věda',
  fi = 'Tiede',
}
export enum EEducation {
  en = 'Education',
  es = 'Educación',
  fr = 'Éducation',
  de = 'Bildung',
  pt = 'Educação',
  cs = 'Vzdělávání',
  fi = 'Koulutus',
}
export enum EFeelings {
  en = 'Feelings',
  es = 'Sentimientos',
  fr = 'Sentiments',
  de = 'Gefühle',
  pt = 'Sentimentos',
  cs = 'Pocity',
  fi = 'Tunteet',
}
export enum EHealth {
  en = 'Health',
  es = 'Salud',
  fr = 'Santé',
  de = 'Gesundheit',
  pt = 'Saúde',
  cs = 'Zdraví',
  fi = 'Terveys',
}
export enum EPeople {
  en = 'People',
  es = 'Gente',
  fr = 'People',
  de = 'Menschen',
  pt = 'Pessoas',
  cs = 'Lidé',
  fi = 'Ihmiset',
}
export enum EReligion {
  en = 'Religion',
  es = 'Religión',
  fr = 'Religion',
  de = 'Religion',
  pt = 'Religião',
  cs = 'Náboženství',
  fi = 'Uskonto',
}
export enum EPlaces {
  en = 'Places',
  es = 'Lugares',
  fr = 'Lieux',
  de = 'Orte',
  pt = 'Lugares',
  cs = 'Místa',
  fi = 'Paikat',
}
export enum EAnimals {
  en = 'Animals',
  es = 'Animales',
  fr = 'Animaux',
  de = 'Tiere',
  pt = 'Animais',
  cs = 'Zvířata',
  fi = 'Eläimet',
}
export enum EIndustry {
  en = 'Industry',
  es = 'Industria',
  fr = 'Industrie',
  de = 'Industrie',
  pt = 'Indústria',
  cs = 'Průmysl',
  fi = 'Teollisuus',
}
export enum EComputer {
  en = 'Computer',
  es = 'Computadora',
  fr = 'Ordinateur',
  de = 'Computer',
  pt = 'Computador',
  cs = 'Počítač',
  fi = 'Tietokone',
}
export enum EFood {
  en = 'Food',
  es = 'Comida',
  fr = 'Nourriture',
  de = 'Essen',
  pt = 'Comida',
  cs = 'Jídlo',
  fi = 'Ruoka',
}
export enum ESports {
  en = 'Sports',
  es = 'Deportes',
  fr = 'Sports',
  de = 'Sport',
  pt = 'Esportes',
  cs = 'Sporty',
  fi = 'Urheilu',
}
export enum ETransportation {
  en = 'Transportation',
  es = 'Transporte',
  fr = 'Transport',
  de = 'Transport',
  pt = 'Transporte',
  cs = 'Doprava',
  fi = 'Kuljetus',
}
export enum ETravel {
  en = 'Travel',
  es = 'Viajar',
  fr = 'Voyage',
  de = 'Reise',
  pt = 'Viagem',
  cs = 'Cestování',
  fi = 'Matkustaminen',
}
export enum EBuildings {
  en = 'Buildings',
  es = 'Edificios',
  fr = 'Bâtiments',
  de = 'Gebäude',
  pt = 'Edifícios',
  cs = 'Budovy',
  fi = 'Rakennukset',
}
export enum EBusiness {
  en = 'Business',
  es = 'Negocios',
  fr = 'Affaires',
  de = 'Geschäft',
  pt = 'Negócios',
  cs = 'Byznys',
  fi = 'Liiketoiminta',
}
export enum EMusic {
  en = 'Music',
  es = 'Música',
  fr = 'Musique',
  de = 'Musik',
  pt = 'Música',
  cs = 'Hudba',
  fi = 'Musiikki',
}
export enum EGrayscale {
  en = 'Grayscale',
  es = 'Escala de Grises',
  fr = 'Niveaux de Gris',
  de = 'Graustufen',
  pt = 'Escala de Cinza',
  cs = 'Stupně šedi',
  fi = 'Harmaasävy',
}
export enum ETransparent {
  en = 'Transparent',
  es = 'Transparente',
  fr = 'Transparent',
  de = 'Transparent',
  pt = 'Transparente',
  cs = 'Průhledný',
  fi = 'Läpinäkyvä',
}
export enum ERed {
  en = 'Red',
  es = 'Rojo',
  fr = 'Rouge',
  de = 'Rot',
  pt = 'Vermelho',
  cs = 'Červená',
  fi = 'Punainen',
}
export enum EOrange {
  en = 'Orange',
  es = 'Naranja',
  fr = 'Orange',
  de = 'Orange',
  pt = 'Laranja',
  cs = 'Oranžová',
  fi = 'Oranssi',
}
export enum EYellow {
  en = 'Yellow',
  es = 'Amarillo',
  fr = 'Jaune',
  de = 'Gelb',
  pt = 'Amarelo',
  cs = 'Žlutá',
  fi = 'Keltainen',
}
export enum EGreen {
  en = 'Green',
  es = 'Verde',
  fr = 'Vert',
  de = 'Grün',
  pt = 'Verde',
  cs = 'Zelená',
  fi = 'Vihreä',
}
export enum ETurquoise {
  en = 'Turquoise',
  es = 'Turquesa',
  fr = 'Turquoise',
  de = 'Türkis',
  pt = 'Turquesa',
  cs = 'Tyrkysová',
  fi = 'Turkoosi',
}
export enum EBlue {
  en = 'Blue',
  es = 'Azul',
  fr = 'Bleu',
  de = 'Blau',
  pt = 'Azul',
  cs = 'Modrá',
  fi = 'Sininen',
}
export enum ELilac {
  en = 'Lilac',
  es = 'Lila',
  fr = 'Lilas',
  de = 'Flieder',
  pt = 'Lilás',
  cs = 'Fialová',
  fi = 'Lila',
}
export enum EPink {
  en = 'Pink',
  es = 'Rosa',
  fr = 'Rose',
  de = 'Rosa',
  pt = 'Rosa',
  cs = 'Růžová',
  fi = 'Pinkki',
}
export enum EWhite {
  en = 'White',
  es = 'Blanco',
  fr = 'Blanc',
  de = 'Weiß',
  pt = 'Branco',
  cs = 'Bílá',
  fi = 'Valkoinen',
}
export enum EGray {
  en = 'Gray',
  es = 'Gris',
  fr = 'Gris',
  de = 'Grau',
  pt = 'Cinza',
  cs = 'Šedá',
  fi = 'Harmaa',
}
export enum EBlack {
  en = 'Black',
  es = 'Negro',
  fr = 'Noir',
  de = 'Schwarz',
  pt = 'Preto',
  cs = 'Černá',
  fi = 'Musta',
}
export enum EBrown {
  en = 'Brown',
  es = 'Marrón',
  fr = 'Marron',
  de = 'Braun',
  pt = 'Marrom',
  cs = 'Hnědá',
  fi = 'Ruskea',
}
export enum EPopular {
  en = 'Popular',
  es = 'Popular',
  fr = 'Populaire',
  de = 'Beliebt',
  pt = 'Popular',
  cs = 'Oblíbené',
  fi = 'Suosittu',
}
export enum ELatest {
  en = 'Latest',
  es = 'Último',
  fr = 'Dernier',
  de = 'Neueste',
  pt = 'Mais recente',
  cs = 'Nejnovější',
  fi = 'Uusin',
}
export enum EFilm {
  en = 'Film',
  es = 'Película',
  fr = 'Film',
  de = 'Film',
  pt = 'Filme',
  cs = 'Film',
  fi = 'Elokuva',
}
export enum EAnimation {
  en = 'Animation',
  es = 'Animación',
  fr = 'Animation',
  de = 'Animation',
  pt = 'Animação',
  cs = 'Animace',
  fi = 'Animaatio',
}

export const translationMap: Record<string, Record<ELanguages, string>> = {
  all: EAll,
  horizontal: EHorizontal,
  vertical: EVertical,
  backgrounds: EBackgrounds,
  fashion: EFashion,
  nature: ENature,
  science: EScience,
  education: EEducation,
  feelings: EFeelings,
  health: EHealth,
  people: EPeople,
  religion: EReligion,
  places: EPlaces,
  animals: EAnimals,
  industry: EIndustry,
  computer: EComputer,
  food: EFood,
  sports: ESports,
  transportation: ETransportation,
  travel: ETravel,
  buildings: EBuildings,
  business: EBusiness,
  music: EMusic,
  grayscale: EGrayscale,
  transparent: ETransparent,
  red: ERed,
  orange: EOrange,
  yellow: EYellow,
  green: EGreen,
  turquoise: ETurquoise,
  blue: EBlue,
  lilac: ELilac,
  pink: EPink,
  white: EWhite,
  gray: EGray,
  black: EBlack,
  brown: EBrown,
  popular: EPopular,
  latest: ELatest,
  photo: EPhoto,
  illustration: EIllustration,
  vector: EVector,
  video: EVideo,
  orientation: EOrientation,
  film: EFilm,
  animation: EAnimation,
}

export const generateOptions = (
  enumValues: string[],
  language: ELanguages
): SelectOption[] => {
  return enumValues.map((value) => ({
    label: translationMap[value]?.[language] || value,
    value: value,
  }))
}

export enum EImagesKuvia {
  en = 'Images',
  es = 'Imágenes',
  fr = 'Images',
  de = 'Bilder',
  pt = 'Imagens',
  cs = 'Obrázky',
  fi = 'Kuvia',
}
export enum EImagesKuvat {
  en = 'Images',
  es = 'Imágenes',
  fr = 'Images',
  de = 'Bilder',
  pt = 'Imagens',
  cs = 'Obrázky',
  fi = 'Kuvat',
}
export enum ESearchForMedia {
  en = 'Search for media',
  es = 'Buscar medios',
  fr = 'Rechercher des médias',
  de = 'Medien suchen',
  pt = 'Pesquisar mídia',
  cs = 'Hledat média',
  fi = 'Etsi mediaa',
}
export enum ESearchforVideos {
  en = 'Search for videos',
  es = 'Buscar videos',
  fr = 'Rechercher des vidéos',
  de = 'Nach Videos suchen',
  pt = 'Pesquisar vídeos',
  cs = 'Hledat videa',
  fi = 'Etsi videoita',
}

export enum EType {
  en = 'Type',
  es = 'Tipo',
  fr = 'Type',
  de = 'Typ',
  pt = 'Tipo',
  cs = 'Typ',
  fi = 'Tyyppi',
}
export enum EPleaseEnterASearchTerm {
  en = 'Please enter a search term',
  es = 'Por favor, introduce un término de búsqueda',
  fr = 'Veuillez entrer un terme de recherche',
  de = 'Bitte geben Sie einen Suchbegriff ein',
  pt = 'Por favor, insira um termo de pesquisa',
  cs = 'Zadejte prosím hledaný výraz',
  fi = 'Anna hakutermi',
}

export enum EEditorsChoice {
  en = "Editor's Choice",
  es = 'Elección del editor',
  fr = "Choix de l'éditeur",
  de = 'Redaktionsempfehlung',
  pt = 'Escolha do editor',
  cs = 'Výběr editora',
  fi = 'Toimituksen valinta',
}
export enum OrderBy {
  Popular = 'popular',
  Latest = 'latest',
}
export enum EImagePage {
  en = 'Image page',
  es = 'Página de imagen',
  fr = "Page d'image",
  de = 'Bildseite',
  pt = 'Página de imagem',
  cs = 'Stránka obrázku',
  fi = 'Kuvan sivu',
}
export enum EMediaPerPage {
  en = 'Media per page',
  es = 'Medios por página',
  fr = 'Médias par page',
  de = 'Medien pro Seite',
  pt = 'Mídia por página',
  cs = 'Média na stránku',
  fi = 'Mediaa per sivu',
}
export enum EClickToOpenLargeImage {
  en = 'Click to open large image',
  es = 'Haz clic para abrir la imagen grande',
  fr = 'Cliquez pour ouvrir une grande image',
  de = 'Klicken Sie, um das große Bild zu öffnen',
  pt = 'Clique para abrir a imagem grande',
  cs = 'Kliknutím otevřete velký obrázek',
  fi = 'Napsauta avataksesi suuren kuvan',
}
export enum EClickToLoadImage {
  en = 'Click to load image',
  es = 'Haz clic para cargar la imagen',
  fr = 'Cliquez pour charger l image',
  de = 'Klicken Sie, um das Bild zu laden',
  pt = 'Clique para carregar a imagem',
  cs = 'Kliknutím načtěte obrázek',
  fi = 'Napsauta ladataksesi kuvan',
}
export enum EClickToLoadVideo {
  en = 'Click to load video',
  es = 'Haz clic para cargar el video',
  fr = 'Cliquez pour charger la vidéo',
  de = 'Klicken Sie, um das Video zu laden',
  pt = 'Clique para carregar o vídeo',
  cs = 'Kliknutím načtěte video',
  fi = 'Napsauta ladataksesi videon',
}
export enum EClickToOpenLargeVideo {
  en = 'Click to open large video',
  es = 'Haz clic para abrir el video grande',
  fr = 'Cliquez pour ouvrir une grande vidéo',
  de = 'Klicken Sie, um das große Video zu öffnen',
  pt = 'Clique para abrir o vídeo grande',
  cs = 'Kliknutím otevřete velké video',
  fi = 'Napsauta avataksesi videon suurena',
}
export enum EVideoPage {
  en = 'Video page',
  es = 'Página de video',
  fr = 'Page vidéo',
  de = 'Videoseite',
  pt = 'Página de vídeo',
  cs = 'Stránka videa',
  fi = 'Videon sivu',
}
export enum EVectorImagesCanBeDownloaded {
  en = 'Vector images in vector form can be downloaded from the image page',
  es = 'Las imágenes vectoriales en forma de vector se pueden descargar desde la página de la imagen',
  fr = 'Les images vectorielles sous forme vectorielle peuvent être téléchargées depuis la page de l image',
  de = 'Vektorbilder in Vektorform können von der Bildseite heruntergeladen werden',
  pt = 'Imagens vetoriais em forma de vetor podem ser baixadas da página da imagem',
  cs = 'Vektorové obrázky ve vektorové formě lze stáhnout ze stránky s obrázkem',
  fi = 'Vektorikuvat voidaan ladata kuvan sivulta vektorimuodossa',
}
export enum EImagesAndQuotes {
  en = 'Images and Quotes',
  es = 'Imágenes y citas',
  fr = 'Images et citations',
  de = 'Bilder und Zitate',
  pt = 'Imagens e citações',
  cs = 'Obrázky a citáty',
  fi = 'Kuvia ja lainauksia',
}

export enum EBatchesOf {
  en = 'Batches of',
  es = 'Lotes de',
  fr = 'Lots de',
  de = 'Stapel von',
  pt = 'Lotes de',
  cs = 'Série',
  fi = '',
}
export enum EOfMedia {
  en = 'media',
  es = 'medios',
  fr = 'médias',
  de = 'Medien',
  pt = 'mídia',
  cs = 'média',
  fi = 'median erät',
}

export enum EVideoTypes {
  en = 'Video types',
  es = 'Tipos de video',
  fr = 'Types de vidéo',
  de = 'Videotypen',
  pt = 'Tipos de vídeo',
  cs = 'Typy videa',
  fi = 'Videotyypit',
}

export enum EMedia {
  en = 'Media',
  es = 'Medios',
  fr = 'Médias',
  de = 'Medien',
  pt = 'Mídia',
  cs = 'Média',
  fi = 'Media',
}

export enum EMediaWithQuotesOrPoems {
  en = 'Media with quotes or poems',
  es = 'Medios con citas o poemas',
  fr = 'Médias avec citations ou poèmes',
  de = 'Medien mit Zitaten oder Gedichten',
  pt = 'Mídia com citações ou poemas',
  cs = 'Média s citáty nebo básněmi',
  fi = 'Mediaa lainauksilla tai runoilla',
}
export enum ETextType {
  en = 'Text type',
  es = 'Tipo de texto',
  fr = 'Type de texte',
  de = 'Texttyp',
  pt = 'Tipo de texto',
  cs = 'Typ textu',
  fi = 'Tekstin tyyppi',
}

export enum EYouMaySearchForImagesFetchedFromThePixabayAPI {
  en = 'You may search for images fetched from the Pixabay API.',
  es = 'Puede buscar imágenes obtenidas de la API de Pixabay.',
  fr = 'Vous pouvez rechercher des images extraites de l API Pixabay.',
  de = 'Sie können nach Bildern suchen, die von der Pixabay-API abgerufen wurden.',
  pt = 'Você pode pesquisar imagens obtidas da API do Pixabay.',
  cs = 'Můžete hledat obrázky získané z API Pixabay.',
  fi = 'Voit etsiä Pixabayn API:sta haettuja kuvia.',
}
export enum EClickingAnImageOpensAModalWithALargerVersion {
  en = 'Clicking an image opens a modal with a larger version. Clicking a video preview image opens a modal with the video.',
  es = 'Hacer clic en una imagen abre un modal con una versión más grande. Hacer clic en una imagen de vista previa de video abre un modal con el video.',
  fr = 'Cliquer sur une image ouvre un modal avec une version plus grande. Cliquer sur une image de prévisualisation de vidéo ouvre un modal avec la vidéo.',
  de = 'Durch Klicken auf ein Bild wird ein Modal mit einer größeren Version geöffnet. Durch Klicken auf ein Vorschaubild eines Videos wird ein Modal mit dem Video geöffnet.',
  pt = 'Clicar em uma imagem abre um modal com uma versão maior. Clicar em uma imagem de visualização de vídeo abre um modal com o vídeo.',
  cs = 'Kliknutím na obrázek se otevře modální okno s větší verzí. Kliknutím na obrázek náhledu videa se otevře modální okno s videem.',
  fi = 'Kuvaa napsauttamalla avautuu modaalinen ikkuna suuremmalla versiolla. Videon esikatselukuvaa napsauttamalla avautuu modaalinen ikkuna videolla.',
}

export enum ETheImageOrVideoHasARandomQuoteOrPoemAddedToIt {
  en = 'The image or video has a random quote or poem added to it.',
  es = 'La imagen o video tiene una cita o poema aleatorio añadido a ella.',
  fr = 'L image ou la vidéo a une citation ou un poème aléatoire ajouté à elle.',
  de = 'Das Bild oder Video hat ein zufälliges Zitat oder Gedicht hinzugefügt.',
  pt = 'A imagem ou vídeo tem uma citação ou poema aleatório adicionado a ela.',
  cs = 'Obrázek nebo video má přidánu náhodnou citaci nebo báseň.',
  fi = 'Kuvaan tai videoon on lisätty satunnainen lainaus tai runo.',
}

export enum ETheWordCloudIsFormedFromTheDifferentCategoriesAvailableInTheQuotesAPI {
  en = 'The word cloud is formed from the different categories available in the quotes API.',
  es = 'La nube de palabras está formada por las diferentes categorías disponibles en la API de citas.',
  fr = 'Le nuage de mots est formé à partir des différentes catégories disponibles dans l API de citations.',
  de = 'Die Wortwolke wird aus den verschiedenen in der Zitate-API verfügbaren Kategorien gebildet.',
  pt = 'A nuvem de palavras é formada a partir das diferentes categorias disponíveis na API de citações.',
  cs = 'Oblak slov je tvořen různými kategoriemi dostupnými v API citátů.',
  fi = 'Sanapilvi muodostuu eri kategorioista, jotka ovat saatavilla lainaus-API:ssa.',
}

export enum EIAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems {
  en = 'I added value to the search of images and videos with random quotes or poems. Sometimes they will be suitable for the image, other times they might be hilariously out of place.',
  es = 'Añadí valor a la búsqueda de imágenes y videos con citas o poemas aleatorios. A veces serán adecuados para la imagen, otras veces pueden ser hilarantemente inapropiados.',
  fr = 'J ai ajouté de la valeur à la recherche d images et de vidéos avec des citations ou des poèmes aléatoires. Parfois, ils seront adaptés à l image, d autres fois, ils pourraient être hilarants.',
  de = 'Ich habe Wert auf die Suche nach Bildern und Videos mit zufälligen Zitaten oder Gedichten gelegt. Manchmal passen sie zum Bild, manchmal sind sie aber auch urkomisch unpassend.',
  pt = 'Adicionei valor à pesquisa de imagens e vídeos com citações ou poemas aleatórios. Às vezes, eles serão adequados para a imagem, outras vezes podem ser hilariantemente inadequados.',
  cs = 'Přidal jsem hodnotu do hledání obrázků a videí s náhodnými citáty nebo básněmi. Někdy budou vhodné k obrázku, jindy mohou být vtipně nevhodné.',
  fi = 'Lisäsin arvoa kuvien ja videoiden etsimiseen satunnaisilla lainauksilla tai runoilla. Joskus ne sopivat kuvaan, toisinaan ne voivat olla hulvattoman epäsopivia.',
}

export enum EOnceYouClickOpenAnImageOrVideo {
  en = 'Once you click an image or video, you get a random quote or poem in English. Other languages are not available due to the limitations of the API.',
  es = 'Una vez que haga clic en una imagen o video, obtendrá una cita o poema aleatorio en inglés. Otros idiomas no están disponibles debido a las limitaciones de la API.',
  fr = 'Une fois que vous cliquez sur une image ou une vidéo, vous obtenez une citation ou un poème au hasard en anglais. D autres langues ne sont pas disponibles en raison des limites de l API.',
  de = 'Wenn Sie auf ein Bild oder Video klicken, erhalten Sie ein zufälliges Zitat oder Gedicht auf Englisch. Andere Sprachen sind aufgrund der Einschränkungen der API nicht verfügbar.',
  pt = 'Depois de clicar em uma imagem ou vídeo, você obtém uma citação ou poema aleatório em inglês. Outros idiomas não estão disponíveis devido às limitações da API.',
  fi = 'Kun napsautat kuvan tai videon isommaksi, saat satunnaisen lainauksen tai runon englanniksi. Muita kieliä ei ole saatavilla API:n rajoitusten vuoksi.',
}

// Quotes are from https://www.api-ninjas.com/api/quotes and poems are from https://poetrydb.org/

export enum EQuotesAreFrom {
  en = 'Quotes are from',
  es = 'Las citas son de',
  fr = 'Les citations sont de',
  de = 'Zitate sind von',
  pt = 'As citações são de',
  cs = 'Citáty jsou z',
  fi = 'Lainaukset ovat peräisin',
}
export enum EAndPoemsAreFrom {
  en = 'and poems are from',
  es = 'y los poemas son de',
  fr = 'et les poèmes sont de',
  de = 'und Gedichte sind von',
  pt = 'e os poemas são de',
  cs = 'a básně jsou z',
  fi = 'API:sta ja runot',
}
