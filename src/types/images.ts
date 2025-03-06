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

export enum OrderBy {
  Popular = 'popular',
  Latest = 'latest',
}
