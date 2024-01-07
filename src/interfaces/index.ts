import { IJoke } from '../components/Jokes/interfaces'
import { EQuizType, IQuiz, IQuestion, IHighscore } from '../components/Quiz/interfaces'
import { ITask, ITodos } from '../components/Todo/interfaces'

export interface RefObject<T> {
  readonly current: T | null
}

export const breakpoint = 600
export const breakpointSmall = 300

export interface IUser {
  _id?: string
  username: string
  name?: string
  password: string
  passwordOld?: string
  language: ELanguages | string
  verified?: boolean
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
  difficulty: {
    mode: EQuizType
  }
  quiz: {
    quiz: IQuiz
    quizzes: IQuiz[]
  }
  questions: {
    questionsRedux: IQuestion[]
    status: string
    index: number
    currentQuestion: {
      id?: string
      question?: string
      options?: any[]
      correctAnswer?: boolean
      temp?: {
        correctAnswer: boolean
        incorrectAnswers: boolean[]
      }
    }
    answer: string | null
    points: number
    highscores: IHighscore
    secondsRemaining: number
    finalSeconds: number
  }
  users: IUser[]

  auth: {
    user: IUser
    isAuthenticated: boolean
    isLoading: boolean
    token: string
  }
  todos: ITodos
}

export enum ELogin {
  en = 'Log In',
  es = 'Iniciar sesión',
  fr = "S'identifier",
  de = 'Einloggen',
  pt = 'Entrar',
  cs = 'Přihlásit se',
  fi = 'Kirjaudu sisään',
}
export enum ELogout {
  en = 'Log Out',
  es = 'Cerrar sesión',
  fr = 'Se déconnecter',
  de = 'Ausloggen',
  pt = 'Sair',
  cs = 'Odhlásit se',
  fi = 'Kirjaudu ulos',
}
export enum ERegister {
  en = 'Register',
  es = 'Registrarse',
  fr = "S'inscrire",
  de = 'Registrieren',
  pt = 'Registo',
  cs = 'Registrovat',
  fi = 'Rekisteröidy',
}
export enum ERegistration {
  en = 'Registration',
  es = 'Registro',
  fr = 'Inscription',
  de = 'Registrierung',
  pt = 'Registro',
  cs = 'Registrace',
  fi = 'Rekisteröinti',
}
export enum EForgotPassword {
  en = 'Forgot Password?',
  es = '¿Olvidaste tu contraseña?',
  fr = 'Mot de passe oublié?',
  de = 'Passwort vergessen?',
  pt = 'Esqueceu a senha?',
  cs = 'Zapomněli jste heslo?',
  fi = 'Unohtuiko salasana?',
}
export enum ESendResetLink {
  en = 'Send Reset Link',
  es = 'Enviar enlace de restablecimiento',
  fr = 'Envoyer le lien de réinitialisation',
  de = 'Link zum Zurücksetzen senden',
  pt = 'Enviar link de redefinição',
  cs = 'Odeslat odkaz na obnovení',
  fi = 'Lähetä nollauslinkki',
}
export enum EEmail {
  en = 'Email',
  es = 'Correo electrónico',
  fr = 'Email',
  de = 'Email',
  pt = 'O email',
  cs = 'E-mailem',
  fi = 'Sähköposti',
}
export enum ENickname {
  en = 'Nickname',
  es = 'Apodo',
  fr = 'Surnom',
  de = 'Spitzname',
  pt = 'Apelido',
  cs = 'Přezdívka',
  fi = 'Nimimerkki',
}
export enum EPassword {
  en = 'Password',
  es = 'Contraseña',
  fr = 'Mot de passe',
  de = 'Passwort',
  pt = 'Senha',
  cs = 'Heslo',
  fi = 'Salasana',
}
export enum EConfirmPassword {
  en = 'Confirm Password',
  es = 'Confirmar contraseña',
  fr = 'Confirmez le mot de passe',
  de = 'Passwort bestätigen',
  pt = 'Confirme a Senha',
  cs = 'Potvrďte heslo',
  fi = 'Vahvista salasana',
}
export enum ERegistrationSuccesful {
  en = 'Registration successful',
  es = 'Registro exitoso',
  fr = 'Inscription réussie',
  de = 'Registrierung erfolgreich',
  pt = 'Registro bem sucedido',
  cs = 'Registrace úspěšná',
  fi = 'Rekisteröinti onnistui',
}
export enum EPleaseCheckYourEmailForYourVerificationLink {
  en = 'Please check your email for your verification link',
  es = 'Por favor revise su correo electrónico para obtener su enlace de verificación',
  fr = 'Veuillez vérifier votre e-mail pour votre lien de vérification',
  de = 'Bitte überprüfen Sie Ihre E-Mail auf Ihren Bestätigungslink',
  pt = 'Verifique seu e-mail para o link de verificação',
  cs = 'Zkontrolujte svůj e-mail na ověřovací odkaz',
  fi = 'Tarkista sähköpostisi löytääksesi sinne lähetetyn vahvistuslinkin',
}

export enum EError {
  en = 'Error',
  es = 'Error',
  fr = 'Erreur',
  de = 'Error',
  pt = 'Erro',
  cs = 'Chyba',
  fi = 'Virhe',
}
export enum ELoggingIn {
  en = 'Logging in...',
  es = 'Iniciando sesión...',
  fr = 'Connexion en cours...',
  de = 'Anmeldung...',
  pt = 'Entrando...',
  cs = 'Přihlašování...',
  fi = 'Kirjaudutaan...',
}
export enum ESendingEmail {
  en = 'Sending email...',
  es = 'Enviando correo electrónico...',
  fr = "Envoi d'email...",
  de = 'E-Mail senden...',
  pt = 'Enviando email...',
  cs = 'Odesílání e-mailu...',
  fi = 'Lähetetään sähköpostia...',
}
export enum EEmailSent {
  en = 'Email sent',
  es = 'Correo electrónico enviado',
  fr = 'Email envoyé',
  de = 'E-Mail gesendet',
  pt = 'Email enviado',
  cs = 'E-mail odeslán',
  fi = 'Sähköposti lähetetty',
}
export enum EPleaseGiveValidEmail {
  en = 'Please give valid email',
  es = 'Por favor, dé un correo electrónico válido',
  fr = 'Veuillez donner un email valide',
  de = 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  pt = 'Por favor, dê um email válido',
  cs = 'Zadejte platný e-mail',
  fi = 'Anna kelvollinen sähköpostiosoite',
}
export enum EPasswordsDoNotMatch {
  en = 'Passwords do not match',
  es = 'Las contraseñas no coinciden',
  fr = 'Les mots de passe ne correspondent pas',
  de = 'Passwörter stimmen nicht überein',
  pt = 'As senhas não coincidem',
  cs = 'Hesla se neshodují',
  fi = 'Salasanat eivät täsmää',
}
export type EGeneric<T> = {
  [key in keyof T]: T[key]
}
export enum ELanguages {
  English = 'en',
  Suomi = 'fi',
  Español = 'es',
  Français = 'fr',
  Deutch = 'de',
  Português = 'pt',
  Čeština = 'cs',
}

