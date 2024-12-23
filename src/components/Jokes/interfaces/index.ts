import { ELanguages, ELanguageTitle } from '../../../interfaces'
import { IUser } from '../../../interfaces'

export enum EFilterFurther {
  en = 'Filter further',
  es = 'Filtrar más',
  fr = 'Filtrer davantage',
  de = 'Weiter filtern',
  pt = 'Filtrar mais',
  cs = 'Filtrovat dále',
  fi = 'Suodata lisää',
}
export enum EFlags_en {
  nsfw = 'NSFW',
  religious = 'religious',
  political = 'political',
  racist = 'racist',
  sexist = 'sexist',
  explicit = 'explicit',
}

export enum EFlags_es {
  nsfw = 'NSFW',
  religious = 'religioso',
  political = 'político',
  racist = 'racista',
  sexist = 'sexista',
  explicit = 'explícito',
}

export enum EFlags_fr {
  nsfw = 'NSFW',
  religious = 'religieux',
  political = 'politique',
  racist = 'raciste',
  sexist = 'sexiste',
  explicit = 'explicite',
}

export enum EFlags_de {
  nsfw = 'NSFW',
  religious = 'religiös',
  political = 'politisch',
  racist = 'rassistisch',
  sexist = 'sexistisch',
  explicit = 'explizit',
}

export enum EFlags_pt {
  nsfw = 'NSFW',
  religious = 'religioso',
  political = 'político',
  racist = 'racista',
  sexist = 'sexista',
  explicit = 'explícito',
}

export enum EFlags_cs {
  nsfw = 'NSFW',
  religious = 'náboženský',
  political = 'politický',
  racist = 'rasistický',
  sexist = 'sexistický',
  explicit = 'explicitní',
}
export enum EFlags_fi {
  nsfw = 'NSFW',
  religious = 'uskonnollinen',
  political = 'poliittinen',
  racist = 'rasistinen',
  sexist = 'seksistinen',
  explicit = 'sopimaton',
}
export type TFlagsLanguages = {
  en: EFlags_en
  es: EFlags_es
  fr: EFlags_fr
  de: EFlags_de
  pt: EFlags_pt
  cs: EFlags_cs
  fi: EFlags_fi
}

export interface IFlagsLanguages {
  en: typeof EFlags_en
  es: typeof EFlags_es
  fr: typeof EFlags_fr
  de: typeof EFlags_de
  pt: typeof EFlags_pt
  cs: typeof EFlags_cs
  fi: typeof EFlags_fi
}

export type EFlags = TFlagsLanguages[keyof TFlagsLanguages]

export const FlagsLanguage: IFlagsLanguages = {
  en: {
    nsfw: EFlags_en.nsfw,
    religious: EFlags_en.religious,
    political: EFlags_en.political,
    racist: EFlags_en.racist,
    sexist: EFlags_en.sexist,
    explicit: EFlags_en.explicit,
  },
  es: {
    nsfw: EFlags_es.nsfw,
    religious: EFlags_es.religious,
    political: EFlags_es.political,
    racist: EFlags_es.racist,
    sexist: EFlags_es.sexist,
    explicit: EFlags_es.explicit,
  },
  fr: {
    nsfw: EFlags_fr.nsfw,
    religious: EFlags_fr.religious,
    political: EFlags_fr.political,
    racist: EFlags_fr.racist,
    sexist: EFlags_fr.sexist,
    explicit: EFlags_fr.explicit,
  },
  de: {
    nsfw: EFlags_de.nsfw,
    religious: EFlags_de.religious,
    political: EFlags_de.political,
    racist: EFlags_de.racist,
    sexist: EFlags_de.sexist,
    explicit: EFlags_de.explicit,
  },
  pt: {
    nsfw: EFlags_pt.nsfw,
    religious: EFlags_pt.religious,
    political: EFlags_pt.political,
    racist: EFlags_pt.racist,
    sexist: EFlags_pt.sexist,
    explicit: EFlags_pt.explicit,
  },
  cs: {
    nsfw: EFlags_cs.nsfw,
    religious: EFlags_cs.religious,
    political: EFlags_cs.political,
    racist: EFlags_cs.racist,
    sexist: EFlags_cs.sexist,
    explicit: EFlags_cs.explicit,
  },
  fi: {
    nsfw: EFlags_fi.nsfw,
    religious: EFlags_fi.religious,
    political: EFlags_fi.political,
    racist: EFlags_fi.racist,
    sexist: EFlags_fi.sexist,
    explicit: EFlags_fi.explicit,
  },
}

export enum EAddWarningTitle {
  en = 'Add Warning',
  es = 'Agregar advertencia',
  fr = 'Ajouter un avertissement',
  de = 'Warnung hinzufügen',
  pt = 'Adicionar aviso',
  cs = 'Přidat varování',
  fi = 'Lisää varoitus',
}

export enum EInEnglish {
  en = 'in English',
  es = 'en inglés',
  fr = 'en anglais',
  de = 'auf Englisch',
  pt = 'em inglês',
  cs = 'anglicky',
  fi = 'englanniksi',
}

export enum ECategory_en {
  // Any = 'Any',
  Misc = 'Misc',
  Programming = 'Programming',
  Dark = 'Dark',
  Pun = 'Pun',
  Spooky = 'Spooky',
  Christmas = 'Christmas',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Dad Joke',
}
export enum ECategory_es {
  // Any = 'Cualquiera',
  Misc = 'Varios',
  Programming = 'Programación',
  Dark = 'Oscuro',
  Pun = 'Juego de palabras',
  Spooky = 'Espeluznante',
  Christmas = 'Navidad',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Chiste de papá',
}
export enum ECategory_fr {
  // Any = "N'importe quel",
  Misc = 'Divers',
  Programming = 'Programmation',
  Dark = 'Sombre',
  Pun = 'Jeu de mots',
  Spooky = 'Effrayant',
  Christmas = 'Noël',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Blague de papa',
}
export enum ECategory_de {
  // Any = 'Jede',
  Misc = 'Verschiedenes',
  Programming = 'Programmierung',
  Dark = 'Dunkel',
  Pun = 'Wortspiel',
  Spooky = 'Unheimlich',
  Christmas = 'Weihnachten',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Papa-Witz',
}
export enum ECategory_pt {
  // Any = 'Qualquer',
  Misc = 'Diversos',
  Programming = 'Programação',
  Dark = 'Escuro',
  Pun = 'Jogo de palavras',
  Spooky = 'Assustador',
  Christmas = 'Natal',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Piada de pai',
}
export enum ECategory_cs {
  // Any = 'Jakýkoliv',
  Misc = 'Různé',
  Programming = 'Programování',
  Dark = 'Temný',
  Pun = 'Hra slov',
  Spooky = 'Strašidelný',
  Christmas = 'Vánoce',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Otcovský vtip',
}
//translated to Finnish´:
export enum ECategory_fi {
  // Any = 'Mikä tahansa',
  Misc = 'Sekalaista',
  Programming = 'Ohjelmointi',
  Dark = 'Synkkä',
  Pun = 'Sanaleikki',
  Spooky = 'Halloween',
  Christmas = 'Joulu',
  ChuckNorris = 'Chuck Norris',
  DadJoke = 'Iskävitsi',
}
export const CategoryByLanguagesConst = {
  en: ECategory_en,
  es: ECategory_es,
  fr: ECategory_fr,
  de: ECategory_de,
  pt: ECategory_pt,
  cs: ECategory_cs,
  fi: ECategory_fi,
}
export type CategoryByLanguages = {
  en: ECategory_en
  es: ECategory_es
  fr: ECategory_fr
  de: ECategory_de
  pt: ECategory_pt
  cs: ECategory_cs
  fi: ECategory_fi
}

