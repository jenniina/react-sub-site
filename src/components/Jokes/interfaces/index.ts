export type EGeneric<T> = {
  [key in keyof T]: T[key]
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

export type TFlagsLanguages = {
  en: EFlags_en
  es: EFlags_es
  fr: EFlags_fr
  de: EFlags_de
  pt: EFlags_pt
  cs: EFlags_cs
}

export interface IFlagsLanguages {
  en: typeof EFlags_en
  es: typeof EFlags_es
  fr: typeof EFlags_fr
  de: typeof EFlags_de
  pt: typeof EFlags_pt
  cs: typeof EFlags_cs
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
}
export enum EWarningTitle {
  en = 'Warning',
  es = 'Advertencia',
  fr = 'Attention',
  de = 'Warnung',
  pt = 'Aviso',
  cs = 'Varování',
}
export enum EAddWarningTitle {
  en = 'Add Warning',
  es = 'Agregar advertencia',
  fr = 'Ajouter un avertissement',
  de = 'Warnung hinzufügen',
  pt = 'Adicionar aviso',
  cs = 'Přidat varování',
}

export enum ECategory_en {
  // Any = 'Any',
  Misc = 'Misc',
  Programming = 'Programming',
  Dark = 'Dark',
  Pun = 'Pun',
  Spooky = 'Spooky',
  Christmas = 'Christmas',
}
export enum ECategory_es {
  // Any = 'Cualquiera',
  Misc = 'Varios',
  Programming = 'Programación',
  Dark = 'Oscuro',
  Pun = 'Juego de palabras',
  Spooky = 'Espeluznante',
  Christmas = 'Navidad',
}
export enum ECategory_fr {
  // Any = "N'importe quel",
  Misc = 'Divers',
  Programming = 'Programmation',
  Dark = 'Sombre',
  Pun = 'Jeu de mots',
  Spooky = 'Effrayant',
  Christmas = 'Noël',
}
export enum ECategory_de {
  // Any = 'Jede',
  Misc = 'Verschiedenes',
  Programming = 'Programmierung',
  Dark = 'Dunkel',
  Pun = 'Wortspiel',
  Spooky = 'Unheimlich',
  Christmas = 'Weihnachten',
}
export enum ECategory_pt {
  // Any = 'Qualquer',
  Misc = 'Diversos',
  Programming = 'Programação',
  Dark = 'Escuro',
  Pun = 'Jogo de palavras',
  Spooky = 'Assustador',
  Christmas = 'Natal',
}
export enum ECategory_cs {
  // Any = 'Jakýkoliv',
  Misc = 'Různé',
  Programming = 'Programování',
  Dark = 'Temný',
  Pun = 'Hra slov',
  Spooky = 'Strašidelný',
  Christmas = 'Vánoce',
}
export type CategoryLanguages = {
  en: ECategory_en
  es: ECategory_es
  fr: ECategory_fr
  de: ECategory_de
  pt: ECategory_pt
  cs: ECategory_cs
}
export type ECategory = CategoryLanguages[keyof CategoryLanguages]
export interface IJokeCategoryByLanguage {
  en: typeof ECategory_en
  es: typeof ECategory_es
  fr: typeof ECategory_fr
  de: typeof ECategory_de
  pt: typeof ECategory_pt
  cs: typeof ECategory_cs
}
export enum ELanguages {
  English = 'en',
  Español = 'es',
  Français = 'fr',
  Deutch = 'de',
  Português = 'pt',
  Čeština = 'cs',
}
export enum ELanguagesLong {
  en = 'English',
  es = 'Español',
  fr = 'Français',
  de = 'Deutch',
  pt = 'Português',
  cs = 'Čeština',
}
export const LanguageOfLanguage: TLanguageOfLanguage = {
  en: {
    English: 'English',
    Español: 'Spanish',
    Français: 'French',
    Deutch: 'German',
    Português: 'Portuguese',
    Čeština: 'Czech',
  },
  es: {
    English: 'Inglés',
    Español: 'Español',
    Français: 'Francés',
    Deutch: 'Alemán',
    Português: 'Portugués',
    Čeština: 'Checo',
  },
  fr: {
    English: 'Anglais',
    Español: 'Espagnol',
    Français: 'Français',
    Deutch: 'Allemand',
    Português: 'Portugais',
    Čeština: 'Tchèque',
  },
  de: {
    English: 'Englisch',
    Español: 'Spanisch',
    Français: 'Französisch',
    Deutch: 'Deutsch',
    Português: 'Portugiesisch',
    Čeština: 'Tschechisch',
  },
  pt: {
    English: 'Inglês',
    Español: 'Espanhol',
    Français: 'Francês',
    Deutch: 'Alemão',
    Português: 'Português',
    Čeština: 'Tcheco',
  },
  cs: {
    English: 'Angličtina',
    Español: 'Španělština',
    Français: 'Francouzština',
    Deutch: 'Němčina',
    Português: 'Portugalština',
    Čeština: 'Čeština',
  },
}

export type TLanguageOfLanguage = {
  en: {
    English: 'English'
    Español: 'Spanish'
    Français: 'French'
    Deutch: 'German'
    Português: 'Portuguese'
    Čeština: 'Czech'
  }
  es: {
    English: 'Inglés'
    Español: 'Español'
    Français: 'Francés'
    Deutch: 'Alemán'
    Português: 'Portugués'
    Čeština: 'Checo'
  }
  fr: {
    English: 'Anglais'
    Español: 'Espagnol'
    Français: 'Français'
    Deutch: 'Allemand'
    Português: 'Portugais'
    Čeština: 'Tchèque'
  }
  de: {
    English: 'Englisch'
    Español: 'Spanisch'
    Français: 'Französisch'
    Deutch: 'Deutsch'
    Português: 'Portugiesisch'
    Čeština: 'Tschechisch'
  }
  pt: {
    English: 'Inglês'
    Español: 'Espanhol'
    Français: 'Francês'
    Deutch: 'Alemão'
    Português: 'Português'
    Čeština: 'Tcheco'
  }
  cs: {
    English: 'Angličtina'
    Español: 'Španělština'
    Français: 'Francouzština'
    Deutch: 'Němčina'
    Português: 'Portugalština'
    Čeština: 'Čeština'
  }
}

export enum ELanguageOfLanguage_en {
  English = 'English',
  Español = 'Spanish',
  Français = 'French',
  Deutch = 'German',
  Português = 'Portuguese',
  Čeština = 'Czech',
}
export enum ELanguageOfLanguage_es {
  English = 'Inglés',
  Español = 'Español',
  Français = 'Francés',
  Deutch = 'Alemán',
  Português = 'Portugués',
  Čeština = 'Checo',
}
export enum ELanguageOfLanguage_fr {
  English = 'Anglais',
  Español = 'Espagnol',
  Français = 'Français',
  Deutch = 'Allemand',
  Português = 'Portugais',
  Čeština = 'Tchèque',
}
export enum ELanguageOfLanguage_de {
  English = 'Englisch',
  Español = 'Spanisch',
  Français = 'Französisch',
  Deutch = 'Deutsch',
  Português = 'Portugiesisch',
  Čeština = 'Tschechisch',
}
export enum ELanguageOfLanguage_pt {
  English = 'Inglês',
  Español = 'Espanhol',
  Français = 'Francês',
  Deutch = 'Alemão',
  Português = 'Português',
  Čeština = 'Tcheco',
}
export enum ELanguageOfLanguage_cs {
  English = 'Angličtina',
  Español = 'Španělština',
  Français = 'Francouzština',
  Deutch = 'Němčina',
  Português = 'Portugalština',
  Čeština = 'Čeština',
}
export type ELanguageOfLanguage = {
  en: ELanguageOfLanguage_en
  es: ELanguageOfLanguage_es
  fr: ELanguageOfLanguage_fr
  de: ELanguageOfLanguage_de
  pt: ELanguageOfLanguage_pt
  cs: ELanguageOfLanguage_cs
}

export enum ELanguageTitle {
  en = 'Language',
  es = 'Idioma',
  fr = 'Langue',
  de = 'Sprache',
  pt = 'Língua',
  cs = 'Jazyk',
}
export enum ETitle {
  en = "The Comedian's Companion",
  es = 'El Compañero del Comediante',
  fr = 'Le Compagnon du Comédien',
  de = 'Der Begleiter des Komikers',
  pt = 'O Companheiro do Comediante',
  cs = 'Společník komika',
}
export enum ESubmit {
  en = 'Find a joke',
  es = 'Encuentra una broma',
  fr = 'Trouver une blague',
  de = 'Finde einen Witz',
  pt = 'Encontre uma piada',
  cs = 'Najít vtip',
}
export enum EAJokeGeneratorForTheComicallyInclied {
  en = 'A Joke Generator for the Comically Inclined',
  es = 'Un generador de chistes para los cómicamente inclinados',
  fr = 'Un générateur de blagues pour les comiquement enclins',
  de = 'Ein Witzgenerator für die komisch geneigten',
  pt = 'Um gerador de piadas para os comicamente inclinados',
  cs = 'Generátor vtipů pro komicky nakloněné',
}
// export enum ESubmit {
//   en = 'Generate a Joke',
//   cs = 'Vygenerovat vtip',
//   de = 'Einen Witz generieren',
//   es = 'Generar un chiste',
//   fr = 'Générer une blague',
//   pt = 'Gerar uma piada',
// }
export enum ESend {
  en = 'Send',
  es = 'Enviar',
  fr = 'Envoyer',
  de = 'Senden',
  pt = 'Enviar',
  cs = 'Poslat',
}
export enum ESave {
  en = 'Save',
  es = 'Guardar',
  fr = 'Sauvegarder',
  de = 'Speichern',
  pt = 'Salvar',
  cs = 'Uložit',
}
export enum ESavedJoke {
  en = 'Saved joke',
  es = 'Chiste guardado',
  fr = 'Blague enregistrée',
  de = 'Gespeicherter Witz',
  pt = 'Piada salva',
  cs = 'Uložený vtip',
}
export enum EJokeAlreadySaved {
  en = 'Joke already saved',
  es = 'Chiste ya guardado',
  fr = 'Blague déjà enregistrée',
  de = 'Witz bereits gespeichert',
  pt = 'Piada já salva',
  cs = 'Vtip již uložen',
}
export enum ECategoryTitle {
  en = 'Category',
  es = 'Categoría',
  fr = 'Catégorie',
  de = 'Kategorie',
  pt = 'Categoria',
  cs = 'Kategorie',
}
export enum ESelectACategory {
  en = 'Select a category',
  es = 'Seleccione una categoría',
  fr = 'Sélectionnez une catégorie',
  de = 'Wählen Sie eine Kategorie',
  pt = 'Selecione uma categoria',
  cs = 'Vyberte kategorii',
}
export enum ESelectALanguage {
  en = 'Select a language',
  es = 'Seleccione un idioma',
  fr = 'Sélectionnez une langue',
  de = 'Wählen Sie eine Sprache',
  pt = 'Selecione um idioma',
  cs = 'Vyberte jazyk',
}
export enum ESafeTitle {
  en = 'Safe',
  es = 'Seguro',
  fr = 'Sûr',
  de = 'Sicher',
  pt = 'Seguro',
  cs = 'Bezpečné',
}
export enum EUnsafeTitle {
  en = 'Unsafe',
  es = 'Inseguro',
  fr = 'Pas sûr',
  de = 'Unsicher',
  pt = 'Inseguro',
  cs = 'Nebezpečné',
}
export enum EJoke {
  en = 'Joke',
  es = 'Chiste',
  fr = 'Blague',
  de = 'Witz',
  pt = 'Piada',
  cs = 'Vtip',
}
export enum EJokes {
  en = 'Jokes',
  es = 'Chistes',
  fr = 'Blagues',
  de = 'Witze',
  pt = 'Piadas',
  cs = 'Vtipy',
}
export enum EDelete {
  en = 'Delete',
  es = 'Borrar',
  fr = 'Supprimer',
  de = 'Löschen',
  pt = 'Excluir',
  cs = 'Odstranit',
}
export enum EEdit {
  en = 'Edit',
  es = 'Editar',
  fr = 'Modifier',
  de = 'Bearbeiten',
  pt = 'Editar',
  cs = 'Upravit',
}
export enum EClose {
  en = 'Close',
  es = 'Cerrar',
  fr = 'Fermer',
  de = 'Schließen',
  pt = 'Fechar',
  cs = 'Zavřít',
}
export enum ECurrentPassword {
  en = 'Current Password',
  es = 'Contraseña actual',
  fr = 'Mot de passe actuel',
  de = 'Aktuelles Passwort',
  pt = 'Senha atual',
  cs = 'Aktuální heslo',
}
export enum ELoggedInAs {
  en = 'Logged in as',
  es = 'Conectado como',
  fr = 'Connecté en tant que',
  de = 'Angemeldet als',
  pt = 'Conectado como',
  cs = 'Přihlášen jako',
}
export enum ESearch {
  en = 'Search',
  es = 'Buscar',
  fr = 'Chercher',
  de = 'Suche',
  pt = 'Pesquisar',
  cs = 'Vyhledávání',
}
export enum EClickToReveal {
  en = 'Click to reveal',
  es = 'Clic para revelar',
  fr = 'Cliquez pour révéler',
  de = 'Klicken Sie zum Enthüllen',
  pt = 'Clique para revelar',
  cs = 'Kliknutím zobrazíte',
}

export enum EClickHereToSeeFeatures {
  en = 'Click here to see the features',
  cs = 'Klikněte zde pro zobrazení funkcí',
  de = 'Klicken Sie hier, um die Funktionen anzuzeigen',
  es = 'Haga clic aquí para ver las funciones',
  fr = 'Cliquez ici pour voir les fonctionnalités',
  pt = 'Clique aqui para ver os recursos',
}

export enum ELogin {
  en = 'Log In',
  es = 'Iniciar sesión',
  fr = "S'identifier",
  de = 'Einloggen',
  pt = 'Entrar',
  cs = 'Přihlásit se',
}
export enum ELogout {
  en = 'Log Out',
  es = 'Cerrar sesión',
  fr = 'Se déconnecter',
  de = 'Ausloggen',
  pt = 'Sair',
  cs = 'Odhlásit se',
}
export enum ESelectAnOption {
  en = 'Select an option',
  es = 'Seleccione una opción',
  fr = 'Sélectionnez une option',
  de = 'Wählen Sie eine Option',
  pt = 'Selecione uma opção',
  cs = 'Vyberte možnost',
}
export enum ESortByTitle {
  en = 'Sort by',
  es = 'Ordenar por',
  fr = 'Trier par',
  de = 'Sortieren nach',
  pt = 'Ordenar por',
  cs = 'Seřadit podle',
}
export const SortBy = {
  language: ELanguageTitle,
  category: ECategoryTitle,
  jokeId: { en: 'ID', es: 'ID', fr: 'ID', de: 'ID', pt: 'ID', cs: 'ID' },
}
export enum ESubmitAJoke {
  en = 'Submit a Joke',
  es = 'Enviar una broma',
  fr = 'Soumettre une blague',
  de = 'Einen Witz einreichen',
  pt = 'Enviar uma piada',
  cs = 'Odeslat vtip',
}

export enum ESubmitAJokeTo {
  en = 'Submit a Joke to ',
  es = 'Enviar una broma a ',
  fr = 'Soumettre une blague à ',
  de = 'Einen Witz senden an ',
  pt = 'Enviar uma piada para ',
  cs = 'Odeslat vtip do ',
}

export enum EJokeSetup {
  en = 'Setup',
  es = 'Configurar',
  fr = 'Configuration',
  de = 'Einrichtung',
  pt = 'Configuração',
  cs = 'Nastavení',
}
export enum EJokeDelivery {
  en = 'Delivery',
  es = 'Entrega',
  fr = 'Livraison',
  de = 'Lieferung',
  pt = 'Entrega',
  cs = 'Dodání',
}

export enum ESingle {
  en = 'Single',
  es = 'Soltero',
  fr = 'Célibataire',
  de = 'Single',
  pt = 'Solteiro',
  cs = 'Single',
}
export enum ETwoPart {
  en = 'Two-Part',
  es = 'Dos partes',
  fr = 'Deux parties',
  de = 'Zweiteilig',
  pt = 'Duas partes',
  cs = 'Dvoudílný',
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
}
export enum ESearchByKeyword {
  en = 'Search by keyword',
  es = 'Buscar por palabra clave',
  fr = 'Recherche par mot-clé',
  de = 'Suche nach Schlüsselwort',
  pt = 'Pesquisar por palavra-chave',
  cs = 'Hledat podle klíčového slova',
}
export enum EOnOff {
  en = 'On/Off',
  es = 'Encendido/Apagado',
  fr = 'Activé/Désactivé',
  de = 'Ein/Aus',
  pt = 'Ligado/Desligado',
  cs = 'Zapnuto/Vypnuto',
}

export enum EKeyword {
  en = 'Keyword',
  es = 'Palabra clave',
  fr = 'Mot-clé',
  de = 'Stichwort',
  pt = 'Palavra-chave',
  cs = 'Klíčové slovo',
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
}
export enum ERegister {
  en = 'Register',
  es = 'Registrarse',
  fr = "S'inscrire",
  de = 'Registrieren',
  pt = 'Registo',
  cs = 'Registrovat',
}
export enum ERegistration {
  en = 'Registration',
  es = 'Registro',
  fr = 'Inscription',
  de = 'Registrierung',
  pt = 'Registro',
  cs = 'Registrace',
}
export enum EForgotPassword {
  en = 'Forgot Password?',
  es = '¿Olvidaste tu contraseña?',
  fr = 'Mot de passe oublié?',
  de = 'Passwort vergessen?',
  pt = 'Esqueceu a senha?',
  cs = 'Zapomněli jste heslo?',
}
export enum ESendResetLink {
  en = 'Send Reset Link',
  es = 'Enviar enlace de restablecimiento',
  fr = 'Envoyer le lien de réinitialisation',
  de = 'Link zum Zurücksetzen senden',
  pt = 'Enviar link de redefinição',
  cs = 'Odeslat odkaz na obnovení',
}
export enum EEmail {
  en = 'Email',
  es = 'Correo electrónico',
  fr = 'Email',
  de = 'Email',
  pt = 'O email',
  cs = 'E-mailem',
}
export enum ENickname {
  en = 'Nickname',
  es = 'Apodo',
  fr = 'Surnom',
  de = 'Spitzname',
  pt = 'Apelido',
  cs = 'Přezdívka',
}
export enum EPassword {
  en = 'Password',
  es = 'Contraseña',
  fr = 'Mot de passe',
  de = 'Passwort',
  pt = 'Senha',
  cs = 'Heslo',
}
export enum EConfirmPassword {
  en = 'Confirm Password',
  es = 'Confirmar contraseña',
  fr = 'Confirmez le mot de passe',
  de = 'Passwort bestätigen',
  pt = 'Confirme a Senha',
  cs = 'Potvrďte heslo',
}
export enum ERegistrationSuccesful {
  en = 'Registration successful',
  es = 'Registro exitoso',
  fr = 'Inscription réussie',
  de = 'Registrierung erfolgreich',
  pt = 'Registro bem sucedido',
  cs = 'Registrace úspěšná',
}
export enum EAny {
  en = 'Any',
  es = 'Cualquiera',
  fr = "N'importe quel",
  de = 'Jede',
  pt = 'Qualquer',
  cs = 'Jakýkoliv',
}
export enum EError {
  en = 'Error',
  es = 'Error',
  fr = 'Erreur',
  de = 'Error',
  pt = 'Erro',
  cs = 'Chyba',
}
export enum ELoggingIn {
  en = 'Logging in...',
  es = 'Iniciando sesión...',
  fr = 'Connexion en cours...',
  de = 'Anmeldung...',
  pt = 'Entrando...',
  cs = 'Přihlašování...',
}
export enum ESendingEmail {
  en = 'Sending email...',
  es = 'Enviando correo electrónico...',
  fr = "Envoi d'email...",
  de = 'E-Mail senden...',
  pt = 'Enviando email...',
  cs = 'Odesílání e-mailu...',
}
export enum EEmailSent {
  en = 'Email sent',
  es = 'Correo electrónico enviado',
  fr = 'Email envoyé',
  de = 'E-Mail gesendet',
  pt = 'Email enviado',
  cs = 'E-mail odeslán',
}
export enum ENoJokeFound {
  en = 'No joke found',
  es = 'No se encontró broma',
  fr = 'Pas de blague trouvée',
  de = 'Kein Witz gefunden',
  pt = 'Nenhuma piada encontrada',
  cs = 'Nenalezen žádný vtip',
}
export enum EPasswordsDoNotMatch {
  en = 'Passwords do not match',
  es = 'Las contraseñas no coinciden',
  fr = 'Les mots de passe ne correspondent pas',
  de = 'Passwörter stimmen nicht überein',
  pt = 'As senhas não coincidem',
  cs = 'Hesla se neshodují',
}
export enum EJokeTypeTitle {
  en = 'Joke Type',
  es = 'Tipo de broma',
  fr = 'Type de blague',
  de = 'Witzart',
  pt = 'Tipo de piada',
  cs = 'Typ vtipu',
}

export enum ERegisterAndLoginToUse {
  en = 'Register and log in to save your favorite jokes to a Mongo-DB database',
  es = 'Regístrese e inicie sesión para guardar sus chistes favoritos en una base de datos Mongo-DB',
  fr = 'Inscrivez-vous et connectez-vous pour enregistrer vos blagues préférées dans une base de données Mongo-DB',
  de = 'Registrieren Sie sich und melden Sie sich an, um Ihre Lieblingswitze in einer Mongo-DB-Datenbank zu speichern',
  pt = 'Registre-se e faça login para salvar suas piadas favoritas em um banco de dados Mongo-DB',
  cs = 'Zaregistrujte se a přihlaste se, abyste si mohli uložit své oblíbené vtipy do databáze Mongo-DB',
}

export enum EFeatures {
  en = 'Features',
  es = 'Caracteristicas',
  fr = 'Traits',
  de = 'Eigenschaften',
  pt = 'Características',
  cs = 'Vlastnosti',
}

export enum EFetchesJokesFrom {
  en = 'Fetches jokes from',
  es = 'Busca chistes de',
  fr = 'Récupère des blagues de',
  de = 'Holt sich Witze von',
  pt = 'Busca piadas de',
  cs = 'Načte vtipy z',
}

export enum EAppTranslatedTo {
  en = 'App translated to',
  es = 'Aplicación traducida a',
  fr = 'Application traduite en',
  de = 'App übersetzt nach',
  pt = 'Aplicativo traduzido para',
  cs = 'Aplikace přeložena do',
}

export enum EFilterJokesBy {
  en = 'Filter jokes by',
  es = 'Filtrar chistes por',
  fr = 'Filtrer les blagues par',
  de = 'Filtern Sie Witze nach',
  pt = 'Filtrar piadas por',
  cs = 'Filtrovat vtipy podle',
}

export interface IJokeCommonFields {
  _id?: string
  jokeId: number
  type: EJokeType
  category: ECategory
  language: ELanguages
  safe: boolean
  user: IUser['_id'][]
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

export interface IUser {
  _id?: string
  username: string
  name?: string
  password: string
  language: ELanguages
  verified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IJokeType {
  _id?: string
  type: EJokeType
  createdAt?: string
  updatedAt?: string
}

export interface ReducerProps {
  notification: {
    isError: boolean
    message: string
    seconds: number
  }
  jokes: IJoke[]
  users: { users: IUser[] }
  auth: {
    user: IUser
    isAuthenticated: boolean
    isLoading: boolean
    token: string
  }
}

export interface IJokeSubmissionSingleJSON {
  formatVersion: number
  category: ECategory
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
  category: ECategory
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
export enum ETryTappingTheShapes {
  en = 'Try tapping the shapes',
  es = 'Intenta tocar las formas',
  fr = 'Essayez de toucher les formes',
  de = 'Versuchen Sie, die Formen zu berühren',
  pt = 'Tente tocar as formas',
  cs = 'Zkuste klepnout na tvary',
}
export enum EReset {
  en = 'Reset',
  es = 'Reiniciar',
  fr = 'Réinitialiser',
  de = 'Zurücksetzen',
  pt = 'Redefinir',
  cs = 'Resetovat',
}