// export const ELanguages = {
//   English: 'en',
//   Español: 'es',
//   Français: 'fr',
//   Deutch: 'de',
//   Português: 'pt',
//   Čeština: 'cs',
//   Suomi: 'fi',
// }
// export interface ILanguages {
//   English: string
//   Español: string
//   Français: string
//   Deutch: string
//   Português: string
//   Čeština: string
//   Suomi: string
// }
export enum ELanguagesLong {
  en = 'English',
  es = 'Español',
  fr = 'Français',
  de = 'Deutch',
  pt = 'Português',
  cs = 'Čeština',
  fi = 'Suomi',
}
export const LanguageOfLanguage: TLanguageOfLanguage = {
  en: {
    English: 'English',
    Español: 'Spanish',
    Français: 'French',
    Deutch: 'German',
    Português: 'Portuguese',
    Čeština: 'Czech',
    Suomi: 'Finnish',
  },
  es: {
    English: 'Inglés',
    Español: 'Español',
    Français: 'Francés',
    Deutch: 'Alemán',
    Português: 'Portugués',
    Čeština: 'Checo',
    Suomi: 'Finlandés',
  },
  fr: {
    English: 'Anglais',
    Español: 'Espagnol',
    Français: 'Français',
    Deutch: 'Allemand',
    Português: 'Portugais',
    Čeština: 'Tchèque',
    Suomi: 'Finnois',
  },
  de: {
    English: 'Englisch',
    Español: 'Spanisch',
    Français: 'Französisch',
    Deutch: 'Deutsch',
    Português: 'Portugiesisch',
    Čeština: 'Tschechisch',
    Suomi: 'Finnisch',
  },
  pt: {
    English: 'Inglês',
    Español: 'Espanhol',
    Français: 'Francês',
    Deutch: 'Alemão',
    Português: 'Português',
    Čeština: 'Tcheco',
    Suomi: 'Finlandês',
  },
  cs: {
    English: 'Angličtina',
    Español: 'Španělština',
    Français: 'Francouzština',
    Deutch: 'Němčina',
    Português: 'Portugalština',
    Čeština: 'Čeština',
    Suomi: 'Finština',
  },
  fi: {
    English: 'Englanti',
    Español: 'Espanja',
    Français: 'Ranska',
    Deutch: 'Saksa',
    Português: 'Portugali',
    Čeština: 'Tšekki',
    Suomi: 'Suomi',
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
    Suomi: 'Finnish'
  }
  es: {
    English: 'Inglés'
    Español: 'Español'
    Français: 'Francés'
    Deutch: 'Alemán'
    Português: 'Portugués'
    Čeština: 'Checo'
    Suomi: 'Finlandés'
  }
  fr: {
    English: 'Anglais'
    Español: 'Espagnol'
    Français: 'Français'
    Deutch: 'Allemand'
    Português: 'Portugais'
    Čeština: 'Tchèque'
    Suomi: 'Finnois'
  }
  de: {
    English: 'Englisch'
    Español: 'Spanisch'
    Français: 'Französisch'
    Deutch: 'Deutsch'
    Português: 'Portugiesisch'
    Čeština: 'Tschechisch'
    Suomi: 'Finnisch'
  }
  pt: {
    English: 'Inglês'
    Español: 'Espanhol'
    Français: 'Francês'
    Deutch: 'Alemão'
    Português: 'Português'
    Čeština: 'Tcheco'
    Suomi: 'Finlandês'
  }
  cs: {
    English: 'Angličtina'
    Español: 'Španělština'
    Français: 'Francouzština'
    Deutch: 'Němčina'
    Português: 'Portugalština'
    Čeština: 'Čeština'
    Suomi: 'Finština'
  }
  fi: {
    English: 'Englanti'
    Español: 'Espanja'
    Français: 'Ranska'
    Deutch: 'Saksa'
    Português: 'Portugali'
    Čeština: 'Tšekki'
    Suomi: 'Suomi'
  }
}

export enum ELanguageOfLanguage_en {
  English = 'English',
  Español = 'Spanish',
  Français = 'French',
  Deutch = 'German',
  Português = 'Portuguese',
  Čeština = 'Czech',
  Suomi = 'Finnish',
}
export enum ELanguageOfLanguage_es {
  English = 'Inglés',
  Español = 'Español',
  Français = 'Francés',
  Deutch = 'Alemán',
  Português = 'Portugués',
  Čeština = 'Checo',
  Suomi = 'Finlandés',
}
export enum ELanguageOfLanguage_fr {
  English = 'Anglais',
  Español = 'Espagnol',
  Français = 'Français',
  Deutch = 'Allemand',
  Português = 'Portugais',
  Čeština = 'Tchèque',
  Suomi = 'Finnois',
}
export enum ELanguageOfLanguage_de {
  English = 'Englisch',
  Español = 'Spanisch',
  Français = 'Französisch',
  Deutch = 'Deutsch',
  Português = 'Portugiesisch',
  Čeština = 'Tschechisch',
  Suomi = 'Finnisch',
}
export enum ELanguageOfLanguage_pt {
  English = 'Inglês',
  Español = 'Espanhol',
  Français = 'Francês',
  Deutch = 'Alemão',
  Português = 'Português',
  Čeština = 'Tcheco',
  Suomi = 'Finlandês',
}
export enum ELanguageOfLanguage_cs {
  English = 'Angličtina',
  Español = 'Španělština',
  Français = 'Francouzština',
  Deutch = 'Němčina',
  Português = 'Portugalština',
  Čeština = 'Čeština',
  Suomi = 'Finština',
}
export enum ELanguageOfLanguage_fi {
  English = 'Englanti',
  Español = 'Espanja',
  Français = 'Ranska',
  Deutch = 'Saksa',
  Português = 'Portugali',
  Čeština = 'Tšekki',
  Suomi = 'Suomi',
}
export type ELanguageOfLanguage = {
  en: ELanguageOfLanguage_en
  es: ELanguageOfLanguage_es
  fr: ELanguageOfLanguage_fr
  de: ELanguageOfLanguage_de
  pt: ELanguageOfLanguage_pt
  cs: ELanguageOfLanguage_cs
  fi: ELanguageOfLanguage_fi
}