//export type ECategory = CategoryByLanguages[keyof CategoryByLanguages]
export enum ECategories {
  Misc = 'Misc',
  Programming = 'Programming',
  Dark = 'Dark',
  Pun = 'Pun',
  Spooky = 'Spooky',
  Christmas = 'Christmas',
  ChuckNorris = 'ChuckNorris',
  DadJoke = 'DadJoke',
}

export interface IJokeCategoryByLanguage {
  en: typeof ECategory_en
  es: typeof ECategory_es
  fr: typeof ECategory_fr
  de: typeof ECategory_de
  pt: typeof ECategory_pt
  cs: typeof ECategory_cs
  fi: typeof ECategory_fi
}

export type TCategoryByLanguages =
  | typeof ECategory_en
  | typeof ECategory_cs
  | typeof ECategory_de
  | typeof ECategory_es
  | typeof ECategory_fr
  | typeof ECategory_pt
  | typeof ECategory_fi

export enum ETheComediansCompanion {
  en = "The Comedian's Companion",
  es = 'El Compañero del Comediante',
  fr = 'Le Compagnon du Comédien',
  de = 'Der Begleiter des Komikers',
  pt = 'O Companheiro do Comediante',
  cs = 'Společník komika',
  fi = 'Koomikon Kumppani',
}
export enum EFindAJoke {
  en = 'Find a joke',
  es = 'Encuentra una broma',
  fr = 'Trouver une blague',
  de = 'Finde einen Witz',
  pt = 'Encontre uma piada',
  cs = 'Najít vtip',
  fi = 'Etsi vitsi',
}
export enum EAJokeGeneratorForTheComicallyInclined {
  en = 'A Joke Generator for the Comically Inclined',
  es = 'Un generador de chistes para los cómicamente inclinados',
  fr = 'Un générateur de blagues pour les comiquement enclins',
  de = 'Ein Witzgenerator für die komisch geneigten',
  pt = 'Um gerador de piadas para os comicamente inclinados',
  cs = 'Generátor vtipů pro komicky nakloněné',
  fi = 'Vitsihaku vitsiniekoille',
}
export enum ESaveJoke {
  en = 'Save Joke',
  es = 'Guardar chiste',
  fr = 'Enregistrer la blague',
  de = 'Witz speichern',
  pt = 'Salvar piada',
  cs = 'Uložit vtip',
  fi = 'Tallenna vitsi',
}

export enum ESavedJoke {
  en = 'Saved joke',
  es = 'Chiste guardado',
  fr = 'Blague enregistrée',
  de = 'Gespeicherter Witz',
  pt = 'Piada salva',
  cs = 'Uložený vtip',
  fi = 'Vitsi tallennettu',
}
//Your Saved Jokes
export enum EYourSavedJokes {
  en = 'Your Saved Jokes',
  es = 'Tus chistes guardados',
  fr = 'Vos blagues enregistrées',
  de = 'Ihre gespeicherten Witze',
  pt = 'Suas piadas salvas',
  cs = 'Vaše uložené vtipy',
  fi = 'Tallentamasi vitsit',
}

export enum EJokeAlreadySaved {
  en = 'Joke already saved',
  es = 'Chiste ya guardado',
  fr = 'Blague déjà enregistrée',
  de = 'Witz bereits gespeichert',
  pt = 'Piada já salva',
  cs = 'Vtip již uložen',
  fi = 'Vitsi on jo tallennettu',
}
export enum ECategoryTitle {
  en = 'Category',
  es = 'Categoría',
  fr = 'Catégorie',
  de = 'Kategorie',
  pt = 'Categoria',
  cs = 'Kategorie',
  fi = 'Kategoria',
}

export enum EChuckNorrisCategory {
  en = 'Chuck Norris Category',
  es = 'Categoría Chuck Norris',
  fr = 'Catégorie Chuck Norris',
  de = 'Chuck Norris Kategorie',
  pt = 'Categoria Chuck Norris',
  cs = 'Kategorie Chuck Norris',
  fi = 'Chuck Norris -kategoria',
}

export enum ESelectACategory {
  en = 'Select a category',
  es = 'Seleccione una categoría',
  fr = 'Sélectionnez une catégorie',
  de = 'Wählen Sie eine Kategorie',
  pt = 'Selecione uma categoria',
  cs = 'Vyberte kategorii',
  fi = 'Valitse kategoria',
}
export enum ESelectExtraCategories {
  en = 'Extra Categories',
  es = 'Categorías Extra',
  fr = 'Catégories supplémentaires',
  de = 'Zusätzliche Kategorien',
  pt = 'Categorias extras',
  cs = 'Další kategorie',
  fi = 'Lisäkategoriat',
}
export enum ESelectALanguage {
  en = 'Select a language',
  es = 'Seleccione un idioma',
  fr = 'Sélectionnez une langue',
  de = 'Wählen Sie eine Sprache',
  pt = 'Selecione um idioma',
  cs = 'Vyberte jazyk',
  fi = 'Valitse kieli',
}
export enum ESafeTitle {
  en = 'Safe',
  es = 'Seguro',
  fr = 'Sûr',
  de = 'Sicher',
  pt = 'Seguro',
  cs = 'Bezpečné',
  fi = 'Turvallinen',
}
export enum EUnsafeTitle {
  en = 'Unsafe',
  es = 'Inseguro',
  fr = 'Pas sûr',
  de = 'Unsicher',
  pt = 'Inseguro',
  cs = 'Nebezpečné',
  fi = 'Turvaton',
}
export enum EJoke {
  en = 'Joke',
  es = 'Chiste',
  fr = 'Blague',
  de = 'Witz',
  pt = 'Piada',
  cs = 'Vtip',
  fi = 'Vitsi',
}
export enum EJokes {
  en = 'Jokes',
  es = 'Chistes',
  fr = 'Blagues',
  de = 'Witze',
  pt = 'Piadas',
  cs = 'Vtipy',
  fi = 'Vitsit',
}
export enum EDelete {
  en = 'Delete',
  es = 'Borrar',
  fr = 'Supprimer',
  de = 'Löschen',
  pt = 'Excluir',
  cs = 'Odstranit',
  fi = 'Poista',
}

export enum EClickToReveal {
  en = 'Click to reveal',
  es = 'Clic para revelar',
  fr = 'Cliquez pour révéler',
  de = 'Klicken Sie zum Enthüllen',
  pt = 'Clique para revelar',
  cs = 'Kliknutím zobrazíte',
  fi = 'Napsauta paljastaaksesi',
}

export enum EClickHereToSeeFeatures {
  en = 'Click here to see the features',
  cs = 'Klikněte zde pro zobrazení funkcí',
  de = 'Klicken Sie hier, um die Funktionen anzuzeigen',
  es = 'Haga clic aquí para ver las funciones',
  fr = 'Cliquez ici pour voir les fonctionnalités',
  pt = 'Clique aqui para ver os recursos',
  fi = 'Napsauta tätä nähdäksesi eri ominaisuudet',
}

export enum ESortByTitle {
  en = 'Sort by',
  es = 'Ordenar por',
  fr = 'Trier par',
  de = 'Sortieren nach',
  pt = 'Ordenar por',
  cs = 'Seřadit podle',
  fi = 'Lajittele',
}
export enum EOrderBy {
  en = 'Order by',
  es = 'Ordenar por',
  fr = 'Trier par',
  de = 'Sortieren nach',
  pt = 'Ordenar por',
  cs = 'Seřadit podle',
  fi = 'Järjestä',
}

export enum ESubmitAJoke {
  en = 'Submit a Joke',
  es = 'Enviar una broma',
  fr = 'Soumettre une blague',
  de = 'Einen Witz einreichen',
  pt = 'Enviar uma piada',
  cs = 'Odeslat vtip',
  fi = 'Kirjoita oma vitsi',
}

export enum ESubmitAJokeTo {
  en = 'Submit a Joke to ',
  es = 'Enviar una broma a ',
  fr = 'Soumettre une blague à ',
  de = 'Einen Witz senden an ',
  pt = 'Enviar uma piada para ',
  cs = 'Odeslat vtip do ',
  fi = 'Lähetä vitsi kohteeseen ',
}

export enum EJokeSetup {
  en = 'Setup',
  es = 'Configurar',
  fr = 'Configuration',
  de = 'Einrichtung',
  pt = 'Configuração',
  cs = 'Nastavení',
  fi = 'Pohjustus',
}
export enum EJokeDelivery {
  en = 'Punchline',
  es = 'Remate',
  fr = 'Pointe',
  de = 'Pointe',
  pt = 'Punchline',
  cs = 'Pointe',
  fi = 'Huipennus',
}

export enum ESingle {
  en = 'Single',
  es = 'Soltero',
  fr = 'Célibataire',
  de = 'Single',
  pt = 'Solteiro',
  cs = 'Single',
  fi = 'Yksiosainen',
}
export enum ETwoPart {
  en = 'Two-Part',
  es = 'Dos partes',
  fr = 'Deux parties',
  de = 'Zweiteilig',
  pt = 'Duas partes',
  cs = 'Dvoudílný',
  fi = 'Kaksiosainen',
}
export enum EJokeType {
  single = 'single',
  twopart = 'twopart',
}
export enum ESafemode {
  Safe = '&safe-mode',
  Unsafe = '',
}
export enum ESafemodeTitle {
  en = 'Safe Mode',
  es = 'Modo seguro',
  fr = 'Mode sécurisé',
  de = 'Sicherer Modus',
  pt = 'Modo seguro',
  cs = 'Bezpečný režim',
  fi = 'Turvallinen',
}
export enum ESearchByKeyword {
  en = 'Search by keyword',
  es = 'Buscar por palabra clave',
  fr = 'Recherche par mot-clé',
  de = 'Suche nach Schlüsselwort',
  pt = 'Pesquisar por palavra-chave',
  cs = 'Hledat podle klíčového slova',
  fi = 'Hae avainsanalla',
}

export enum EKeyword {
  en = 'Keyword',
  es = 'Palabra clave',
  fr = 'Mot-clé',
  de = 'Stichwort',
  pt = 'Palavra-chave',
  cs = 'Klíčové slovo',
  fi = 'Avainsana',
}

export enum EContains {
  Contains = '?contains=',
  DoesNotContain = '',
}
export enum EQueryKey {
  Contains = 'contains=',
  None = '',
}
// export enum ESelectACategory {
//   en = 'Please select a category',
//   es = 'Por favor seleccione una categoría',
//   fr = 'Veuillez sélectionner une catégorie',
//   de = 'Bitte wählen Sie eine Kategorie',
//   pt = 'Por favor, selecione uma categoria',
//   cs = 'Vyberte prosím kategorii',
// }
export enum ELoginOrRegisterToSave {
  en = 'Please login or register to save the joke',
  es = 'Por favor inicie sesión o regístrese para guardar la broma',
  fr = 'Veuillez vous connecter ou vous inscrire pour enregistrer la blague',
  de = 'Bitte melden Sie sich an oder registrieren Sie sich, um den Witz zu speichern',
  pt = 'Por favor, faça login ou registre-se para salvar a piada',
  cs = 'Přihlaste se nebo se zaregistrujte, abyste uložili vtip',
  fi = 'Kirjaudu sisään tai rekisteröidy tallentaaksesi vitsin',
}

export enum EAny {
  en = 'Any',
  es = 'Cualquiera',
  fr = "N'importe quel",
  de = 'Jede',
  pt = 'Qualquer',
  cs = 'Jakýkoliv',
  fi = 'Mikä tahansa',
}

export enum ENoJokeFound {
  en = 'No joke found',
  es = 'No se encontró broma',
  fr = 'Pas de blague trouvée',
  de = 'Kein Witz gefunden',
  pt = 'Nenhuma piada encontrada',
  cs = 'Nenalezen žádný vtip',
  fi = 'Vitsiä ei löytynyt',
}
export enum ENoJokeFoundWithThisSearchTerm {
  en = 'No joke found with this search term',
  es = 'No se encontró broma con este término de búsqueda',
  fr = 'Pas de blague trouvée avec ce terme de recherche',
  de = 'Kein Witz mit diesem Suchbegriff gefunden',
  pt = 'Nenhuma piada encontrada com este termo de pesquisa',
  cs = 'Nenalezen žádný vtip s tímto vyhledávacím výrazem',
  fi = 'Vitsiä ei löytynyt tällä hakusanalla',
}

export enum ENoJokesYet {
  en = 'No jokes yet',
  es = 'Aún no hay bromas',
  fr = 'Pas encore de blagues',
  de = 'Noch keine Witze',
  pt = 'Ainda não há piadas',
  cs = 'Zatím žádné vtipy',
  fi = 'Ei vielä vitsejä',
}

export enum EJokeTypeTitle {
  en = 'Joke Type',
  es = 'Tipo de broma',
  fr = 'Type de blague',
  de = 'Witzart',
  pt = 'Tipo de piada',
  cs = 'Typ vtipu',
  fi = 'Vitsityyppi',
}

export enum ERegisterAndLoginToUse {
  en = 'Register and log in to save your favorite jokes to a Mongo-DB database',
  es = 'Regístrese e inicie sesión para guardar sus chistes favoritos en una base de datos Mongo-DB',
  fr = 'Inscrivez-vous et connectez-vous pour enregistrer vos blagues préférées dans une base de données Mongo-DB',
  de = 'Registrieren Sie sich und melden Sie sich an, um Ihre Lieblingswitze in einer Mongo-DB-Datenbank zu speichern',
  pt = 'Registre-se e faça login para salvar suas piadas favoritas em um banco de dados Mongo-DB',
  cs = 'Zaregistrujte se a přihlaste se, abyste si mohli uložit své oblíbené vtipy do databáze Mongo-DB',
  fi = 'Rekisteröidy ja kirjaudu sisään tallentaaksesi suosikkivitsisi Mongo-DB-tietokantaan',
}