export enum ELanguageTitle {
  en = 'Language',
  es = 'Idioma',
  fr = 'Langue',
  de = 'Sprache',
  pt = 'Língua',
  cs = 'Jazyk',
  fi = 'Kieli',
}
export enum ESelectLanguage {
  en = 'Select Language',
  es = 'Seleccionar idioma',
  fr = 'Sélectionnez la langue',
  de = 'Sprache auswählen',
  pt = 'Selecione o idioma',
  cs = 'Vyberte jazyk',
  fi = 'Valitse kieli',
}
export enum EFilter {
  en = 'Filter',
  es = 'Filtrar',
  fr = 'Filtre',
  de = 'Filter',
  pt = 'Filtro',
  cs = 'Filtr',
  fi = 'Suodatin',
}
export enum EFilterByLanguage {
  en = 'Filter by language',
  es = 'Filtrar por idioma',
  fr = 'Filtrer par langue',
  de = 'Nach Sprache filtern',
  pt = 'Filtrar por idioma',
  cs = 'Filtrovat podle jazyka',
  fi = 'Suodata kielen mukaan',
}
export enum EFilterByCategory {
  en = 'Filter by category',
  es = 'Filtrar por categoría',
  fr = 'Filtrer par catégorie',
  de = 'Nach Kategorie filtern',
  pt = 'Filtrar por categoria',
  cs = 'Filtrovat podle kategorie',
  fi = 'Suodata kategorian mukaan',
}
export enum ESend {
  en = 'Send',
  es = 'Enviar',
  fr = 'Envoyer',
  de = 'Senden',
  pt = 'Enviar',
  cs = 'Poslat',
  fi = 'Lähetä',
}
export enum ESave {
  en = 'Save',
  es = 'Guardar',
  fr = 'Sauvegarder',
  de = 'Speichern',
  pt = 'Salvar',
  cs = 'Uložit',
  fi = 'Tallenna',
}
export enum EEdit {
  en = 'Edit',
  es = 'Editar',
  fr = 'Modifier',
  de = 'Bearbeiten',
  pt = 'Editar',
  cs = 'Upravit',
  fi = 'Muokkaa',
}
export enum EClose {
  en = 'Close',
  es = 'Cerrar',
  fr = 'Fermer',
  de = 'Schließen',
  pt = 'Fechar',
  cs = 'Zavřít',
  fi = 'Sulje',
}
export enum ECurrentPassword {
  en = 'Current Password',
  es = 'Contraseña actual',
  fr = 'Mot de passe actuel',
  de = 'Aktuelles Passwort',
  pt = 'Senha atual',
  cs = 'Aktuální heslo',
  fi = 'Nykyinen salasana',
}
export enum ELoggedInAs {
  en = 'Logged in as',
  es = 'Conectado como',
  fr = 'Connecté en tant que',
  de = 'Angemeldet als',
  pt = 'Conectado como',
  cs = 'Přihlášen jako',
  fi = 'Kirjautuneena tunnuksella',
}
export enum ESearch {
  en = 'Search',
  es = 'Buscar',
  fr = 'Chercher',
  de = 'Suche',
  pt = 'Pesquisar',
  cs = 'Vyhledávání',
  fi = 'Hae',
}
export enum ETryTappingTheShapes {
  en = 'Try tapping the shapes',
  es = 'Intenta tocar las formas',
  fr = 'Essayez de toucher les formes',
  de = 'Versuchen Sie, die Formen zu berühren',
  pt = 'Tente tocar as formas',
  cs = 'Zkuste klepnout na tvary',
  fi = 'Kokeile klikata elementtejä',
}
export enum EReset {
  en = 'Reset',
  es = 'Reiniciar',
  fr = 'Réinitialiser',
  de = 'Zurücksetzen',
  pt = 'Redefinir',
  cs = 'Resetovat',
  fi = 'Nollaa',
}
export enum EUsername {
  en = 'Username',
  es = 'Nombre de usuario',
  fr = "Nom d'utilisateur",
  de = 'Nutzername',
  pt = 'Nome do usuário',
  cs = 'Uživatelské jméno',
  fi = 'Käyttäjätunnus',
}
export enum EUsernameIsTheSame {
  en = 'Username is the same as before',
  es = 'El nombre de usuario es el mismo que antes',
  fr = "Le nom d'utilisateur est le même qu'avant",
  de = 'Der Benutzername ist der gleiche wie zuvor',
  pt = 'O nome de usuário é o mesmo de antes',
  cs = 'Uživatelské jméno je stejné jako dříve',
  fi = 'Käyttäjätunnus on sama kuin aiemmin',
}
export enum ECurrentNickname {
  en = 'Current Nickname',
  es = 'Apodo actual',
  fr = 'Surnom actuel',
  de = 'Aktueller Spitzname',
  pt = 'Apelido atual',
  cs = 'Aktuální přezdívka',
  fi = 'Nykyinen nimimerkki',
}
export enum ESelectAnOption {
  en = 'Select an option',
  es = 'Seleccione una opción',
  fr = 'Sélectionnez une option',
  de = 'Wählen Sie eine Option',
  pt = 'Selecione uma opção',
  cs = 'Vyberte možnost',
  fi = 'Valitse',
}
export enum EFeatures {
  en = 'Features',
  es = 'Caracteristicas',
  fr = 'Traits',
  de = 'Eigenschaften',
  pt = 'Características',
  cs = 'Vlastnosti',
  fi = 'Ominaisuudet',
}
export enum EAppTranslatedTo {
  en = 'App translated to',
  es = 'Aplicación traducida a',
  fr = 'Application traduite en',
  de = 'App übersetzt nach',
  pt = 'Aplicativo traduzido para',
  cs = 'Aplikace přeložena do',
  fi = 'Sovellus käännetty',
}
export enum ESubmit {
  en = 'Submit',
  es = 'Enviar',
  fr = 'Soumettre',
  de = 'Einreichen',
  pt = 'Enviar',
  cs = 'Odeslat',
  fi = 'Lähetä',
}
export enum EDelete {
  en = 'Delete',
  es = 'Eliminar',
  fr = 'Supprimer',
  de = 'Löschen',
  pt = 'Excluir',
  cs = 'Odstranit',
  fi = 'Poista',
}
export enum EOnOff {
  en = 'On/Off',
  es = 'Encendido/Apagado',
  fr = 'Activé/Désactivé',
  de = 'Ein/Aus',
  pt = 'Ligado/Desligado',
  cs = 'Zapnuto/Vypnuto',
  fi = 'Päällä/Pois',
}
export enum EWarning {
  en = 'Warning',
  es = 'Advertencia',
  fr = 'Attention',
  de = 'Warnung',
  pt = 'Aviso',
  cs = 'Varování',
  fi = 'Varoitus',
}
export enum EExitToMainSite {
  en = 'Exit to Main Site',
  es = 'Salir al sitio principal',
  fr = 'Quitter le site principal',
  de = 'Zum Hauptstandort wechseln',
  pt = 'Sair para o site principal',
  cs = 'Ukončit na hlavní stránku',
  fi = 'Poistu pääsivulle',
}
export enum EApp {
  en = 'App',
  es = 'Aplicación',
  fr = 'Application',
  de = 'Anwendung',
  pt = 'Aplicativo',
  cs = 'Aplikace',
  fi = 'Sovellus',
}
export enum EWelcome {
  en = 'Welcome',
  es = 'Bienvenido',
  fr = 'Bienvenue',
  de = 'Willkommen',
  pt = 'Bem-vinda',
  cs = 'Vítejte',
  fi = 'Tervetuloa',
}
export enum EToTheReactSiteOfJenniinaFi {
  en = 'to the React site of jenniina.fi',
  es = 'al sitio React de jenniina.fi',
  fr = 'sur le site React de jenniina.fi',
  de = 'auf der React-Website von jenniina.fi',
  pt = 'ao site React da jenniina.fi',
  cs = 'na React webu jenniina.fi',
  fi = 'jenniina.fi:n React-sivustolle',
}
export enum EUserEdit {
  en = 'User Edit',
  es = 'Editar Usuario',
  fr = "Modifier l'utilisateur",
  de = 'Benutzer bearbeiten',
  pt = 'Editar Usuário',
  cs = 'Upravit Uživatele',
  fi = 'Muokkaa käyttäjätietoja',
}
export enum EAbout {
  en = 'About',
  es = 'Acerca de',
  fr = 'À propos de',
  de = 'Über',
  pt = 'Sobre',
  cs = 'O',
  fi = 'Sivustosta',
}
export enum EAboutThisSite {
  en = 'This is a sub-site of jenniina.fi made with and focusing on ReactJS. Other porfolio items may be found at the portfolio section of the main site.',
  es = 'Este es un sub-sitio de jenniina.fi hecho con y enfocado en ReactJS. Otros elementos de cartera se pueden encontrar en la sección de cartera del sitio principal.',
  fr = "Ceci est un sous-site de jenniina.fi fait avec et axé sur ReactJS. D'autres éléments de portefeuille peuvent être trouvés dans la section portefeuille du site principal.",
  de = 'Dies ist eine Unterseite von jenniina.fi, die mit ReactJS erstellt und darauf fokussiert wurde. Weitere Portfolio-Elemente finden Sie im Portfolio-Bereich der Hauptseite.',
  pt = 'Este é um sub-site da jenniina.fi feito com e focado em ReactJS. Outros itens de portfólio podem ser encontrados na seção de portfólio do site principal.',
  cs = 'Toto je sub-site jenniina.fi vyrobený s důrazem na ReactJS. Další položky portfolia najdete v sekci portfolia hlavního webu.',
  fi = 'Tämä on jenniina.fi:n alisivusto, joka on tehty ReactJS:llä ja keskittyy siihen. Muita aiheita löytyy pääsivuston portfoliosta.',
}
export enum EThisSite {
  en = 'this site',
  es = 'este sitio',
  fr = 'ce site',
  de = 'diese Seite',
  pt = 'este site',
  cs = 'tento web',
  fi = 'tämä sivusto',
}
export enum EGithubRepository {
  en = 'Github Repository',
  es = 'Repositorio Github',
  fr = 'Dépôt Github',
  de = 'Github Repository',
  pt = 'Repositório Github',
  cs = 'Github Repository',
  fi = 'Github repositorio',
}
export enum EFeaturesOfThisSite {
  en = 'Features of this site',
  es = 'Características de este sitio',
  fr = 'Fonctionnalités de ce site',
  de = 'Funktionen dieser Seite',
  pt = 'Recursos deste site',
  cs = 'Funkce tohoto webu',
  fi = 'Tämän sivuston ominaisuudet',
}
export enum EContact {
  en = 'Contact',
  es = 'Contacto',
  fr = 'Contact',
  de = 'Kontakt',
  pt = 'Contato',
  cs = 'Kontakt',
  fi = 'Yhteys',
}
export enum ELetsCollaborate {
  en = "Let's collaborate",
  es = 'Colaboremos',
  fr = 'Collaborons',
  de = 'Lass uns zusammenarbeiten',
  pt = 'Vamos colaborar',
  cs = 'Spolupracujme',
  fi = 'Tehdään yhteistyötä',
}
export enum ESettings {
  en = 'Settings',
  es = 'Configuraciones',
  fr = 'Paramètres',
  de = 'Einstellungen',
  pt = 'Configurações',
  cs = 'Nastavení',
  fi = 'Asetukset',
}
export enum ESiteSettings {
  en = 'Site Settings',
  es = 'Configuraciones del sitio',
  fr = 'Paramètres du site',
  de = 'Website-Einstellungen',
  pt = 'Configurações do site',
  cs = 'Nastavení webu',
  fi = 'Sivuston asetukset',
}
export enum ESeeSettingsAtMenuBar {
  en = 'See Settings at menu bar',
  es = 'Ver Configuraciones en la barra de menú',
  fr = 'Voir les paramètres dans la barre de menu',
  de = 'Siehe Einstellungen in der Menüleiste',
  pt = 'Ver Configurações na barra de menu',
  cs = 'Zobrazit nastavení v nabídce',
  fi = 'Katso asetukset valikkopalkista',
}
export enum EIcon {
  en = 'Icon',
  es = 'Icono',
  fr = 'Icône',
  de = 'Symbol',
  pt = 'Ícone',
  cs = 'Ikona',
  fi = 'Kuvake',
}
export enum ELanguageSelect {
  en = 'Language Select',
  es = 'Selección de idioma',
  fr = 'Sélection de langue',
  de = 'Sprachauswahl',
  pt = 'Seleção de idioma',
  cs = 'Výběr jazyka',
  fi = 'Kielen valinta',
}
export enum ELightDarkModeButton {
  en = 'Light/Dark mode button',
  es = 'Botón de modo claro/oscuro',
  fr = 'Bouton Light/Dark mode',
  de = 'Light/Dark mode button',
  pt = 'Botão Light/Dark mode',
  cs = 'Tlačítko Light/Dark mode',
  fi = 'Vaalea-/Tummatilan painike',
}
export enum EFourStylesAltogether {
  en = 'Four styles altogether',
  es = 'Cuatro estilos en total',
  fr = 'Quatre styles au total',
  de = 'Vier Stile insgesamt',
  pt = 'Quatro estilos no total',
  cs = 'Celkem čtyři styly',
  fi = 'Neljä tyyliä yhteensä',
}
export enum ELogInAndRegisterButtons {
  en = 'Log In and Register buttons',
  es = 'Botones de inicio de sesión y registro',
  fr = "Boutons de connexion et d'inscription",
  de = 'Anmelde- und Registrierungsschaltflächen',
  pt = 'Botões de login e registro',
  cs = 'Tlačítka Přihlásit a Registrovat',
  fi = 'Sisäänkirjautumis- ja rekisteröintipainikkeet',
}
export enum EReplacedByUserEditAndLogoutButtonsWhenLoggedIn {
  en = 'Replaced by User Edit and Logout buttons when logged in',
  es = 'Reemplazado por los botones de edición de usuario y cierre de sesión cuando se inicia la sesión',
  fr = "Remplacé par les boutons d'édition utilisateur et de déconnexion lors de la connexion",
  de = 'Wird durch die Schaltflächen Benutzer bearbeiten und Abmelden ersetzt, wenn Sie angemeldet sind',
  pt = 'Substituído pelos botões de edição de usuário e logout quando conectado',
  cs = 'Při přihlášení nahrazeno tlačítky Upravit uživatele a Odhlásit',
  fi = 'Korvataan käyttäjän muokkaus- ja kirjautumispainikkeilla, kun olet kirjautunut sisään',
}