export enum EFetchesJokesFrom {
  en = 'Fetches jokes from',
  es = 'Busca chistes de',
  fr = 'Récupère des blagues de',
  de = 'Holt sich Witze von',
  pt = 'Busca piadas de',
  cs = 'Načte vtipy z',
  fi = 'Noutaa vitsejä sijainnista',
}

export enum EFilterJokesBy {
  en = 'Filter jokes by',
  es = 'Filtrar chistes por',
  fr = 'Filtrer les blagues par',
  de = 'Filtern Sie Witze nach',
  pt = 'Filtrar piadas por',
  cs = 'Filtrovat vtipy podle',
  fi = 'Suodata vitsejä:',
}

export interface IJokeCommonFields {
  _id?: string
  jokeId: string
  type: EJokeType
  category: ECategories
  subCategories: string[] | undefined
  language: ELanguages
  safe: boolean
  user: IUser['_id'][]
  flags: {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
  }
  private?: boolean // only for submitted jokes
  verified?: boolean
  anonymous?: boolean
  author?: IUser['_id']
  createdAt?: string
  updatedAt?: string
}

export interface IJokeSingle extends IJokeCommonFields {
  type: EJokeType.single
  joke: string
}

export interface IJokeTwoPart extends IJokeCommonFields {
  type: EJokeType.twopart
  setup: string
  delivery: string
}

export type IJoke = IJokeSingle | IJokeTwoPart

// export interface IUser {
//   _id?: string
//   username: string
//   name?: string
//   password: string
//   language: ELanguages
//   verified?: boolean
//   createdAt?: string
//   updatedAt?: string
// }

export interface IJokeType {
  _id?: string
  type: EJokeType
  createdAt?: string
  updatedAt?: string
}

// export interface ReducerProps {
//   notification: {
//     isError: boolean
//     message: string
//     seconds: number
//   }
//   jokes: IJoke[]
//   users: { users: IUser[] }
//   auth: {
//     user: IUser
//     isAuthenticated: boolean
//     isLoading: boolean
//     token: string
//   }
// }

export interface IJokeSubmissionSingleJSON {
  formatVersion: number
  category: ECategories
  type: EJokeType
  joke: string
  flags: {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
  }
  lang: ELanguages
}

export interface IJokeSubmissionTwoPartJSON {
  formatVersion: number
  category: ECategories
  type: EJokeType
  setup: string
  delivery: string
  flags: {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
  }
  lang: ELanguages
}
export enum EDadJoke {
  en = 'Dad joke',
  es = 'Chiste de papá',
  fr = 'Blague de papa',
  de = 'Papa-Witz',
  pt = 'Piada de pai',
  cs = 'Otcovský vtip',
  fi = 'Iskävitsi',
}
export enum EExtraCategories {
  none = 'None',
  ChuckNorris = 'Chuck Norris',
  DadJokes = 'Dad Jokes',
}
// "Dark" jokes are visible only when Safe Mode is off

export enum EDarkJokesAreVisibleOnlyWhenSafeModeIsOff {
  en = '"Dark" jokes are visible only when Safe Mode is off',
  es = 'Las "bromas oscuras" son visibles solo cuando el Modo seguro está desactivado',
  fr = 'Les "blagues sombres" ne sont visibles que lorsque le mode sécurisé est désactivé',
  de = 'Die "dunklen" Witze sind nur sichtbar, wenn der sichere Modus deaktiviert ist',
  pt = 'As "piadas escuras" são visíveis apenas quando o Modo de segurança está desativado',
  cs = '"Temné" vtipy jsou viditelné pouze tehdy, když je bezpečný režim vypnutý',
  fi = 'Synkät (Dark) vitsit näkyvät vain, kun turvallinen tila on pois päältä',
}

export enum ENote {
  en = 'Note!',
  es = 'Nota!',
  fr = 'Remarque!',
  de = 'Hinweis!',
  pt = 'Nota!',
  cs = 'Poznámka!',
  fi = 'Huom!',
}
export enum EPublic {
  en = 'Public',
  es = 'Público',
  fr = 'Public',
  de = 'Öffentlichkeit',
  pt = 'Público',
  cs = 'Veřejnost',
  fi = 'Julkinen',
}
export enum EPrivate {
  en = 'Private',
  es = 'Privado',
  fr = 'Privé',
  de = 'Privat',
  pt = 'Privado',
  cs = 'Soukromý',
  fi = 'Yksityinen',
}
export enum EMaybeTryAnotherLanguage {
  en = 'Maybe try another language?',
  es = '¿Quizás probar otro idioma?',
  fr = 'Peut-être essayer une autre langue?',
  de = 'Vielleicht eine andere Sprache ausprobieren?',
  pt = 'Talvez tente outro idioma?',
  cs = 'Možná zkusit jiný jazyk?',
  fi = 'Kokeile ehkä toisella kielellä?',
}

export enum EErrorDeletingJoke {
  en = 'There was an error deleting the joke',
  es = 'Se produjo un error al eliminar la broma',
  fr = "Une erreur s'est produite lors de la suppression de la blague",
  de = 'Beim Löschen des Witzes ist ein Fehler aufgetreten',
  pt = 'Ocorreu um erro ao excluir a piada',
  cs = 'Při mazání vtipu došlo k chybě',
  fi = 'Vitsin poistamisessa tapahtui virhe',
}
export enum ESort {
  en = 'Sort',
  es = 'Ordenar',
  fr = 'Trier',
  de = 'Sortieren',
  pt = 'Ordenar',
  cs = 'Seřadit',
  fi = 'Lajittele',
}

export enum EIfTheJokeIsNotPrivateVerificationIsNeeded {
  en = 'If the joke is not private, verification is needed from the administrator',
  es = 'Si la broma no es privada, se necesita verificación del administrador',
  fr = "Si la blague n'est pas privée, une vérification est nécessaire de la part de l'administrateur",
  de = 'Wenn der Witz nicht privat ist, ist eine Überprüfung durch den Administrator erforderlich',
  pt = 'Se a piada não for particular, é necessária verificação do administrador',
  cs = 'Pokud vtip není soukromý, je potřeba ověření od správce',
  fi = 'Jos vitsi ei ole yksityinen, tarvitaan hallinnon vahvistus',
}
export enum EJokeIsSetToPrivateAndWillOnlyBeSeenByYouAndTheAdministrator {
  en = 'Joke is set to private and will only be seen by you and the administrator',
  es = 'La broma está configurada como privada y solo será visible para usted y el administrador',
  fr = "La blague est définie sur privée et ne sera visible que par vous et l'administrateur",
  de = 'Der Witz ist auf privat eingestellt und wird nur von Ihnen und dem Administrator gesehen',
  pt = 'A piada é definida como privada e só será vista por você e pelo administrador',
  cs = 'Vtip je nastaven na soukromý a uvidíte ho pouze vy a správce',
  fi = 'Vitsi on asetettu yksityiseksi ja sitä näkevät vain sinä ja hallinto',
}
export enum EJokeIsSetToPublicAndWillNeedVerificationFromAnAdministrator {
  en = 'Joke is set to public and will need verification from an administrator',
  es = 'La broma está configurada como pública y necesitará verificación de un administrador',
  fr = "La blague est définie sur publique et aura besoin d'une vérification de la part d'un administrateur",
  de = 'Der Witz ist auf öffentlich eingestellt und muss von einem Administrator überprüft werden',
  pt = 'A piada é definida como pública e precisará de verificação de um administrador',
  cs = 'Vtip je nastaven na veřejný a bude potřebovat ověření od správce',
  fi = 'Vitsi on asetettu julkiseksi ja se vaatii vahvistuksen hallinnolta',
}
// Joke language
export enum EJokeLanguage {
  en = 'Joke language',
  es = 'Idioma de la broma',
  fr = 'Langue de la blague',
  de = 'Witzsprache',
  pt = 'Idioma da piada',
  cs = 'Jazyk vtipu',
  fi = 'Vitsin kieli',
}
export enum ELocalJokes {
  en = 'Local jokes',
  es = 'Chistes locales',
  fr = 'Blagues locales',
  de = 'Lokale Witze',
  pt = 'Piadas locais',
  cs = 'Místní vtipy',
  fi = 'Paikalliset vitsit',
}
export enum EYourJokes {
  en = 'Your jokes',
  es = 'Tus chistes',
  fr = 'Vos blagues',
  de = 'Deine Witze',
  pt = 'Suas piadas',
  cs = 'Vaše vtipy',
  fi = 'Tallentamasi vitsit',
}
export enum EUserSubmittedJokes {
  en = 'User submitted jokes',
  es = 'Chistes enviados por el usuario',
  fr = 'Blagues soumises par les utilisateurs',
  de = 'Vom Benutzer eingereichte Witze',
  pt = 'Piadas enviadas pelo usuário',
  cs = 'Vtipy zaslané uživatelem',
  fi = 'Käyttäjien vitsit',
}
export enum EAnonymous {
  en = 'Anonymous',
  es = 'Anónimo',
  fr = 'Anonyme',
  de = 'Anonym',
  pt = 'Anônimo',
  cs = 'Anonymní',
  fi = 'Anonyymi',
}
export enum EPublish {
  en = 'Publish',
  es = 'Publicar',
  fr = 'Publier',
  de = 'Veröffentlichen',
  pt = 'Publicar',
  cs = 'Publikovat',
  fi = 'Julkaise',
}
export enum EPrivacy {
  en = 'Privacy',
  es = 'Privacidad',
  fr = 'Intimité',
  de = 'Privatsphäre',
  pt = 'Privacidade',
  cs = 'Soukromí',
  fi = 'Yksityisyys',
}

export enum EPublishWithNickname {
  en = 'Publish with nickname',
  es = 'Publicar con apodo',
  fr = 'Publier avec un pseudonyme',
  de = 'Mit Spitznamen veröffentlichen',
  pt = 'Publicar com apelido',
  cs = 'Publikovat s přezdívkou',
  fi = 'Julkaise nimimerkillä',
}
export enum EPublishAnonymously {
  en = 'Publish anonymously',
  es = 'Publicar anónimamente',
  fr = 'Publier anonymement',
  de = 'Anonym veröffentlichen',
  pt = 'Publicar anonimamente',
  cs = 'Publikovat anonymně',
  fi = 'Julkaise nimettömänä',
}
export enum EAuthor {
  en = 'Author',
  es = 'Autor',
  fr = 'Auteur',
  de = 'Autor',
  pt = 'Autor',
  cs = 'Autor',
  fi = 'Tekijä',
}

export enum EAge {
  en = 'Age',
  es = 'Edad',
  fr = 'Âge',
  de = 'Alter',
  pt = 'Idade',
  cs = 'Věk',
  fi = 'Ikä',
}
export enum EPopular {
  en = 'Popular',
  es = 'Popular',
  fr = 'Populaire',
  de = 'Beliebt',
  pt = 'Popular',
  cs = 'Populární',
  fi = 'Suosittu',
}
export enum EPopularity {
  en = 'Popularity',
  es = 'Popularidad',
  fr = 'Popularité',
  de = 'Beliebtheit',
  pt = 'Popularidade',
  cs = 'Oblíbenost',
  fi = 'Suosio',
}
export const ESortBy = {
  popularity: EPopularity,
  language: ELanguageTitle,
  category: ECategoryTitle,
  name: EAuthor,
  age: EAge,
}