export enum EButtonToToggleBetweenNavigationStyles {
  en = 'Button to toggle between navigation styles',
  es = 'Botón para alternar entre estilos de navegación',
  fr = 'Bouton pour basculer entre les styles de navigation',
  de = 'Schaltfläche zum Umschalten zwischen Navigationsstilen',
  pt = 'Botão para alternar entre estilos de navegação',
  cs = 'Tlačítko pro přepínání mezi styly navigace',
  fi = 'Painike vaihtaa navigointityylejä',
}
export enum ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize {
  en = 'Two styles at small screen size and two at large screen size',
  es = 'Dos estilos en tamaño de pantalla pequeña y dos en tamaño de pantalla grande',
  fr = 'Deux styles en petit écran et deux en grand écran',
  de = 'Zwei Stile bei kleiner Bildschirmgröße und zwei bei großer Bildschirmgröße',
  pt = 'Dois estilos em tamanho de tela pequena e dois em tamanho de tela grande',
  cs = 'Dva styly v malé velikosti obrazovky a dva ve velké velikosti obrazovky',
  fi = 'Kaksi tyyliä pienellä näytön koolla ja kaksi suurella näytön koolla',
}
export enum EHeroSection {
  en = 'Hero/Intro section',
  es = 'Sección de introducción',
  fr = "Section d'introduction",
  de = 'Einführungsabschnitt',
  pt = 'Seção de introdução',
  cs = 'Úvodní sekce',
  fi = 'Hero/Intro-osio',
}
export enum EInteractiveElements {
  en = 'Interactive elements',
  es = 'Elementos interactivos',
  fr = 'Éléments interactifs',
  de = 'Interaktive Elemente',
  pt = 'Elementos interativos',
  cs = 'Interaktivní prvky',
  fi = 'Vuorovaikutteiset elementit',
}
export enum EBubbles {
  en = 'Bubbles',
  es = 'Burbujas',
  fr = 'Bulles',
  de = 'Blasen',
  pt = 'Bolhas',
  cs = 'Bubliny',
  fi = 'Kuplat',
}
export enum ESeeTheTopOfTheCurrentPage {
  en = 'See the top of the current page',
  es = 'Ver la parte superior de la página actual',
  fr = 'Voir le haut de la page actuelle',
  de = 'Siehe die Spitze der aktuellen Seite',
  pt = 'Veja o topo da página atual',
  cs = 'Zobrazit vrchol aktuální stránky',
  fi = 'Katso nykyisen sivun yläosa',
}
export enum EHoverFocusAnimation {
  en = 'Hover/focus animation',
  es = 'Animación de desplazamiento/foco',
  fr = 'Animation de survol/focus',
  de = 'Hover/focus animation',
  pt = 'Animação de foco de foco',
  cs = 'Animace přejetí/focus',
  fi = 'Hover/focus-animaatio',
}
export enum ERemoveWithClickOrEnterWhenFocused {
  en = 'Remove with click or Enter when focused',
  es = 'Eliminar con clic o Enter cuando está enfocado',
  fr = 'Supprimer avec un clic ou Entrée lorsque vous êtes concentré',
  de = 'Mit Klick oder Eingabe entfernen, wenn der Fokus liegt',
  pt = 'Remova com clique ou Enter quando estiver focado',
  cs = 'Odstraňte kliknutím nebo stisknutím klávesy Enter, když je zaměřen',
  fi = 'Poista napsauttamalla tai painamalla Enter, kun kohteessa on kohdistus (focus)',
}
export enum EPointerEnterDirectionAwareMovement {
  en = 'Pointer-enter direction aware movement',
  es = 'Movimiento consciente de la dirección de entrada del puntero',
  fr = "Mouvement conscient de la direction d'entrée du pointeur",
  de = 'Pointer-enter Richtungsbewegung',
  pt = 'Movimento consciente da direção de entrada do ponteiro',
  cs = 'Pohyb vědomý směru vstupu ukazatele',
  fi = 'Osoittimen lähestymissuunnan mukainen liike',
}
export enum EKeyboardFocusMoveItemsWithArrowKeys {
  en = 'Keyboard focus: move items with arrow keys',
  es = 'Enfoque del teclado: mueva los elementos con las teclas de flecha',
  fr = 'Focus clavier: déplacez les éléments avec les touches fléchées',
  de = 'Tastaturfokus: Bewegen Sie Elemente mit den Pfeiltasten',
  pt = 'Foco do teclado: mova itens com as teclas de seta',
  cs = 'Klávesnice: přesuňte položky pomocí šipek',
  fi = 'Näppäimistökäyttö: siirrä tab-painikkeella kohteeseen siirryttyä nuolinäppäimillä kohdetta',
}
export enum EGeometricShapes {
  en = 'Geometric shapes',
  es = 'Formas geométricas',
  fr = 'Formes géométriques',
  de = 'Geometrische Formen',
  pt = 'Formas geométricas',
  cs = 'Geometrické tvary',
  fi = 'Geometriset muodot',
}
export enum EElements {
  en = 'Elements',
  es = 'Elementos',
  fr = 'Éléments',
  de = 'Elemente',
  pt = 'Elementos',
  cs = 'Prvky',
  fi = 'Elementit',
}
export enum EElementsRotateToFaceCursor {
  en = 'Elements rotate to face cursor',
  es = 'Los elementos giran para enfrentar el cursor',
  fr = 'Les éléments tournent pour faire face au curseur',
  de = 'Elemente drehen sich, um dem Cursor gegenüberzustehen',
  pt = 'Elementos giram para enfrentar o cursor',
  cs = 'Prvky se otáčejí, aby čelily kurzoru',
  fi = 'Elementit kääntyvät kohti osoitinta',
}
export enum EMovementAccordingToPointerEnterDirection {
  en = "Movement according to pointer's enter direction",
  es = 'Movimiento según la dirección de entrada del puntero',
  fr = "Mouvement selon la direction d'entrée du pointeur",
  de = 'Bewegung entsprechend der Eingaberichtung des Zeigers',
  pt = 'Movimento de acordo com a direção de entrada do ponteiro',
  cs = 'Pohyb podle směru vstupu ukazatele',
  fi = 'Liike osoittimen lähestymissuunnan mukaan',
}
export enum EPortfolio {
  en = 'Portfolio',
  es = 'Portafolio',
  fr = 'Portfolio',
  de = 'Portfolio',
  pt = 'Portfólio',
  cs = 'Portfolio',
  fi = 'Portfolio',
}
export enum EQuiz {
  en = 'Quiz',
  es = 'Cuestionario',
  fr = 'Quiz',
  de = 'Quiz',
  pt = 'Questionário',
  cs = 'Kvíz',
  fi = 'Tietovisa',
}
export enum EQuizApp {
  en = 'Quiz App',
  es = 'Aplicación de cuestionario',
  fr = 'Application de quiz',
  de = 'Quiz-App',
  pt = 'Aplicativo de questionário',
  cs = 'Aplikace kvízu',
  fi = 'Tietovisa-sovellus',
}
export enum ETestYourKnowledge {
  en = 'Test your knowledge',
  es = 'Prueba tu conocimiento',
  fr = 'Testez vos connaissances',
  de = 'Testen Sie Ihr Wissen',
  pt = 'Teste seu conhecimento',
  cs = 'Otestujte své znalosti',
  fi = 'Testaa tietosi',
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
export enum EToDo {
  en = 'Todo',
  es = 'Por hacer',
  fr = 'À faire',
  de = 'Zu tun',
  pt = 'A fazer',
  cs = 'Udělat',
  fi = 'Tehtävälista',
}
export enum EBlob {
  en = 'Blob',
  es = 'Bolita',
  fr = 'Boule',
  de = 'Kugel',
  pt = 'Bola',
  cs = 'Koule',
  fi = 'Blob/möhkäle',
}
export enum EBlobs {
  en = 'Blobs',
  es = 'Bolitas',
  fr = 'Boules',
  de = 'Kugeln',
  pt = 'Bolas',
  cs = 'Koule',
  fi = 'Blobs/möhkäleet',
}
export enum EBlobApp {
  en = 'Blob App',
  es = 'Aplicación de bolitas',
  fr = 'Application de boules',
  de = 'Kugel-App',
  pt = 'Aplicativo de bola',
  cs = 'Aplikace Blob',
  fi = 'Blob/möhkäle-sovellus',
}
export enum EBlobAppSlogan {
  en = 'Make blob art your thing',
  es = 'Haz que el arte de las bolitas sea lo tuyo',
  fr = "Faites de l'art blob votre truc",
  de = 'Machen Sie Blob Art zu Ihrem Ding',
  pt = 'Faça da arte de blob sua coisa',
  cs = 'Udělejte z blob art svou věc',
  fi = 'Tee möhkäletaiteesta juttusi',
}
export enum EDraggable {
  en = 'Draggable',
  es = 'Arrastrable',
  fr = 'Déplaçable',
  de = 'Verschiebbar',
  pt = 'Arrastável',
  cs = 'Přetahovatelný',
  fi = 'Raahattava',
}
export enum EDraggableBlobs {
  en = 'Draggable blobs',
  es = 'Bolitas arrastrables',
  fr = 'Boules déplaçables',
  de = 'Verschiebbare Kugeln',
  pt = 'Bolas arrastáveis',
  cs = 'Přetahovatelné koule',
  fi = 'Raahattavat möhkäleet',
}
export enum EDragAndDrop {
  en = 'Drag and Drop',
  es = 'Arrastrar y Soltar',
  fr = 'Glisser Déposer',
  de = 'Ziehen und Ablegen',
  pt = 'Arrastar e Soltar',
  cs = 'Táhnout a Pustit',
  fi = 'Raahaa kohteeseen',
}
export enum ECustomSelect {
  en = 'Custom Select',
  es = 'Selección Personalizada',
  fr = 'Sélection Personnalisée',
  de = 'Benutzerdefinierte Auswahl',
  pt = 'Seleção Personalizada',
  cs = 'Vlastní Výběr',
  fi = 'Räätälöitävä select',
}
export enum EMultistepForm {
  en = 'Multistep Form',
  es = 'Formulario Multietapa',
  fr = 'Formulaire Multistep',
  de = 'Mehrstufiges Formular',
  pt = 'Formulário Multistep',
  cs = 'Vícekrokový Formulář',
  fi = 'Monivaiheinen lomake',
}
export enum ELightMode {
  en = 'Light Mode',
  es = 'Modo Claro',
  fr = 'Mode Lumière',
  de = 'Lichtmodus',
  pt = 'Modo Claro',
  cs = 'Světlý Režim',
  fi = 'Vaalea tila',
}
export enum EDarkMode {
  en = 'Dark Mode',
  es = 'Modo Oscuro',
  fr = 'Mode Sombre',
  de = 'Dunkler Modus',
  pt = 'Modo Escuro',
  cs = 'Tmavý Režim',
  fi = 'Tumma tila',
}
export enum ENavStyle {
  en = 'Nav Style',
  es = 'Nav Estilo',
  fr = 'Nav Style',
  de = 'Nav Stil',
  pt = 'Nav Estilo',
  cs = 'Nav Styl',
  fi = 'Navigointityyli',
}
export enum EMenu {
  en = 'Menu',
  es = 'Menú',
  fr = 'Menu',
  de = 'Menü',
  pt = 'Menu',
  cs = 'Menu',
  fi = 'Valikko',
}
export enum EScrollToTheLeft {
  en = 'Scroll to the left',
  es = 'Desplázate hacia la izquierda',
  fr = 'Faites défiler vers la gauche',
  de = 'Nach links scrollen',
  pt = 'Role para a esquerda',
  cs = 'Posuňte se doleva',
  fi = 'Vieritä vasemmalle',
}
export enum EScrollToTheRight {
  en = 'Scroll to the right',
  es = 'Desplázate hacia la derecha',
  fr = 'Faites défiler vers la droite',
  de = 'Nach rechts scrollen',
  pt = 'Role para a direita',
  cs = 'Posuňte se doprava',
  fi = 'Vieritä oikealle',
}
export enum EScrollToTheTop {
  en = 'Scroll to the top',
  es = 'Desplázate hacia arriba',
  fr = 'Faites défiler vers le haut',
  de = 'Nach oben scrollen',
  pt = 'Role para o topo',
  cs = 'Posuňte se nahoru',
  fi = 'Vieritä takaisin ylös',
}
export enum ESkipToMainNavigation {
  en = 'Skip to main navigation',
  es = 'Saltar a la navegación principal',
  fr = 'Passer à la navigation principale',
  de = 'Zur Hauptnavigation springen',
  pt = 'Pular para a navegação principal',
  cs = 'Přejít na hlavní navigaci',
  fi = 'Siirry päävalikkoon',
}
export enum ESkipToMainContent {
  en = 'Skip to main content',
  es = 'Saltar al contenido principal',
  fr = 'Passer au contenu principal',
  de = 'Zum Hauptinhalt springen',
  pt = 'Pular para o conteúdo principal',
  cs = 'Přejít na hlavní obsah',
  fi = 'Siirry pääsisältöön',
}
export enum ESkipToFooter {
  en = 'Skip to footer',
  es = 'Saltar al pie de página',
  fr = 'Passer au pied de page',
  de = 'Zum Fußbereich springen',
  pt = 'Pular para o rodapé',
  cs = 'Přejít na zápatí',
  fi = 'Siirry alatunnisteeseen',
}

export enum EThisSiteFocusesOnReactApplications {
  en = 'This site focuses on React applications. Non-React porfolio items may be found at the portfolio section of the main site.',
  es = 'Este sitio se centra en aplicaciones React. Los elementos de cartera no React se pueden encontrar en la sección de cartera del sitio principal.',
  fr = 'Ce site se concentre sur les applications React. Les éléments de portefeuille non React se trouvent dans la section portefeuille du site principal.',
  de = 'Diese Seite konzentriert sich auf React-Anwendungen. Nicht-React-Porfolio-Elemente finden Sie im Portfolio-Bereich der Hauptseite.',
  pt = 'Este site se concentra em aplicativos React. Os itens de portfólio não React podem ser encontrados na seção de portfólio do site principal.',
  cs = 'Tato stránka se zaměřuje na aplikace React. Ne-React položky portfolia najdete v sekci portfolia hlavního webu.',
  fi = 'Tämä sivusto keskittyy React-sovelluksiin. Muita sovellusratkaisuja löytyy pääsivuston portfoliosta.',
}
export enum EMainSite {
  en = 'Main Site',
  es = 'Sitio Principal',
  fr = 'Site Principal',
  de = 'Hauptseite',
  pt = 'Site Principal',
  cs = 'Hlavní stránka',
  fi = 'Pääsivusto',
}
export enum EReactSpecificAppsMadeWithViteAndTypescript {
  en = 'React-specific apps made with Vite and Typescript. Each app is designed to be both pointer- and keyboard-accessible.',
  es = 'Aplicaciones específicas de React hechas con Vite y Typescript. Cada aplicación está diseñada para ser accesible tanto con puntero como con teclado.',
  fr = 'Applications spécifiques à React réalisées avec Vite et Typescript. Chaque application est conçue pour être accessible à la fois avec le pointeur et le clavier.',
  de = 'React-spezifische Apps mit Vite und Typescript. Jede App ist so konzipiert, dass sie sowohl mit dem Zeiger als auch mit der Tastatur zugänglich ist.',
  pt = 'Aplicativos específicos do React feitos com Vite e Typescript. Cada aplicativo é projetado para ser acessível tanto com o ponteiro quanto com o teclado.',
  cs = 'Aplikace specifické pro React vyrobené s Vite a Typescript. Každá aplikace je navržena tak, aby byla přístupná jak ukazovátkem, tak klávesnicí.',
  fi = 'React-sovelluksia (Vite ja Typescript). Jokainen sovellus on suunniteltu sekä osoittimella että näppäimistöllä käytettäväksi.',
}
export enum EDependencies {
  en = 'Dependencies',
  es = 'Dependencias',
  fr = 'Dépendances',
  de = 'Abhängigkeiten',
  pt = 'Dependências',
  cs = 'Závislosti',
  fi = 'Riippuvuudet',
}
export enum EQuizAppIntro {
  en = 'A quiz app with three difficulty levels, a timer, and a highscore list. The app uses the The Trivia API to fetch questions.',
  es = 'Una aplicación de cuestionario con tres niveles de dificultad, un temporizador y una lista de puntuaciones altas. La aplicación utiliza la API de la base de datos de preguntas abiertas para recuperar preguntas.',
  fr = "Une application de quiz avec trois niveaux de difficulté, une minuterie et une liste de scores élevés. L'application utilise l'API de la base de données de quiz ouverte pour récupérer des questions.",
  de = 'Eine Quiz-App mit drei Schwierigkeitsgraden, einem Timer und einer Highscore-Liste. Die App verwendet die Trivia API, um Fragen abzurufen.',
  pt = 'Um aplicativo de questionário com três níveis de dificuldade, um temporizador e uma lista de pontuações altas. O aplicativo usa a API do banco de dados de perguntas abertas para buscar perguntas.',
  cs = 'Aplikace kvízu se třemi obtížnostmi, časovačem a seznamem nejlepších výsledků. Aplikace používá API databáze otázek Trivia k získání otázek.',
  fi = 'Tietovisailu, jossa on kolme vaikeustasoa, ajastin ja kunkin vaikeustason piste-ennätysten lista. Sovellus käyttää The Trivia API:a kysymysten hakemiseen.',
}
export enum EJokesAppIntro {
  en = 'A joke app with customizable options that uses the JokeAPI to fetch jokes.',
  es = 'Una aplicación de chistes con opciones personalizables que utiliza JokeAPI para buscar chistes.',
  fr = 'Une application de blagues avec des options personnalisables qui utilise JokeAPI pour récupérer des blagues.',
  de = 'Eine Witze-App mit anpassbaren Optionen, die JokeAPI verwendet, um Witze abzurufen.',
  pt = 'Um aplicativo de piadas com opções personalizáveis que usa o JokeAPI para buscar piadas.',
  cs = 'Aplikace vtipů s možnostmi přizpůsobení, která používá JokeAPI k získání vtipů.',
  fi = 'Vitsisovellus, jossa on muokattavia vaihtoehtoja ja joka käyttää JokeAPI:a vitsien hakemiseen.',
}
export enum EBlobAppIntro {
  en = 'A custom draggables app with blobs that can be dragged around.',
  es = 'Una aplicación de arrastrables personalizada con bolitas que se pueden arrastrar',
  fr = 'Une application de glisser-déposer personnalisée avec des blobs qui peuvent être déplacés',
  de = 'Eine benutzerdefinierte Drag & Drop-App mit Blob, die verschoben werden können',
  pt = 'Um aplicativo de arrastar e soltar personalizado com blobs que podem ser arrastados',
  cs = 'Vlastní aplikace přetahovatelných prvků s bloby, které lze přetahovat',
  fi = 'Raahattavat-sovellus, joka sisältää raahattavia toisiinsa sulautuvia möhkäleitä',
}
export enum EDragAndDropAppIntro {
  en = 'A custom drag-and-drop app.',
  es = 'Una aplicación de arrastrar y soltar personalizada.',
  fr = 'Une application de glisser-déposer personnalisée.',
  de = 'Eine benutzerdefinierte Drag & Drop-App.',
  pt = 'Um aplicativo de arrastar e soltar personalizado.',
  cs = 'Vlastní aplikace přetahování a přetažení.',
  fi = 'Räätälöity raahattavat-sovellus (Drag and Drop).',
}
export enum ETodoAppIntro {
  en = 'A todo-app using localStorage and Mongo-DB when the user is logged in.',
  es = 'Una aplicación de tareas que utiliza localStorage y Mongo-DB cuando el usuario está conectado.',
  fr = "Une application todo utilisant localStorage et Mongo-DB lorsque l'utilisateur est connecté.",
  de = 'Eine Todo-App, die localStorage und Mongo-DB verwendet, wenn der Benutzer angemeldet ist.',
  pt = 'Um aplicativo de tarefas usando localStorage e Mongo-DB quando o usuário está conectado.',
  cs = 'Aplikace todo pomocí localStorage a Mongo-DB, když je uživatel přihlášen.',
  fi = 'Tehtävälista, joka käyttää localStoragea ja Mongo-DB:tä, kun käyttäjä on kirjautunut sisään.',
}
export enum ECustomSelectIntro {
  en = 'A custom select component that can be used as a single- or multiple-select alternative.',
  es = 'Un componente de selección personalizado que se puede utilizar como una alternativa de selección única o múltiple.',
  fr = 'Un composant de sélection personnalisé qui peut être utilisé comme une alternative de sélection unique ou multiple.',
  de = 'Ein benutzerdefiniertes Auswahlelement, das als Einzel- oder Mehrfachauswahlalternative verwendet werden kann.',
  pt = 'Um componente de seleção personalizado que pode ser usado como uma alternativa de seleção única ou múltipla.',
  cs = 'Vlastní výběrový prvek, který lze použít jako jednotlivý nebo vícevýběrový prvek.',
  fi = 'Räätälöitävä select-komponentin vaihtoehto: yksittäis- tai monivalinta.',
}
export enum EMultistepFormIntro {
  en = 'A three-step fully functional contact form.',
  es = 'Un formulario de contacto totalmente funcional de tres pasos.',
  fr = 'Un formulaire de contact entièrement fonctionnel en trois étapes.',
  de = 'Ein dreistufiges voll funktionsfähiges Kontaktformular.',
  pt = 'Um formulário de contato totalmente funcional em três etapas.',
  cs = 'Třístupňový plně funkční kontaktní formulář.',
  fi = 'Kolmivaiheinen yhteydenottolomake.',
}
export enum EKeyboardUse {
  en = 'Keyboard use',
  es = 'Uso del teclado',
  fr = 'Utilisation du clavier',
  de = 'Tastatur verwenden',
  pt = 'Uso do teclado',
  cs = 'Použití klávesnice',
  fi = 'Näppäimistökäyttö',
}
export enum EKeyboardAccessible {
  en = 'Keyboard accessible',
  es = 'Accesible con teclado',
  fr = 'Accessible au clavier',
  de = 'Tastaturzugänglich',
  pt = 'Acessível por teclado',
  cs = 'Přístupné klávesnicí',
  fi = 'Näppäimistösaavutettava',
}
export enum EClarificationOrFeedback {
  en = 'Clarification or feedback',
  es = 'Aclaración o comentarios',
  fr = 'Clarification ou commentaires',
  de = 'Klärung oder Feedback',
  pt = 'Esclarecimento ou feedback',
  cs = 'Objasnění nebo zpětná vazba',
  fi = 'Selvennys tai palaute',
}
export enum EOptional {
  en = 'Optional',
  es = 'Opcional',
  fr = 'Optionnel',
  de = 'Optional',
  pt = 'Opcional',
  cs = 'Volitelný',
  fi = 'Valinnainen',
}
export enum EItIsAlrightToSendTheEnteredInformationToJenniina {
  en = 'It is alright to send the entered information to Jenniina',
  es = 'Está bien enviar la información ingresada a Jenniina',
  fr = "Il est bon d'envoyer les informations saisies à Jenniina",
  de = 'Es ist in Ordnung, die eingegebenen Informationen an Jenniina zu senden',
  pt = 'Está tudo bem enviar as informações inseridas para Jenniina',
  cs = 'Je v pořádku poslat zadané informace Jenniině',
  fi = 'Suostun siihen, että syötetyt tiedot lähetetään Jenniinalle',
}
export enum EYes {
  en = 'Yes',
  es = 'Sí',
  fr = 'Oui',
  de = 'Ja',
  pt = 'Sim',
  cs = 'Ano',
  fi = 'Kyllä',
}
export enum ENo {
  en = 'No',
  es = 'No',
  fr = 'Non',
  de = 'Nein',
  pt = 'Não',
  cs = 'Ne',
  fi = 'Ei',
}
export enum EThankYouForYourMessage {
  en = 'Thank you for your message!',
  es = '¡Gracias por tu mensaje!',
  fr = 'Merci pour votre message!',
  de = 'Vielen Dank für Ihre Nachricht!',
  pt = 'Obrigado pela sua mensagem!',
  cs = 'Děkuji za vaši zprávu!',
  fi = 'Kiitos viestistäsi!',
}
export enum EAccessibility {
  en = 'Accessibility',
  es = 'Accesibilidad',
  fr = 'Accessibilité',
  de = 'Barrierefreiheit',
  pt = 'Acessibilidade',
  cs = 'Přístupnost',
  fi = 'Saavutettavuus',
}
export enum EAppearance {
  en = 'Appearance',
  es = 'Apariencia',
  fr = 'Apparence',
  de = 'Aussehen',
  pt = 'Aparência',
  cs = 'Vzhled',
  fi = 'Ulkoasu',
}
export enum EText {
  en = 'Text',
  es = 'Texto',
  fr = 'Texte',
  de = 'Text',
  pt = 'Texto',
  cs = 'Text',
  fi = 'Teksti',
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
export enum ENavigation {
  en = 'Navigation',
  es = 'Navegación',
  fr = 'Navigation',
  de = 'Navigation',
  pt = 'Navegação',
  cs = 'Navigace',
  fi = 'Navigaatio',
}
export enum EButtons {
  en = 'Buttons',
  es = 'Botones',
  fr = 'Boutons',
  de = 'Tasten',
  pt = 'Botões',
  cs = 'Tlačítka',
  fi = 'Painikkeet',
}
export enum EMultiStepContactForm {
  en = 'Multi-step contact form',
  es = 'Formulario de contacto de varios pasos',
  fr = 'Formulaire de contact à plusieurs étapes',
  de = 'Mehrstufiges Kontaktformular',
  pt = 'Formulário de contato de várias etapas',
  cs = 'Vícestupňový kontaktní formulář',
  fi = 'Monivaiheinen yhteydenottolomake',
}
export enum EOther {
  en = 'Other',
  es = 'Otro',
  fr = 'Autre',
  de = 'Andere',
  pt = 'Outro',
  cs = 'Jiný',
  fi = 'Muu',
}
export enum EClarifiedBelow {
  en = 'Clarified below',
  es = 'Aclarado a continuación',
  fr = 'Clarifié ci-dessous',
  de = 'Unten geklärt',
  pt = 'Esclarecido abaixo',
  cs = 'Objasněno níže',
  fi = 'Selvennetty alla',
}
export enum ENoIssues {
  en = 'No issues',
  es = 'Sin problemas',
  fr = 'Pas de problèmes',
  de = 'Keine Probleme',
  pt = 'Sem problemas',
  cs = 'Žádné problémy',
  fi = 'Ei ongelmia',
}
export enum EPleaseSelectAnOption {
  en = 'Please select an option',
  es = 'Por favor seleccione una opción',
  fr = 'Veuillez sélectionner une option',
  de = 'Bitte wählen Sie eine Option',
  pt = 'Por favor selecione uma opção',
  cs = 'Vyberte prosím možnost',
  fi = 'Valitse vaihtoehto',
}
export enum ENone {
  en = 'None',
  es = 'Ninguno',
  fr = 'Aucun',
  de = 'Keiner',
  pt = 'Nenhum',
  cs = 'Žádný',
  fi = 'Ei mitään',
}
export enum EAlienEyes {
  en = 'Alien eyes',
  es = 'Ojos de alienígena',
  fr = "Yeux d'alien",
  de = 'Alien Augen',
  pt = 'Olhos de alienígena',
  cs = 'Oči vetřelce',
  fi = 'Alien-silmät',
}
export enum EEyes {
  en = 'Eyes',
  es = 'Ojos',
  fr = 'Yeux',
  de = 'Augen',
  pt = 'Olhos',
  cs = 'Oči',
  fi = 'Silmät',
}
export enum EDiamondShapes {
  en = 'Diamond shapes',
  es = 'Formas de diamante',
  fr = 'Formes de diamant',
  de = 'Diamantformen',
  pt = 'Formas de diamante',
  cs = 'Tvary diamantů',
  fi = 'Timanttimuodot',
}
export enum EYouMaySelectMultipleOptions {
  en = 'You may select multiple options',
  es = 'Puede seleccionar varias opciones',
  fr = 'Vous pouvez sélectionner plusieurs options',
  de = 'Sie können mehrere Optionen auswählen',
  pt = 'Você pode selecionar várias opções',
  cs = 'Můžete vybrat více možností',
  fi = 'Voit valita useita vaihtoehtoja',
}
export enum EPleaseOfferSomeFeedback {
  en = 'Please offer some feedback',
  es = 'Por favor ofrezca algunos comentarios',
  fr = 'Veuillez offrir des commentaires',
  de = 'Bitte geben Sie Feedback',
  pt = 'Por favor, ofereça algum feedback',
  cs = 'Nabídněte prosím zpětnou vazbu',
  fi = 'Anna palautetta',
}
export enum ESurvey {
  en = 'Survey',
  es = 'Encuesta',
  fr = 'Enquête',
  de = 'Umfrage',
  pt = 'Pesquisa',
  cs = 'Průzkum',
  fi = 'Kysely',
}
// Please report any issues with the site to Jenniina
export enum EPleaseReportAnyIssuesWithTheSiteToJenniina {
  en = 'Please report any issues with the site to Jenniina',
  es = 'Informe cualquier problema con el sitio a Jenniina',
  fr = 'Veuillez signaler tout problème avec le site à Jenniina',
  de = 'Bitte melden Sie Probleme mit der Website an Jenniina',
  pt = 'Informe quaisquer problemas com o site para Jenniina',
  cs = 'Prosím, nahlaste Jenniině jakékoliv problémy se stránkou',
  fi = 'Pyydän ilmoittamaan sivuston ongelmista',
}
export enum EInstructions {
  en = 'Instructions',
  es = 'Instrucciones',
  fr = 'Instructions',
  de = 'Anleitung',
  pt = 'Instruções',
  cs = 'Instrukce',
  fi = 'Ohjeet',
}
export enum ENote {
  en = 'Note!',
  es = '¡Nota!',
  fr = 'Remarque!',
  de = 'Hinweis!',
  pt = 'Nota!',
  cs = 'Poznámka!',
  fi = 'Huom!',
}
export enum EUserNotUpdated {
  en = 'User not updated',
  es = 'Usuario no actualizado',
  fr = 'Utilisateur non mis à jour',
  de = 'Benutzer nicht aktualisiert',
  pt = 'Usuário não atualizado',
  cs = 'Uživatel neaktualizován',
  fi = 'Käyttäjätietoja ei päivitetty',
}
export enum EUserUpdated {
  en = 'User updated',
  es = 'Usuario actualizado',
  fr = 'Utilisateur mis à jour',
  de = 'Benutzer aktualisiert',
  pt = 'Usuário atualizado',
  cs = 'Uživatel aktualizován',
  fi = 'Käyttäjätiedot päivitetty',
}
export enum EPasswordMustBeAtLeastTenCharacters {
  en = 'Password must be at least 10 characters',
  es = 'La contraseña debe tener al menos 10 caracteres',
  fr = 'Le mot de passe doit comporter au moins 10 caractères',
  de = 'Das Passwort muss mindestens 10 Zeichen lang sein',
  pt = 'A senha deve ter pelo menos 10 caracteres',
  cs = 'Heslo musí mít nejméně 10 znaků',
  fi = 'Salasanan on oltava vähintään 10 merkkiä pitkä',
}
export enum EPleaseUseGoodTasteWhenChoosingYourNickname {
  en = 'Please use good taste when choosing your nickname',
  es = 'Por favor, use buen gusto al elegir su apodo',
  fr = 'Veuillez utiliser bon goût lors du choix de votre surnom',
  de = 'Bitte verwenden Sie guten Geschmack bei der Auswahl Ihres Spitznamens',
  pt = 'Por favor, use bom gosto ao escolher seu apelido',
  cs = 'Použijte prosím dobrý vkus při výběru přezdívky',
  fi = 'Pyydän noudattamaan hyvää makua nimimerkin valitsemisessa',
}