export enum ERandomJoke {
  en = 'Random joke',
  es = 'Broma aleatoria',
  fr = 'Blague aléatoire',
  de = 'Zufälliger Witz',
  pt = 'Piada aleatória',
  cs = 'Náhodný vtip',
  fi = 'Satunnainen vitsi',
}
export enum ERandom {
  en = 'Random',
  es = 'Aleatorio',
  fr = 'Aléatoire',
  de = 'Zufällig',
  pt = 'Aleatório',
  cs = 'Náhodný',
  fi = 'Satunnainen',
}
export enum EAllJokes {
  en = 'All jokes',
  es = 'Todos los chistes',
  fr = 'Toutes les blagues',
  de = 'Alle Witze',
  pt = 'Todas as piadas',
  cs = 'Všechny vtipy',
  fi = 'Kaikki vitsit',
}
export enum EAll {
  en = 'All',
  es = 'Todos',
  fr = 'Tout',
  de = 'Alle',
  pt = 'Todos',
  cs = 'Všechny',
  fi = 'Kaikki',
}
export enum EClickHereToWriteYourOwnJoke {
  en = 'Click here to write your own joke',
  es = 'Haga clic aquí para escribir su propia broma',
  fr = 'Cliquez ici pour écrire votre propre blague',
  de = 'Klicken Sie hier, um Ihren eigenen Witz zu schreiben',
  pt = 'Clique aqui para escrever sua própria piada',
  cs = 'Kliknutím sem napíšete vlastní vtip',
  fi = 'Napsauta tätä kirjoittaaksesi oman vitsisi',
}
export enum EThereAreNoJokesInFinnish {
  en = 'There are no jokes in Finnish',
  es = 'No hay bromas en finlandés',
  fr = "Il n'y a pas de blagues en finnois",
  de = 'Es gibt keine Witze auf Finnisch',
  pt = 'Não há piadas em finlandês',
  cs = 'Nejsou žádné vtipy ve finštině',
  fi = 'Suomeksi ei ole vitsejä',
}
export enum ESeeLocalJokes {
  en = 'See local jokes',
  es = 'Ver chistes locales',
  fr = 'Voir les blagues locales',
  de = 'Lokale Witze anzeigen',
  pt = 'Ver piadas locais',
  cs = 'Zobrazit místní vtipy',
  fi = 'Katso paikalliset vitsit',
}
export enum ESeeLocalJokesBelow {
  en = 'See local jokes below',
  es = 'Ver chistes locales a continuación',
  fr = 'Voir les blagues locales ci-dessous',
  de = 'Lokale Witze siehe unten',
  pt = 'Veja piadas locais abaixo',
  cs = 'Zobrazit místní vtipy níže',
  fi = 'Katso paikalliset vitsit alempana',
}
export enum ETryAnotherSearchTerm {
  en = 'Try another search term',
  es = 'Prueba otro término de búsqueda',
  fr = 'Essayez un autre terme de recherche',
  de = 'Versuchen Sie es mit einem anderen Suchbegriff',
  pt = 'Tente outro termo de pesquisa',
  cs = 'Zkuste jiný vyhledávací výraz',
  fi = 'Kokeile toisella hakuehdolla',
}
export enum EReportErrorToAdmin {
  en = 'Report error to admin',
  es = 'Informar error al administrador',
  fr = "Signaler une erreur à l'administrateur",
  de = 'Fehler an Admin melden',
  pt = 'Relatar erro ao administrador',
  cs = 'Nahlásit chybu správci',
  fi = 'Ilmoita virheestä ylläpidolle',
}
export enum EPerPage {
  en = 'per page',
  es = 'por página',
  fr = 'par page',
  de = 'pro Seite',
  pt = 'por página',
  cs = 'na stránku',
  fi = 'per sivu',
}
export enum EAreYouSureYouWantToMakeThisJokePublic {
  en = 'Are you sure you want to make this joke public? It will need verification from an administrator',
  es = '¿Estás seguro de que quieres hacer esta broma pública? Necesitará verificación de un administrador',
  fr = "Êtes-vous sûr de vouloir rendre cette blague publique? Il aura besoin d'une vérification de la part d'un administrateur",
  de = 'Möchten Sie diesen Witz wirklich öffentlich machen? Es wird eine Überprüfung durch einen Administrator benötigt',
  pt = 'Tem certeza de que deseja tornar esta piada pública? Ele precisará de verificação de um administrador',
  cs = 'Jste si jisti, že chcete tento vtip zveřejnit? Bude potřebovat ověření od správce',
  fi = 'Oletko varma, että haluat tehdä tämän vitsin julkiseksi? Se vaatii vahvistuksen hallinnolta',
}
export enum EPending {
  en = 'Pending',
  es = 'Pendiente',
  fr = 'En attente',
  de = 'Steht aus',
  pt = 'Pendente',
  cs = 'Čekající',
  fi = 'Odottaa',
}
export enum EPendingVerification {
  en = 'Pending verification',
  es = 'Verificación pendiente',
  fr = 'Vérification en attente',
  de = 'Ausstehende Überprüfung',
  pt = 'Verificação pendente',
  cs = 'Čekající ověření',
  fi = 'Odottaa vahvistusta',
}
export enum EAreYouSureYouWantToMakeThisJokePrivate {
  en = 'Are you sure you want to make this joke private? Republishing will require verification from an administrator',
  es = '¿Estás seguro de que quieres hacer esta broma privada? Volver a publicar requerirá verificación de un administrador',
  fr = "Êtes-vous sûr de vouloir rendre cette blague privée? La republication nécessitera une vérification de la part d'un administrateur",
  de = 'Möchten Sie diesen Witz wirklich privat machen? Eine erneute Veröffentlichung erfordert eine Überprüfung durch einen Administrator',
  pt = 'Tem certeza de que deseja tornar esta piada privada? Republicar exigirá verificação de um administrador',
  cs = 'Jste si jisti, že chcete tento vtip udělat soukromým? Opětovné zveřejnění bude vyžadovat ověření od správce',
  fi = 'Oletko varma, että haluat tehdä tämän vitsin yksityiseksi? Uudelleenjulkaisu vaatii vahvistuksen hallinnolta',
}
export enum ESelectCategory {
  en = 'Select category',
  es = 'Seleccionar categoría',
  fr = 'Sélectionnez une catégorie',
  de = 'Kategorie auswählen',
  pt = 'Selecione a categoria',
  cs = 'Vyberte kategorii',
  fi = 'Valitse kategoria',
}
export enum EOnlyPrivateJokesCanBeEdited {
  en = 'The text of jokes can be edited only when private',
  es = 'El texto de las bromas solo se puede editar cuando es privado',
  fr = "Le texte des blagues ne peut être modifié que lorsqu'il est privé",
  de = 'Der Text von Witzen kann nur bearbeitet werden, wenn er privat ist',
  pt = 'O texto das piadas só pode ser editado quando privado',
  cs = 'Text vtipů lze upravovat pouze v případě soukromého',
  fi = 'Vitsien tekstiä voi muokata vain silloin, kun se on yksityinen',
}
// Republishing will require verification from an administrator
export enum ERepublishingWillRequireVerificationFromAnAdministrator {
  en = 'Republishing will require verification from an administrator',
  es = 'Volver a publicar requerirá verificación de un administrador',
  fr = "La republication nécessitera une vérification de la part d'un administrateur",
  de = 'Eine erneute Veröffentlichung erfordert eine Überprüfung durch einen Administrator',
  pt = 'Republicar exigirá verificação de um administrador',
  cs = 'Opětovné zveřejnění bude vyžadovat ověření od správce',
  fi = 'Uudelleenjulkaisu vaatii vahvistuksen hallinnolta',
}

export enum ESkipToSavedJokes {
  en = 'Skip to saved jokes',
  es = 'Saltar a las bromas guardadas',
  fr = 'Passer aux blagues enregistrées',
  de = 'Zu gespeicherten Witzen springen',
  pt = 'Pular para piadas salvas',
  cs = 'Přejít na uložené vtipy',
  fi = 'Siirry tallennettuihin vitseihin',
}
export enum ESaving {
  en = 'Saving...',
  es = 'Guardando...',
  fr = 'Sauvegarde...',
  de = 'Speichern...',
  pt = 'Salvando...',
  cs = 'Ukládání...',
  fi = 'Tallennetaan...',
}
export interface ILang {
  en: string
  es: string
  fr: string
  de: string
  pt: string
  cs: string
  fi: string
}
export interface INorrisCatTran {
  any: ILang
  animal: ILang
  career: ILang
  celebrity: ILang
  dev: ILang
  fashion: ILang
  food: ILang
  history: ILang
  money: ILang
  movie: ILang
  music: ILang
  science: ILang
  sport: ILang
  travel: ILang
}
export const norrisCategoryTranslations: INorrisCatTran = {
  any: {
    en: 'Any',
    es: 'Cualquiera',
    fr: "N'importe quel",
    de: 'Jede',
    pt: 'Qualquer',
    cs: 'Jakýkoliv',
    fi: 'Mikä tahansa',
  },
  animal: {
    en: 'Animal',
    es: 'Animal',
    fr: 'Animal',
    de: 'Tier',
    pt: 'Animal',
    cs: 'Zvíře',
    fi: 'Eläin',
  },
  career: {
    en: 'Career',
    es: 'Carrera',
    fr: 'Carrière',
    de: 'Karriere',
    pt: 'Carreira',
    cs: 'Kariéra',
    fi: 'Ura',
  },
  celebrity: {
    en: 'Celebrity',
    es: 'Celebridad',
    fr: 'Célébrité',
    de: 'Berühmtheit',
    pt: 'Celebridade',
    cs: 'Celebrity',
    fi: 'Julkkis',
  },
  dev: {
    en: 'Dev',
    es: 'Dev',
    fr: 'Dev',
    de: 'Dev',
    pt: 'Dev',
    cs: 'Dev',
    fi: 'Dev',
  },
  fashion: {
    en: 'Fashion',
    es: 'Moda',
    fr: 'Mode',
    de: 'Mode',
    pt: 'Moda',
    cs: 'Móda',
    fi: 'Muoti',
  },
  food: {
    en: 'Food',
    es: 'Comida',
    fr: 'Nourriture',
    de: 'Essen',
    pt: 'Comida',
    cs: 'Jídlo',
    fi: 'Ruoka',
  },
  history: {
    en: 'History',
    es: 'Historia',
    fr: 'Histoire',
    de: 'Geschichte',
    pt: 'História',
    cs: 'Historie',
    fi: 'Historia',
  },
  money: {
    en: 'Money',
    es: 'Dinero',
    fr: 'Argent',
    de: 'Geld',
    pt: 'Dinheiro',
    cs: 'Peníze',
    fi: 'Raha',
  },
  movie: {
    en: 'Movie',
    es: 'Película',
    fr: 'Film',
    de: 'Film',
    pt: 'Filme',
    cs: 'Film',
    fi: 'Elokuva',
  },
  music: {
    en: 'Music',
    es: 'Música',
    fr: 'Musique',
    de: 'Musik',
    pt: 'Música',
    cs: 'Hudba',
    fi: 'Musiikki',
  },
  science: {
    en: 'Science',
    es: 'Ciencia',
    fr: 'Science',
    de: 'Wissenschaft',
    pt: 'Ciência',
    cs: 'Věda',
    fi: 'Tiede',
  },
  sport: {
    en: 'Sport',
    es: 'Deporte',
    fr: 'Sport',
    de: 'Sport',
    pt: 'Esporte',
    cs: 'Sport',
    fi: 'Urheilu',
  },
  travel: {
    en: 'Travel',
    es: 'Viaje',
    fr: 'Voyage',
    de: 'Reise',
    pt: 'Viagem',
    cs: 'Cestování',
    fi: 'Matkustaminen',
  },
}

export enum ESkipToJokeSearch {
  en = 'Skip to joke search',
  es = 'Saltar a la búsqueda de bromas',
  fr = 'Passer à la recherche de blagues',
  de = 'Zur Witzsuche springen',
  pt = 'Pular para a pesquisa de piadas',
  cs = 'Přejít na vyhledávání vtipů',
  fi = 'Siirry vitsihakuun',
}
export enum ELatest {
  en = 'Latest',
  es = 'Últimos',
  fr = 'Derniers',
  de = 'Letzte',
  pt = 'Últimos',
  cs = 'Posledních',
  fi = 'Viimeisimmät',
}
export enum EGetLatest {
  en = 'Get latest',
  es = 'Obtener los últimos',
  fr = 'Obtenez les derniers',
  de = 'Holen Sie sich die neuesten',
  pt = 'Obtenha os últimos',
  cs = 'Získejte posledních',
  fi = 'Hae viimeisimmät',
}
export enum EHowMany {
  en = 'How many',
  es = 'Cuántos',
  fr = 'Combien',
  de = 'Wie viele',
  pt = 'Quantos',
  cs = 'Kolik',
  fi = 'Kuinka monta',
}
export enum ECopy {
  en = 'Copy',
  es = 'Copiar',
  fr = 'Copie',
  de = 'Kopieren',
  pt = 'Cópia',
  cs = 'Kopie',
  fi = 'Kopioi',
}
export enum EJokeCopiedToClipboard {
  en = 'Joke copied to clipboard',
  es = 'Broma copiada al portapapeles',
  fr = 'Blague copiée dans le presse-papiers',
  de = 'Witz in die Zwischenablage kopiert',
  pt = 'Piada copiada para a área de transferência',
  cs = 'Vtip zkopírován do schránky',
  fi = 'Vitsi kopioitu leikepöydälle',
}
export enum EFailedToCopyJokeToClipboard {
  en = 'Failed to copy joke to clipboard',
  es = 'Error al copiar la broma al portapapeles',
  fr = 'Impossible de copier la blague dans le presse-papiers',
  de = 'Fehler beim Kopieren des Witzes in die Zwischenablage',
  pt = 'Falha ao copiar piada para a área de transferência',
  cs = 'Chyba při kopírování vtipu do schránky',
  fi = 'Vitsin kopioiminen leikepöydälle epäonnistui',
}
export enum EDeletedJoke {
  en = 'Deleted joke',
  es = 'Broma eliminada',
  fr = 'Blague supprimée',
  de = 'Gelöschter Witz',
  pt = 'Piada excluída',
  cs = 'Smazaný vtip',
  fi = 'Vitsi poistettu',
}
export enum EJokeHidden {
  en = 'Joke hidden',
  es = 'Broma oculta',
  fr = 'Blague cachée',
  de = 'Witz versteckt',
  pt = 'Piada escondida',
  cs = 'Vtip skrytý',
  fi = 'Vitsi piilotettu',
}
// Are you sure you want to hide this joke?
export enum EAreYouSureYouWantToHideThisJoke {
  en = 'Are you sure you want to hide this joke?',
  es = '¿Estás seguro de que quieres ocultar esta broma?',
  fr = 'Êtes-vous sûr de vouloir cacher cette blague?',
  de = 'Möchten Sie diesen Witz wirklich verstecken?',
  pt = 'Tem certeza de que deseja ocultar esta piada?',
  cs = 'Jste si jisti, že chcete tento vtip skrýt?',
  fi = 'Oletko varma, että haluat piilottaa tämän vitsin?',
}
export enum EThisJokeIsAlreadyBlacklisted {
  en = 'This joke is already blacklisted.',
  es = 'Esta broma ya está en la lista negra.',
  fr = 'Cette blague est déjà sur liste noire.',
  de = 'Dieser Witz ist bereits auf der schwarzen Liste.',
  pt = 'Esta piada já está na lista negra.',
  cs = 'Tento vtip je již na černé listině.',
  fi = 'Tämä vitsi on jo piilotettu.',
}
export enum EShowHiddenJokes {
  en = 'Show hidden jokes',
  es = 'Mostrar bromas ocultas',
  fr = 'Afficher les blagues cachées',
  de = 'Versteckte Witze anzeigen',
  pt = 'Mostrar piadas ocultas',
  cs = 'Zobrazit skryté vtipy',
  fi = 'Näytä piilotetut vitsit',
}
export enum EHideJokes {
  en = 'Hide jokes',
  es = 'Ocultar bromas',
  fr = 'Masquer les blagues',
  de = 'Witze verstecken',
  pt = 'Ocultar piadas',
  cs = 'Skrýt vtipy',
  fi = 'Piilota vitsit',
}
export enum EHide {
  en = 'Hide',
  es = 'Ocultar',
  fr = 'Masquer',
  de = 'Verstecken',
  pt = 'Ocultar',
  cs = 'Skrýt',
  fi = 'Piilota',
}
export enum ERestore {
  en = 'Restore',
  es = 'Restaurar',
  fr = 'Restaurer',
  de = 'Wiederherstellen',
  pt = 'Restaurar',
  cs = 'Obnovit',
  fi = 'Palauta',
}
export enum EJokeRestored {
  en = 'Joke restored',
  es = 'Broma restaurada',
  fr = 'Blague restaurée',
  de = 'Witz wiederhergestellt',
  pt = 'Piada restaurada',
  cs = 'Vtip obnoven',
  fi = 'Vitsi palautettu',
}
export enum EAreYouSureYouWantToRestoreThisJoke {
  en = 'Are you sure you want to restore this joke?',
  es = '¿Estás seguro de que quieres restaurar esta broma?',
  fr = 'Êtes-vous sûr de vouloir restaurer cette blague?',
  de = 'Möchten Sie diesen Witz wirklich wiederherstellen?',
  pt = 'Tem certeza de que deseja restaurar esta piada?',
  cs = 'Jste si jisti, že chcete tento vtip obnovit?',
  fi = 'Oletko varma, että haluat palauttaa tämän vitsin?',
}
export enum EWouldYouLikeToSaveTheJoke {
  en = 'Would you like to save the joke?',
  es = '¿Te gustaría guardar la broma?',
  fr = 'Souhaitez-vous enregistrer la blague?',
  de = 'Möchten Sie den Witz speichern?',
  pt = 'Você gostaria de salvar a piada?',
  cs = 'Chcete uložit vtip?',
  fi = 'Haluatko tallentaa vitsin?',
}
export enum EBlockedJokes {
  en = 'Blocked jokes',
  es = 'Bromas bloqueadas',
  fr = 'Blagues bloquées',
  de = 'Blockierte Witze',
  pt = 'Piadas bloqueadas',
  cs = 'Blokovat vtipy',
  fi = 'Estetyt vitsit',
}
export enum EHideBlockedJokes {
  en = 'Hide blocked jokes',
  es = 'Ocultar bromas bloqueadas',
  fr = 'Masquer les blagues bloquées',
  de = 'Blockierte Witze ausblenden',
  pt = 'Ocultar piadas bloqueadas',
  cs = 'Skrýt blokované vtipy',
  fi = 'Piilota estetyt vitsit',
}
export enum ELatestJokes {
  en = 'Latest jokes',
  es = 'Últimas bromas',
  fr = 'Dernières blagues',
  de = 'Neueste Witze',
  pt = 'Últimas piadas',
  cs = 'Poslední vtipy',
  fi = 'Viimeisimmät vitsit',
}
export enum EBlock {
  en = 'Block',
  es = 'Bloquear',
  fr = 'Bloquer',
  de = 'Block',
  pt = 'Bloquear',
  cs = 'Blok',
  fi = 'Estä',
}
export enum ERemove {
  en = 'Remove',
  es = 'Eliminar',
  fr = 'Supprimer',
  de = 'Entfernen',
  pt = 'Remover',
  cs = 'Odstranit',
  fi = 'Poista',
}
export enum EBlocked {
  en = 'Blocked',
  es = 'Bloqueado',
  fr = 'Bloqué',
  de = 'Blockiert',
  pt = 'Bloqueado',
  cs = 'Blokovaný',
  fi = 'Estetyt',
}
export enum ELoadingJokes {
  en = 'Loading jokes...',
  es = 'Cargando bromas...',
  fr = 'Chargement des blagues...',
  de = 'Witze werden geladen...',
  pt = 'Carregando piadas...',
  cs = 'Načítání vtipů...',
  fi = 'Ladataan vitsejä...',
}
export enum EJokesLoaded {
  en = 'Jokes loaded',
  es = 'Bromas cargadas',
  fr = 'Blagues chargées',
  de = 'Witze geladen',
  pt = 'Piadas carregadas',
  cs = 'Vtipy načteny',
  fi = 'Vitsit ladattu',
}

export enum EThisMayTakeUpToAMinute {
  en = 'This may take up to a minute',
  es = 'Esto puede tardar hasta un minuto',
  fr = "Cela peut prendre jusqu'à une minute",
  de = 'Dies kann bis zu einer Minute dauern',
  pt = 'Isso pode levar até um minuto',
  cs = 'To může trvat až minutu',
  fi = 'Tämä voi kestää jopa minuutin',
}
export const jokeCategoryByLanguage: IJokeCategoryByLanguage = {
  en: {
    Programming: ECategory_en.Programming,
    Misc: ECategory_en.Misc,
    Dark: ECategory_en.Dark,
    Pun: ECategory_en.Pun,
    Spooky: ECategory_en.Spooky,
    Christmas: ECategory_en.Christmas,
    ChuckNorris: ECategory_en.ChuckNorris,
    DadJoke: ECategory_en.DadJoke,
  },
  es: {
    Programming: ECategory_es.Programming,
    Misc: ECategory_es.Misc,
    Dark: ECategory_es.Dark,
    Pun: ECategory_es.Pun,
    Spooky: ECategory_es.Spooky,
    Christmas: ECategory_es.Christmas,
    ChuckNorris: ECategory_es.ChuckNorris,
    DadJoke: ECategory_es.DadJoke,
  },
  fr: {
    Programming: ECategory_fr.Programming,
    Misc: ECategory_fr.Misc,
    Dark: ECategory_fr.Dark,
    Pun: ECategory_fr.Pun,
    Spooky: ECategory_fr.Spooky,
    Christmas: ECategory_fr.Christmas,
    ChuckNorris: ECategory_fr.ChuckNorris,
    DadJoke: ECategory_fr.DadJoke,
  },
  de: {
    Programming: ECategory_de.Programming,
    Misc: ECategory_de.Misc,
    Dark: ECategory_de.Dark,
    Pun: ECategory_de.Pun,
    Spooky: ECategory_de.Spooky,
    Christmas: ECategory_de.Christmas,
    ChuckNorris: ECategory_de.ChuckNorris,
    DadJoke: ECategory_de.DadJoke,
  },
  pt: {
    Programming: ECategory_pt.Programming,
    Misc: ECategory_pt.Misc,
    Dark: ECategory_pt.Dark,
    Pun: ECategory_pt.Pun,
    Spooky: ECategory_pt.Spooky,
    Christmas: ECategory_pt.Christmas,
    ChuckNorris: ECategory_pt.ChuckNorris,
    DadJoke: ECategory_pt.DadJoke,
  },
  cs: {
    Programming: ECategory_cs.Programming,
    Misc: ECategory_cs.Misc,
    Dark: ECategory_cs.Dark,
    Pun: ECategory_cs.Pun,
    Spooky: ECategory_cs.Spooky,
    Christmas: ECategory_cs.Christmas,
    ChuckNorris: ECategory_cs.ChuckNorris,
    DadJoke: ECategory_cs.DadJoke,
  },
  fi: {
    Programming: ECategory_fi.Programming,
    Misc: ECategory_fi.Misc,
    Dark: ECategory_fi.Dark,
    Pun: ECategory_fi.Pun,
    Spooky: ECategory_fi.Spooky,
    Christmas: ECategory_fi.Christmas,
    ChuckNorris: ECategory_fi.ChuckNorris,
    DadJoke: ECategory_fi.DadJoke,
  },
}

export const jokeCategoryAny = {
  en: 'Any',
  es: 'Cualquiera',
  fr: "N'importe quel",
  de: 'Irgendein',
  pt: 'Qualquer',
  cs: 'Jakýkoliv',
  fi: 'Mikä tahansa',
}
