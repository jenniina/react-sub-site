import { IJoke } from '../components/Jokes/interfaces'
import { EQuizType, IQuiz, IQuestion, IHighscore } from '../components/Quiz/interfaces'
import { ITodos } from '../components/Todo/interfaces'
import { ICart } from './store'

export interface RefObject<T> {
  readonly current: T | null
}

export const breakpoint = 700
export const breakpointSmall = 400

export type credentials = {
  username: string
  password: string
  language: string
}

export interface IUser {
  _id?: string
  username: string
  name?: string
  role?: number
  password: string
  passwordOld?: string
  language: ELanguages | string
  verified?: boolean
  createdAt?: string
  updatedAt?: string
  blacklistedJokes?: IBlacklistedJoke[]
}
export interface IBlacklistedJoke {
  jokeId: IJoke['jokeId']
  language: ELanguages
  value?: string
  _id?: string
}

export interface ReducerProps {
  jokes: {
    jokes: IJoke[]
    joke: IJoke | null
  }
  notification: {
    isError: boolean
    message: string
    seconds: number
  }
  difficulty: {
    mode: EQuizType
  }
  cache: IJoke | null
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
  cart: ICart
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
export enum ELoggedOut {
  en = 'Logged out',
  es = 'Desconectado',
  fr = 'Déconnecté',
  de = 'Ausgeloggt',
  pt = 'Desconectado',
  cs = 'Odhlášeno',
  fi = 'Kirjauduttu ulos',
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
export enum EEmailAddress {
  en = 'Email Address',
  es = 'Dirección de correo electrónico',
  fr = 'Adresse e-mail',
  de = 'E-Mail-Addresse',
  pt = 'Endereço de email',
  cs = 'E-mailová adresa',
  fi = 'Sähköpostiosoite',
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
export enum EPleaseNote {
  en = 'Please note',
  es = 'Tenga en cuenta',
  fr = 'Veuillez noter',
  de = 'Bitte beachten Sie',
  pt = 'Por favor, note',
  cs = 'Vezměte prosím na vědomí',
  fi = 'Huomaa',
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
  fi = 'Suodata',
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
export enum EDeleted {
  en = 'Deleted',
  es = 'Eliminado',
  fr = 'Supprimé',
  de = 'Gelöscht',
  pt = 'Excluído',
  cs = 'Odstraněno',
  fi = 'Poistettu',
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
export enum EOn {
  en = 'On',
  es = 'Encendido',
  fr = 'Activé',
  de = 'Ein',
  pt = 'Ligado',
  cs = 'Zapnuto',
  fi = 'Päällä',
}
export enum EOff {
  en = 'Off',
  es = 'Apagado',
  fr = 'Désactivé',
  de = 'Aus',
  pt = 'Desligado',
  cs = 'Vypnuto',
  fi = 'Pois',
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
  fi = 'Painike: vaaleatila/tummatila',
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
  fi = 'Ne korvataan käyttäjän muokkaus- ja kirjautumispainikkeilla, kun käyttäjä on kirjautunut sisään',
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
  fi = 'Näppäimistökäyttö: siirrä nuolinäppäimillä kohdetta tab-painikkeella kohteeseen siirryttyä',
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
  fi = 'Elementti liikkuu osoittimen lähestymissuunnan mukaan',
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
  fi = 'Blob/mollukka',
}
export enum EBlobs {
  en = 'Blobs',
  es = 'Bolitas',
  fr = 'Boules',
  de = 'Kugeln',
  pt = 'Bolas',
  cs = 'Koule',
  fi = 'Blobs/mollukat',
}
export enum EBlobApp {
  en = 'Blob App',
  es = 'Aplicación de bolitas',
  fr = 'Application de boules',
  de = 'Kugel-App',
  pt = 'Aplicativo de bola',
  cs = 'Aplikace Blob',
  fi = 'Blob-/mollukkasovellus',
}
export enum EBlobAppSlogan {
  en = 'Make blob art your thing',
  es = 'Haz que el arte de las bolitas sea lo tuyo',
  fr = "Faites de l'art des blobs votre truc",
  de = 'Machen Sie Blob-Kunst zu Ihrem Ding',
  pt = 'Faça da arte de blobs a sua coisa',
  cs = 'Udělejte z blob art svou věc',
  fi = 'Tee mollukkataiteesta juttusi',
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
  fi = 'Raahattavat mollukat',
}
export enum EDragAndDrop {
  en = 'Drag and Drop',
  es = 'Arrastrar y Soltar',
  fr = 'Glisser Déposer',
  de = 'Ziehen und Ablegen',
  pt = 'Arrastar e Soltar',
  cs = 'Táhnout a Pustit',
  fi = 'Kohteeseen raahaus',
}
export enum ECustomSelect {
  en = 'Custom Select Dropdown',
  es = 'Desplegable de selección personalizada',
  fr = 'Menu déroulant personnalisé',
  de = 'Angepasstes Auswahlmenü',
  pt = 'Menu suspenso personalizado',
  cs = 'Vlastní rozbalovací nabídka',
  fi = 'Räätälöitävä valintavalikko',
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
  fi = 'Valikkotyyli',
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
  fi = 'Raahattavat-sovellus, joka sisältää raahattavia toisiinsa sulautuvia mollukoita',
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
export enum EOldestFirst {
  en = 'Oldest first',
  es = 'El más antiguo primero',
  fr = "Le plus ancien d'abord",
  de = 'Älteste zuerst',
  pt = 'Mais antigo primeiro',
  cs = 'Nejstarší první',
  fi = 'Vanhin ensin',
}
export enum ENewestFirst {
  en = 'Newest first',
  es = 'El más nuevo primero',
  fr = "Le plus récent d'abord",
  de = 'Neueste zuerst',
  pt = 'Mais novo primeiro',
  cs = 'Nejnovější první',
  fi = 'Uusin ensin',
}
export enum ENewest {
  en = 'Newest',
  es = 'El más nuevo',
  fr = 'Le plus récent',
  de = 'Neueste',
  pt = 'Mais novo',
  cs = 'Nejnovější',
  fi = 'Uusin',
}
export enum EOldest {
  en = 'Oldest',
  es = 'El más antiguo',
  fr = 'Le plus ancien',
  de = 'Älteste',
  pt = 'Mais antigo',
  cs = 'Nejstarší',
  fi = 'Vanhin',
}
export enum ESavedBy {
  en = 'Saved by',
  es = 'Guardado por',
  fr = 'Sauvegardé par',
  de = 'Gespeichert von',
  pt = 'Salvo por',
  cs = 'Uloženo',
  fi = 'Tallentanut',
}
export enum ELastPage {
  en = 'Last page',
  es = 'Última página',
  fr = 'Dernière page',
  de = 'Letzte Seite',
  pt = 'Última página',
  cs = 'Poslední stránka',
  fi = 'Viimeinen sivu',
}
export enum EFirstPage {
  en = 'First page',
  es = 'Primera página',
  fr = 'Première page',
  de = 'Erste Seite',
  pt = 'Primeira página',
  cs = 'První stránka',
  fi = 'Ensimmäinen sivu',
}
export enum EHairSalonWebsite {
  en = 'Hair salon website',
  es = 'Sitio web de salón de belleza',
  fr = 'Site web de salon de coiffure',
  de = 'Friseur-Website',
  pt = 'Site de salão de beleza',
  cs = 'Webové stránky kadeřnictví',
  fi = 'Parturi-kampaamon verkkosivusto',
}
export enum EHairSalon {
  en = 'Hair salon',
  es = 'Salón de belleza',
  fr = 'Salon de coiffure',
  de = 'Friseur',
  pt = 'Salão de beleza',
  cs = 'Kadeřnictví',
  fi = 'Parturi-kampaamo',
}
export enum ETriangles {
  en = 'Triangles',
  es = 'Triángulos',
  fr = 'Triangles',
  de = 'Dreiecke',
  pt = 'Triângulos',
  cs = 'Trojúhelníky',
  fi = 'Kolmiot',
}
export enum EInvertedTriangles {
  en = 'Inverted triangles',
  es = 'Triángulos invertidos',
  fr = 'Triangles inversés',
  de = 'Invertierte Dreiecke',
  pt = 'Triângulos invertidos',
  cs = 'Obrácené trojúhelníky',
  fi = 'Käänteiset kolmiot',
}
export enum ESquares {
  en = 'Squares',
  es = 'Cuadrados',
  fr = 'Carrés',
  de = 'Quadrate',
  pt = 'Quadrados',
  cs = 'Čtverce',
  fi = 'Neliöt',
}
export enum ESquaresStandingOnTheirCorner {
  en = 'Squares standing on their corner',
  es = 'Cuadrados de pie en su esquina',
  fr = 'Carrés debout sur leur coin',
  de = 'Quadrate stehen auf ihrer Ecke',
  pt = 'Quadrados em pé no canto',
  cs = 'Čtverce stojí na svém rohu',
  fi = 'Neliöt seisovat kulmassaan',
}
export enum EGraphQLSite {
  en = 'GraphQL site',
  es = 'Sitio de GraphQL',
  fr = 'Site GraphQL',
  de = 'GraphQL-Website',
  pt = 'Site GraphQL',
  cs = 'GraphQL web',
  fi = 'GraphQL-sivusto',
}
export enum ENew {
  en = 'New',
  es = 'Nuevo',
  fr = 'Nouveau',
  de = 'Neu',
  pt = 'Novo',
  cs = 'Nový',
  fi = 'Uutta',
}
export enum EButton {
  en = 'Button',
  es = 'Botón',
  fr = 'Bouton',
  de = 'Schaltfläche',
  pt = 'Botão',
  cs = 'Tlačítko',
  fi = 'Painike',
}
export enum EOr {
  en = 'or',
  es = 'o',
  fr = 'ou',
  de = 'oder',
  pt = 'ou',
  cs = 'nebo',
  fi = 'tai',
}
export enum ESavingSuccessful {
  en = 'Saving successful',
  es = 'Guardado exitoso',
  fr = 'Enregistrement réussi',
  de = 'Speichern erfolgreich',
  pt = 'Salvamento bem-sucedido',
  cs = 'Uložení úspěšné',
  fi = 'Tallennus onnistui',
}
//Need help?
export enum ENeedHelp {
  en = 'Need help?',
  es = '¿Necesitas ayuda?',
  fr = "Besoin d'aide?",
  de = 'Brauchen Sie Hilfe?',
  pt = 'Precisa de ajuda?',
  cs = 'Potřebujete pomoc?',
  fi = 'Tarvitsetko apua?',
}
export enum EForExample {
  en = 'for example:',
  es = 'por ejemplo:',
  fr = 'par exemple:',
  de = 'zum Beispiel:',
  pt = 'por exemplo:',
  cs = 'například:',
  fi = 'esimerkiksi:',
}
export enum EAreYouSureYouWantToRemoveThis {
  en = 'Are you sure you want to remove this?',
  es = '¿Estás seguro de que quieres eliminar esto?',
  fr = 'Êtes-vous sûr de vouloir supprimer ceci?',
  de = 'Möchten Sie dies wirklich entfernen?',
  pt = 'Tem certeza de que deseja remover isso?',
  cs = 'Jste si jisti, že chcete toto odstranit?',
  fi = 'Oletko varma, että haluat poistaa tämän?',
}
export enum EChangeCategoryTitle {
  en = 'Change category title',
  es = 'Cambiar título de categoría',
  fr = 'Changer le titre de la catégorie',
  de = 'Kategorie-Titel ändern',
  pt = 'Alterar título da categoria',
  cs = 'Změnit název kategorie',
  fi = 'Muuta kategorian otsikko',
}
export enum EChange {
  en = 'Change',
  es = 'Cambiar',
  fr = 'Changer',
  de = 'Ändern',
  pt = 'Alterar',
  cs = 'Změnit',
  fi = 'Muuta',
}
export enum ETheCategoryAlreadyExists {
  en = 'The category already exists',
  es = 'La categoría ya existe',
  fr = 'La catégorie existe déjà',
  de = 'Die Kategorie existiert bereits',
  pt = 'A categoria já existe',
  cs = 'Kategorie již existuje',
  fi = 'Kategoria on jo olemassa',
}
export enum ESpecialCharactersNotAllowed {
  en = 'Special characters like ? are not allowed',
  es = 'No se permiten caracteres especiales como ?',
  fr = 'Les caractères spéciaux comme ? ne sont pas autorisés',
  de = 'Sonderzeichen wie ? sind nicht erlaubt',
  pt = 'Caracteres especiais como ? não são permitidos',
  cs = 'Speciální znaky jako ? nejsou povoleny',
  fi = 'Erityismerkit kuten ? eivät ole sallittuja',
}
export enum ESpecialCharactersOrSpaceNotAllowed {
  en = 'Special characters or space are not allowed',
  es = 'No se permiten caracteres especiales o espacio',
  fr = 'Les caractères spéciaux ou l espace ne sont pas autorisés',
  de = 'Sonderzeichen oder Leerzeichen sind nicht erlaubt',
  pt = 'Caracteres especiais ou espaço não são permitidos',
  cs = 'Speciální znaky nebo mezera nejsou povoleny',
  fi = 'Erityismerkit tai välilyönti eivät ole sallittuja',
}
export enum ECategoriesCanBeRenamed {
  en = 'Categories can be renamed',
  es = 'Las categorías se pueden renombrar',
  fr = 'Les catégories peuvent être renommées',
  de = 'Kategorien können umbenannt werden',
  pt = 'As categorias podem ser renomeadas',
  cs = 'Kategorie lze přejmenovat',
  fi = 'Kategoriat voidaan nimetä uudelleen',
}
export enum ERenameTitle {
  en = 'Rename title',
  es = 'Renombrar título',
  fr = 'Renommer le titre',
  de = 'Titel umbenennen',
  pt = 'Renomear título',
  cs = 'Přejmenovat název',
  fi = 'Nimeä uudelleen',
}
export enum EChangeLanguage {
  en = 'Change language',
  es = 'Cambiar idioma',
  fr = 'Changer de langue',
  de = 'Sprache ändern',
  pt = 'Mudar idioma',
  cs = 'Změnit jazyk',
  fi = 'Vaihda kieli',
}
export enum EDownload {
  en = 'Download',
  es = 'Descargar',
  fr = 'Télécharger',
  de = 'Herunterladen',
  pt = 'Baixar',
  cs = 'Stáhnout',
  fi = 'Lataa',
}
export enum EErrorConnectingToTheServer {
  en = 'Error connecting to the server',
  es = 'Error al conectar al servidor',
  fr = 'Erreur de connexion au serveur',
  de = 'Fehler beim Verbinden mit dem Server',
  pt = 'Erro ao conectar ao servidor',
  cs = 'Chyba připojení k serveru',
  fi = 'Virhe yhdistettäessä palvelimeen',
}
export enum ELoad {
  en = 'Load',
  es = 'Cargar',
  fr = 'Charger',
  de = 'Laden',
  pt = 'Carregar',
  cs = 'Načíst',
  fi = 'Lataa',
}
export enum EPrevious {
  en = 'Previous',
  es = 'Anterior',
  fr = 'Précédent',
  de = 'Vorherige',
  pt = 'Anterior',
  cs = 'Předchozí',
  fi = 'Edellinen',
}
export enum ENext {
  en = 'Next',
  es = 'Siguiente',
  fr = 'Suivant',
  de = 'Nächste',
  pt = 'Próximo',
  cs = 'Další',
  fi = 'Seuraava',
}
export enum EPage {
  en = 'Page',
  es = 'Página',
  fr = 'Page',
  de = 'Seite',
  pt = 'Página',
  cs = 'Stránka',
  fi = 'Sivu',
}
export enum EAddedPagination {
  en = 'Added pagination',
  es = 'Paginación añadida',
  fr = 'Pagination ajoutée',
  de = 'Seitennummerierung hinzugefügt',
  pt = 'Paginação adicionada',
  cs = 'Přidána stránkování',
  fi = 'Sivutus lisätty',
}
export enum EAreYouSureYouWantToProceed {
  en = 'Are you sure you want to proceed?',
  es = '¿Estás seguro de que quieres proceder?',
  fr = 'Êtes-vous sûr de vouloir continuer?',
  de = 'Möchten Sie wirklich fortfahren?',
  pt = 'Tem certeza de que deseja prosseguir?',
  cs = 'Jste si jisti, že chcete pokračovat?',
  fi = 'Oletko varma, että haluat jatkaa?',
}
// Privacy and Security Disclaimer
// Data Collection and Storage:

// We collect and store the email address you provide as your username.
// Your password is securely hashed and stored in our database. We do not store your password in plain text.
// Data Protection:

// We use industry-standard security measures to protect your data, including encryption and secure hashing algorithms.
// Access to your data is restricted to authorized personnel only.
// User Responsibilities:

// Please choose a strong and unique password to enhance your account security.
// Do not share your password with anyone.
// Your Rights:

// You have the right to access, modify, or delete your personal information stored in our system.
// If you have any concerns about your data security, please contact our support team.
// Changes to This Disclaimer:

// We may update this disclaimer from time to time. We will notify you of any significant changes by posting the new disclaimer on our website.
// By using our service, you agree to the collection and use of your information in accordance with this disclaimer.

export enum EDisclaimer {
  en = 'Disclaimer',
  es = 'Descargo de responsabilidad',
  fr = 'Avis de non-responsabilité',
  de = 'Haftungsausschluss',
  pt = 'Aviso Legal',
  cs = 'Ochranná doložka',
  fi = 'Vastuuvapauslauseke',
}
export enum EPrivacyAndSecurityDisclaimer {
  en = 'Privacy and Security Disclaimer',
  es = 'Descargo de responsabilidad de privacidad y seguridad',
  fr = 'Avis de confidentialité et de sécurité',
  de = 'Haftungsausschluss für Datenschutz und Sicherheit',
  pt = 'Aviso de privacidade e segurança',
  cs = 'Ochrana osobních údajů a bezpečnostní prohlášení',
  fi = 'Tietosuoja- ja tietoturvaohje',
}
export enum EDataCollectionAndStorage {
  en = 'Data Collection and Storage',
  es = 'Recolección y almacenamiento de datos',
  fr = 'Collecte et stockage de données',
  de = 'Datenerfassung und Speicherung',
  pt = 'Coleta e armazenamento de dados',
  cs = 'Sběr a ukládání dat',
  fi = 'Tietojen kerääminen ja tallentaminen',
}
export enum EWeCollectAndStoreTheEmailAddress {
  en = 'We collect and store the email address you provide as your username.',
  es = 'Recopilamos y almacenamos la dirección de correo electrónico que proporciona como su nombre de usuario.',
  fr = 'Nous collectons et stockons l adresse e-mail que vous fournissez en tant que nom d utilisateur.',
  de = 'Wir erfassen und speichern die E-Mail-Adresse, die Sie als Benutzernamen angeben.',
  pt = 'Coletamos e armazenamos o endereço de e-mail que você fornece como seu nome de usuário.',
  cs = 'Sbíráme a ukládáme e-mailovou adresu, kterou poskytnete jako své uživatelské jméno.',
  fi = 'Keräämme ja tallennamme sähköpostiosoitteen, jonka annat käyttäjänimesi.',
}
export enum EYourPasswordIsSecurelyHashed {
  en = 'Your password is securely hashed and stored in our database. We do not store your password in plain text.',
  es = 'Su contraseña se cifra de forma segura y se almacena en nuestra base de datos. No almacenamos su contraseña en texto sin formato.',
  fr = 'Votre mot de passe est crypté de manière sécurisée et stocké dans notre base de données. Nous ne stockons pas votre mot de passe en texte clair.',
  de = 'Ihr Passwort wird sicher gehasht und in unserer Datenbank gespeichert. Wir speichern Ihr Passwort nicht im Klartext.',
  pt = 'Sua senha é criptografada com segurança e armazenada em nosso banco de dados. Não armazenamos sua senha em texto simples.',
  cs = 'Vaše heslo je bezpečně zahashováno a uloženo v naší databázi. Heslo neukládáme v čistém textu.',
  fi = 'Salasanasi on turvallisesti tiivistetty ja tallennettu tietokantaamme. Emme tallenna salasanaasi selkokielisenä.',
}
export enum EDataProtection {
  en = 'Data Protection',
  es = 'Protección de datos',
  fr = 'Protection des données',
  de = 'Datenschutz',
  pt = 'Proteção de dados',
  cs = 'Ochrana dat',
  fi = 'Tietosuoja',
}
export enum EWeUseIndustryStandardSecurityMeasures {
  en = 'We use industry-standard security measures to protect your data, including encryption and secure hashing algorithms.',
  es = 'Utilizamos medidas de seguridad estándar de la industria para proteger sus datos, incluidos algoritmos de cifrado y hash seguros.',
  fr = 'Nous utilisons des mesures de sécurité standard de l industrie pour protéger vos données, y compris le chiffrement et les algorithmes de hachage sécurisés.',
  de = 'Wir verwenden branchenübliche Sicherheitsmaßnahmen zum Schutz Ihrer Daten, einschließlich Verschlüsselung und sicherer Hash-Algorithmen.',
  pt = 'Utilizamos medidas de segurança padrão da indústria para proteger seus dados, incluindo algoritmos de criptografia e hash seguros.',
  cs = 'Používáme standardní bezpečnostní opatření průmyslu k ochraně vašich dat, včetně šifrování a bezpečných hašovacích algoritmů.',
  fi = 'Käytämme teollisuusstandardin mukaisia turvatoimenpiteitä suojataksesi tietosi, mukaan lukien salaus ja turvalliset tiivistysalgoritmit.',
}
export enum EAccessToYourDataIsRestricted {
  en = 'Access to your data is restricted to authorized personnel only.',
  es = 'El acceso a sus datos está restringido solo al personal autorizado.',
  fr = 'L accès à vos données est limité au personnel autorisé uniquement.',
  de = 'Der Zugriff auf Ihre Daten ist nur für autorisiertes Personal beschränkt.',
  pt = 'O acesso aos seus dados é restrito apenas ao pessoal autorizado.',
  cs = 'Přístup k vašim datům je omezen pouze na autorizovaný personál.',
  fi = 'Pääsy tietoihisi on rajoitettu vain valtuutettuun henkilöstöön.',
}
export enum EUserResponsibilities {
  en = 'User Responsibilities',
  es = 'Responsabilidades del usuario',
  fr = 'Responsabilités de l utilisateur',
  de = 'Benutzerpflichten',
  pt = 'Responsabilidades do usuário',
  cs = 'Uživatelské povinnosti',
  fi = 'Käyttäjän vastuut',
}
export enum EPleaseChooseAStrongAndUniquePassword {
  en = 'Please choose a strong and unique password to enhance your account security.',
  es = 'Por favor, elija una contraseña fuerte y única para mejorar la seguridad de su cuenta.',
  fr = 'Veuillez choisir un mot de passe fort et unique pour renforcer la sécurité de votre compte.',
  de = 'Bitte wählen Sie ein starkes und einzigartiges Passwort, um die Sicherheit Ihres Kontos zu erhöhen.',
  pt = 'Por favor, escolha uma senha forte e única para aumentar a segurança da sua conta.',
  cs = 'Vyberte prosím silné a jedinečné heslo, abyste zvýšili bezpečnost svého účtu.',
  fi = 'Valitse vahva ja uniikki salasana lisätäksesi tilisi turvallisuutta.',
}
export enum EDoNotShareYourPasswordWithAnyone {
  en = 'Do not share your password with anyone.',
  es = 'No comparta su contraseña con nadie.',
  fr = 'Ne partagez pas votre mot de passe avec qui que ce soit.',
  de = 'Teilen Sie Ihr Passwort nicht mit anderen.',
  pt = 'Não compartilhe sua senha com ninguém.',
  cs = 'Nesdílejte své heslo s nikým.',
  fi = 'Älä jaa salasanaasi kenenkään kanssa.',
}
export enum EYourRights {
  en = 'Your Rights',
  es = 'Tus derechos',
  fr = 'Vos droits',
  de = 'Deine Rechte',
  pt = 'Seus direitos',
  cs = 'Vaše práva',
  fi = 'Oikeutesi',
}
export enum EYouHaveTheRightToAccessModifyOrDelete {
  en = 'You have the right to access, modify, or delete your personal information stored in our system.',
  es = 'Tiene derecho a acceder, modificar o eliminar su información personal almacenada en nuestro sistema.',
  fr = 'Vous avez le droit d accéder, de modifier ou de supprimer vos informations personnelles stockées dans notre système.',
  de = 'Sie haben das Recht, auf Ihre in unserem System gespeicherten persönlichen Informationen zuzugreifen, sie zu ändern oder zu löschen.',
  pt = 'Você tem o direito de acessar, modificar ou excluir suas informações pessoais armazenadas em nosso sistema.',
  cs = 'Máte právo přistupovat, měnit nebo mazat své osobní informace uložené v našem systému.',
  fi = 'Sinulla on oikeus käyttää, muokata tai poistaa henkilökohtaiset tietosi, jotka on tallennettu järjestelmäämme.',
}
export enum EIfYouHaveAnyConcernsAboutYourDataSecurity {
  en = 'If you have any concerns about your data security, please contact me',
  es = 'Si tiene alguna preocupación sobre la seguridad de sus datos, por favor contácteme',
  fr = 'Si vous avez des préoccupations concernant la sécurité de vos données, veuillez me contacter',
  de = 'Wenn Sie Bedenken hinsichtlich der Sicherheit Ihrer Daten haben, kontaktieren Sie mich bitte',
  pt = 'Se você tiver alguma preocupação sobre a segurança de seus dados, entre em contato comigo',
  cs = 'Pokud máte jakékoli obavy ohledně zabezpečení svých dat, kontaktujte mě',
  fi = 'Jos sinulla on huolenaiheita tietoturvasi suhteen, ota yhteyttä',
}
export enum EChangesToThisDisclaimer {
  en = 'Changes to This Disclaimer',
  es = 'Cambios a este descargo de responsabilidad',
  fr = 'Changements à cet avis de non-responsabilité',
  de = 'Änderungen an diesem Haftungsausschluss',
  pt = 'Alterações a este aviso de isenção',
  cs = 'Změny tohoto prohlášení',
  fi = 'Muutokset tähän vastuuvapauslausekkeeseen',
}
export enum EWeMayUpdateThisDisclaimerFromTimeToTime {
  en = 'We may update this disclaimer from time to time. We will notify you of any significant changes by posting the new disclaimer on our website.',
  es = 'Podemos actualizar este descargo de responsabilidad de vez en cuando. Le notificaremos cualquier cambio significativo publicando el nuevo descargo de responsabilidad en nuestro sitio web.',
  fr = 'Nous pouvons mettre à jour cet avis de non-responsabilité de temps à autre. Nous vous informerons de tout changement significatif en publiant le nouvel avis de non-responsabilité sur notre site Web.',
  de = 'Wir können diesen Haftungsausschluss von Zeit zu Zeit aktualisieren. Wir informieren Sie über wesentliche Änderungen, indem wir den neuen Haftungsausschluss auf unserer Website veröffentlichen.',
  pt = 'Podemos atualizar este aviso de isenção de responsabilidade de tempos em tempos. Notificaremos você sobre quaisquer alterações significativas, publicando o novo aviso de isenção em nosso site.',
  cs = 'Můžeme aktualizovat toto prohlášení z času na čas. O jakýchkoli významných změnách vás budeme informovat zveřejněním nového prohlášení na našich webových stránkách.',
  fi = 'Voimme päivittää tätä vastuuvapauslauseketta aika ajoin. Ilmoitamme sinulle merkittävistä muutoksista julkaisemalla uuden vastuuvapauslausekkeen verkkosivustollamme.',
}
export enum EByUsingOurService {
  en = 'By using our service, you agree to the collection and use of your information in accordance with this disclaimer.',
  es = 'Al utilizar nuestro servicio, acepta la recopilación y el uso de su información de acuerdo con este descargo de responsabilidad.',
  fr = 'En utilisant notre service, vous acceptez la collecte et l utilisation de vos informations conformément à cet avis de non-responsabilité.',
  de = 'Durch die Nutzung unseres Dienstes stimmen Sie der Erfassung und Verwendung Ihrer Informationen gemäß diesem Haftungsausschluss zu.',
  pt = 'Ao usar nosso serviço, você concorda com a coleta e o uso de suas informações de acordo com este aviso de isenção de responsabilidade.',
  cs = 'Používáním našich služeb souhlasíte se sběrem a použitím vašich informací v souladu s tímto prohlášením.',
  fi = 'Käyttämällä palveluamme hyväksyt tietojesi keräämisen ja käytön tämän vastuuvapauslausekkeen mukaisesti.',
}
export enum ELastUpdated {
  en = 'Last updated',
  es = 'Última actualización',
  fr = 'Dernière mise à jour',
  de = 'Zuletzt aktualisiert',
  pt = 'Última atualização',
  cs = 'Naposledy aktualizováno',
  fi = 'Viimeksi päivitetty',
}
export enum EBackToStart {
  en = 'Back to start',
  es = 'Volver al inicio',
  fr = 'Retour au début',
  de = 'Zurück zum Anfang',
  pt = 'Voltar ao início',
  cs = 'Zpět na začátek',
  fi = 'Takaisin alkuun',
}
export enum EToLastPage {
  en = 'To last page',
  es = 'A la última página',
  fr = 'À la dernière page',
  de = 'Zur letzten Seite',
  pt = 'Para a última página',
  cs = 'Na poslední stránku',
  fi = 'Viimeiselle sivulle',
}
export enum EShape {
  en = 'Shape',
  es = 'Forma',
  fr = 'Forme',
  de = 'Form',
  pt = 'Forma',
  cs = 'Tvar',
  fi = 'Muoto',
}
export enum EBubble {
  en = 'Bubble',
  es = 'Burbuja',
  fr = 'Bulle',
  de = 'Blase',
  pt = 'Bolha',
  cs = 'Bublina',
  fi = 'Kupla',
}
export enum EEye {
  en = 'Eye',
  es = 'Ojo',
  fr = 'Œil',
  de = 'Auge',
  pt = 'Olho',
  cs = 'Okno',
  fi = 'Silmä',
}
export enum EOlderNews {
  en = 'Older news',
  es = 'Noticias antiguas',
  fr = 'Anciennes nouvelles',
  de = 'Ältere Nachrichten',
  pt = 'Notícias antigas',
  cs = 'Starší zprávy',
  fi = 'Vanhemmat uutiset',
}
export enum EAddedAnotherInstanceOfTheBlobArtApp {
  en = 'Added another instance of the Blob Art app',
  es = 'Añadida otra instancia de la aplicación Blob Art',
  fr = 'Ajouté une autre instance de l application Blob Art',
  de = 'Eine weitere Instanz der Blob Art App hinzugefügt',
  pt = 'Adicionada outra instância do aplicativo Blob Art',
  cs = 'Přidána další instance aplikace Blob Art',
  fi = 'Lisätty toinen instanssi Blob Art -sovelluksesta',
}
export enum ENews {
  en = 'News',
  es = 'Noticias',
  fr = 'Actualités',
  de = 'Nachrichten',
  pt = 'Notícias',
  cs = 'Zprávy',
  fi = 'Uutiset',
}
export enum EItemsPerPage {
  en = 'Items per page',
  es = 'Elementos por página',
  fr = 'Articles par page',
  de = 'Elemente pro Seite',
  pt = 'Itens por página',
  cs = 'Položek na stránku',
  fi = 'Kohdetta sivua kohden',
}
export enum EPerPage {
  en = 'per page',
  es = 'por página',
  fr = 'par page',
  de = 'pro Seite',
  pt = 'por página',
  cs = 'na stránku',
  fi = 'sivua kohden',
}
export enum ENewName {
  en = 'New name',
  es = 'Nuevo nombre',
  fr = 'Nouveau nom',
  de = 'Neuer Name',
  pt = 'Novo nome',
  cs = 'Nové jméno',
  fi = 'Uusi nimi',
}
export enum EBookApp {
  en = 'Book App (In English)',
  es = 'Aplicación de libros (en inglés)',
  fr = 'Application de livre (en anglais)',
  de = 'Buch-App (auf Englisch)',
  pt = 'Aplicativo de livro (em inglês)',
  cs = 'Aplikace knih (v angličtině)',
  fi = 'Kirja-sovellus (englanniksi)',
}

export enum ETheWebServiceIsHostedAtRenderCom {
  en = 'The web service is hosted at Render.com for free, with 512 MB RAM and 0.1 CPU, hence requiring a little patience to browse. The Apollo server is connected to:',
  es = 'El servicio web está alojado en Render.com de forma gratuita, con 512 MB de RAM y 0.1 CPU, por lo que requiere un poco de paciencia para navegar. El servidor de Apollo está conectado a:',
  fr = 'Le service Web est hébergé sur Render.com gratuitement, avec 512 Mo de RAM et 0,1 CPU, nécessitant donc un peu de patience pour naviguer. Le serveur Apollo est connecté à:',
  de = 'Der Webservice wird kostenlos bei Render.com gehostet, mit 512 MB RAM und 0,1 CPU, daher erfordert es etwas Geduld beim Surfen. Der Apollo-Server ist verbunden mit:',
  pt = 'O serviço da web é hospedado gratuitamente no Render.com, com 512 MB de RAM e 0,1 CPU, portanto, requer um pouco de paciência para navegar. O servidor Apollo está conectado a:',
  cs = 'Webová služba je hostována na Render.com zdarma, s 512 MB RAM a 0,1 CPU, a proto vyžaduje trochu trpělivosti při procházení. Server Apollo je připojen k:',
  fi = 'Verkkopalvelu on majoitettu Render.comiin ilmaiseksi, jossa on 512 Mt RAM-muistia ja 0,1 CPU:ta, joten vaatii hieman kärsivällisyyttä selaamiseen. Apollo-palvelin on yhteydessä:',
}
export enum EMongoDBAtlasDatabase {
  en = 'MongoDB Atlas database',
  es = 'Base de datos de MongoDB Atlas',
  fr = 'Base de données MongoDB Atlas',
  de = 'MongoDB Atlas-Datenbank',
  pt = 'Banco de dados MongoDB Atlas',
  cs = 'Databáze MongoDB Atlas',
  fi = 'MongoDB Atlas -tietokanta',
}
export enum EConfirm {
  en = 'Confirm',
  es = 'Confirmar',
  fr = 'Confirmer',
  de = 'Bestätigen',
  pt = 'Confirmar',
  cs = 'Potvrdit',
  fi = 'Vahvista',
}
export enum EEtc {
  en = 'etc.',
  es = 'etc.',
  fr = 'etc.',
  de = 'etc.',
  pt = 'etc.',
  cs = 'atd.',
  fi = 'jne.',
}
// Turn random movement off
export enum ETurnRandomMovementOff {
  en = 'Turn random movement off',
  es = 'Apagar movimiento aleatorio',
  fr = 'Désactiver le mouvement aléatoire',
  de = 'Zufällige Bewegung ausschalten',
  pt = 'Desligar movimento aleatório',
  cs = 'Vypnout náhodný pohyb',
  fi = 'Kytke satunnainen liike pois päältä',
}
export enum ERandomMovement {
  en = 'Random movement',
  es = 'Movimiento aleatorio',
  fr = 'Mouvement aléatoire',
  de = 'Zufällige Bewegung',
  pt = 'Movimento aleatório',
  cs = 'Náhodný pohyb',
  fi = 'Satunnainen liike',
}
export enum ETurnRandomMovementOn {
  en = 'Turn random movement on',
  es = 'Encender movimiento aleatorio',
  fr = 'Activer le mouvement aléatoire',
  de = 'Zufällige Bewegung einschalten',
  pt = 'Ligar movimento aleatório',
  cs = 'Zapnout náhodný pohyb',
  fi = 'Kytke satunnainen liike päälle',
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
export enum EItIsNotEmpty {
  en = 'It is not empty!',
  es = '¡No está vacío!',
  fr = 'Ce n est pas vide!',
  de = 'Es ist nicht leer!',
  pt = 'Não está vazio!',
  cs = 'Není prázdné!',
  fi = 'Se ei ole tyhjä!',
}
export enum EAddANewCategory {
  en = 'Add a new category',
  es = 'Agregar una nueva categoría',
  fr = 'Ajouter une nouvelle catégorie',
  de = 'Eine neue Kategorie hinzufügen',
  pt = 'Adicionar uma nova categoria',
  cs = 'Přidat novou kategorii',
  fi = 'Lisää uusi kategoria',
}
export enum ECannotRemoveLastCategory {
  en = 'Cannot remove last category',
  es = 'No se puede eliminar la última categoría',
  fr = 'Impossible de supprimer la dernière catégorie',
  de = 'Letzte Kategorie kann nicht entfernt werden',
  pt = 'Não é possível remover a última categoria',
  cs = 'Nelze odebrat poslední kategorii',
  fi = 'Viimeistä kategoriaa ei voi poistaa',
}
export enum ECannotAddMoreCategories {
  en = 'Cannot add more categories',
  es = 'No se pueden agregar más categorías',
  fr = 'Impossible d ajouter plus de catégories',
  de = 'Kann keine weiteren Kategorien hinzufügen',
  pt = 'Não é possível adicionar mais categorias',
  cs = 'Nelze přidat další kategorie',
  fi = 'Ei voi lisätä enempää kategorioita',
}
export enum EAMaxOf30CharactersPlease {
  en = 'A maximum of 30 characters, please',
  es = 'Un máximo de 30 caracteres, por favor',
  fr = "Un maximum de 30 caractères, s'il vous plaît",
  de = 'Maximal 30 Zeichen, bitte',
  pt = 'No máximo 30 caracteres, por favor',
  cs = 'Maximálně 30 znaků, prosím',
  fi = 'Enintään 30 merkkiä, kiitos',
}
export enum EAMaxOf20CharactersPlease {
  en = 'A maximum of 20 characters, please',
  es = 'Un máximo de 20 caracteres, por favor',
  fr = "Un maximum de 20 caractères, s'il vous plaît",
  de = 'Maximal 20 Zeichen, bitte',
  pt = 'No máximo 20 caracteres, por favor',
  cs = 'Maximálně 20 znaků, prosím',
  fi = 'Enintään 20 merkkiä, kiitos',
}
export enum ENameTooLong {
  en = 'The name is too long',
  es = 'El nombre es demasiado largo',
  fr = 'Le nom est trop long',
  de = 'Der Name ist zu lang',
  pt = 'O nome é muito longo',
  cs = 'Název je příliš dlouhý',
  fi = 'Nimi on liian pitkä',
}
export enum ELoading {
  en = 'Loading',
  es = 'Cargando',
  fr = 'Chargement',
  de = 'Wird geladen',
  pt = 'Carregando',
  cs = 'Načítání',
  fi = 'Ladataan',
}
export enum ECopiedToClipboard {
  en = 'Copied to clipboard!',
  es = '¡Copiado al portapapeles!',
  fr = 'Copié dans le presse-papiers!',
  de = 'In die Zwischenablage kopiert!',
  pt = 'Copiado para a área de transferência!',
  cs = 'Zkopírováno do schránky!',
  fi = 'Kopioitu leikepöydälle!',
}
//Failed to copy!
export enum EFailedToCopy {
  en = 'Failed to copy!',
  es = '¡Error al copiar!',
  fr = 'Échec de la copie!',
  de = 'Kopieren fehlgeschlagen!',
  pt = 'Falha ao copiar!',
  cs = 'Kopírování se nezdařilo!',
  fi = 'Kopiointi epäonnistui!',
}
export enum ECopyText {
  en = 'Copy text',
  es = 'Copiar texto',
  fr = 'Copier le texte',
  de = 'Text kopieren',
  pt = 'Copiar texto',
  cs = 'Kopírovat text',
  fi = 'Kopioi teksti',
}
export enum ECopy {
  en = 'Copy',
  es = 'Copiar',
  fr = 'Copier',
  de = 'Kopieren',
  pt = 'Copiar',
  cs = 'Kopírovat',
  fi = 'Kopioi',
}
export enum ECopyToClipboard {
  en = 'Copy to clipboard',
  es = 'Copiar al portapapeles',
  fr = 'Copier dans le presse-papiers',
  de = 'In die Zwischenablage kopieren',
  pt = 'Copiar para a área de transferência',
  cs = 'Kopírovat do schránky',
  fi = 'Kopioi leikepöydälle',
}
export enum EMove {
  en = 'Move',
  es = 'Mover',
  fr = 'Déplacer',
  de = 'Verschieben',
  pt = 'Mover',
  cs = 'Přesunout',
  fi = 'Siirrä',
}
export enum ETarget {
  en = 'Target',
  es = 'Objetivo',
  fr = 'Cible',
  de = 'Ziel',
  pt = 'Alvo',
  cs = 'Cíl',
  fi = 'Kohde',
}
export enum EToTarget {
  en = 'To target',
  es = 'A objetivo',
  fr = 'À la cible',
  de = 'Zum Ziel',
  pt = 'Para o alvo',
  cs = 'Na cíl',
  fi = 'Kohteeseen',
}
export enum EAdd {
  en = 'Add',
  es = 'Añadir',
  fr = 'Ajouter',
  de = 'Hinzufügen',
  pt = 'Adicionar',
  cs = 'Přidat',
  fi = 'Lisää',
}
export enum ESubtract {
  en = 'Subtract',
  es = 'Restar',
  fr = 'Soustraire',
  de = 'Subtrahieren',
  pt = 'Subtrair',
  cs = 'Odečíst',
  fi = 'Vähennä',
}
export enum EStore {
  en = 'Store',
  es = 'Almacenar',
  fr = 'Magasin',
  de = 'Geschäft',
  pt = 'Loja',
  cs = 'Obchod',
  fi = 'Kauppa',
}
export enum EWebpagesAndGraphicDesign {
  en = 'Webpages and graphic design',
  es = 'Páginas web y diseño gráfico',
  fr = 'Pages web et design graphique',
  de = 'Webseiten und Grafikdesign',
  pt = 'Páginas da web e design gráfico',
  cs = 'Webové stránky a grafický design',
  fi = 'Verkkosivut ja graafinen suunnittelu',
}
export enum EMisc {
  en = 'Misc',
  es = 'Varios',
  fr = 'Divers',
  de = 'Verschiedenes',
  pt = 'Diversos',
  cs = 'Různé',
  fi = 'Sekalaista',
}
export enum EWebsite {
  en = 'Website',
  es = 'Sitio web',
  fr = 'Site web',
  de = 'Webseite',
  pt = 'Site',
  cs = 'Webová stránka',
  fi = 'Verkkosivusto',
}
export enum EWebsiteDesign {
  en = 'Website design',
  es = 'Diseño de sitio web',
  fr = 'Conception de site web',
  de = 'Webdesign',
  pt = 'Design de site',
  cs = 'Návrh webových stránek',
  fi = 'Verkkosivujen suunnittelu',
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
export enum EName {
  en = 'Name',
  es = 'Nombre',
  fr = 'Nom',
  de = 'Name',
  pt = 'Nome',
  cs = 'Jméno',
  fi = 'Nimi',
}
export enum EMoreInformation {
  en = 'More information',
  es = 'Más información',
  fr = 'Plus d informations',
  de = 'Mehr Informationen',
  pt = 'Mais informações',
  cs = 'Více informací',
  fi = 'Lisätietoja',
}
export enum ERequestsIdeasAndLinksForInspiration {
  en = 'Requests, ideas and links for inspiration',
  es = 'Solicitudes, ideas y enlaces para inspiración',
  fr = 'Demandes, idées et liens pour l inspiration',
  de = 'Anfragen, Ideen und Links zur Inspiration',
  pt = 'Pedidos, ideias e links para inspiração',
  cs = 'Žádosti, nápady a odkazy pro inspiraci',
  fi = 'Toiveita, ideoita ja linkkejä inspiraatioon',
}
export enum EInfo {
  en = 'Info',
  es = 'Información',
  fr = 'Info',
  de = 'Info',
  pt = 'Info',
  cs = 'Info',
  fi = 'Info',
}
export enum ERememberToSave {
  en = 'Remember to save!',
  es = '¡Recuerda guardar!',
  fr = 'N oubliez pas de sauvegarder!',
  de = 'Vergessen Sie nicht zu speichern!',
  pt = 'Não se esqueça de salvar!',
  cs = 'Nezapomeňte uložit!',
  fi = 'Muista tallentaa!',
}
export enum ERemember {
  en = 'Remember',
  es = 'Recordar',
  fr = 'Se souvenir',
  de = 'Erinnern',
  pt = 'Lembrar',
  cs = 'Pamatovat',
  fi = 'Muista',
}
export enum EHide {
  en = 'Hide',
  es = 'Ocultar',
  fr = 'Cacher',
  de = 'Verstecken',
  pt = 'Esconder',
  cs = 'Skrýt',
  fi = 'Piilota',
}
export enum EShow {
  en = 'Show',
  es = 'Mostrar',
  fr = 'Montrer',
  de = 'Anzeigen',
  pt = 'Mostrar',
  cs = 'Ukázat',
  fi = 'Näytä',
}
export enum EStatus {
  en = 'Status',
  es = 'Estado',
  fr = 'Statut',
  de = 'Status',
  pt = 'Status',
  cs = 'Stav',
  fi = 'Tila',
}
export enum EIAcceptThe {
  en = 'I accept the',
  es = 'Acepto los',
  fr = 'J accepte les',
  de = 'Ich akzeptiere die',
  pt = 'Aceito os',
  cs = 'Přijímám',
  fi = 'Hyväksyn',
}
export enum ETermsOfServiceLink {
  en = 'terms of service',
  es = 'términos del servicio',
  fr = 'conditions de service',
  de = 'Nutzungsbedingungen',
  pt = 'termos de serviço',
  cs = 'obchodní podmínky',
  fi = 'käyttöehdot',
}
export enum ETermsOfService {
  en = 'Terms of Service',
  es = 'Términos del servicio',
  fr = 'Conditions de service',
  de = 'Nutzungsbedingungen',
  pt = 'Termos de serviço',
  cs = 'Obchodní podmínky',
  fi = 'Käyttöehdot',
}
export enum ESeeAlso {
  en = 'See also',
  es = 'Ver también',
  fr = 'Voir aussi',
  de = 'Siehe auch',
  pt = 'Veja também',
  cs = 'Viz také',
  fi = 'Katso myös',
}
export enum ETheFollowingAppliesToLoggingInAndStoringUserInfo {
  en = 'The following information applies to logging in and storing user information.',
  es = 'La siguiente información se aplica a iniciar sesión y almacenar información del usuario.',
  fr = 'Les informations suivantes s appliquent à la connexion et au stockage des informations utilisateur.',
  de = 'Die folgenden Informationen gelten für das Einloggen und Speichern von Benutzerinformationen.',
  pt = 'As seguintes informações se aplicam ao login e ao armazenamento de informações do usuário.',
  cs = 'Následující informace se vztahují k přihlášení a ukládání informací o uživatelích.',
  fi = 'Seuraavat tiedot koskevat sivuille kirjautumista ja käyttäjätietojen tallentamista.',
}
export enum EClarifications {
  en = 'Clarifications',
  es = 'Aclaraciones',
  fr = 'Clarifications',
  de = 'Klarstellungen',
  pt = 'Clarificações',
  cs = 'Ujasnění',
  fi = 'Selvennyksiä',
}
export enum EFourSidedJewels {
  en = 'Four-sided jewels',
  es = 'Joyas de cuatro lados',
  fr = 'Joyaux à quatre côtés',
  de = 'Vierseitige Juwelen',
  pt = 'Joias de quatro lados',
  cs = 'Čtyřstranné šperky',
  fi = 'Nelisivuiset jalokivet',
}
export enum EEightSidedJewels {
  en = 'Eight-sided jewels',
  es = 'Joyas de ocho lados',
  fr = 'Joyaux à huit côtés',
  de = 'Achtseitige Juwelen',
  pt = 'Joias de oito lados',
  cs = 'Osmistranné šperky',
  fi = 'Kahdeksansivuiset jalokivet',
}
export enum EJokePage {
  en = 'Joke page',
  es = 'Página de chiste',
  fr = 'Page de blague',
  de = 'Witzseite',
  pt = 'Página de piada',
  cs = 'Stránka vtipů',
  fi = 'Vitsisivu',
}
export enum EContains {
  en = 'Contains',
  es = 'Contiene',
  fr = 'Contient',
  de = 'Enthält',
  pt = 'Contém',
  cs = 'Obsahuje',
  fi = 'Sisältää',
}
export enum EActive {
  en = 'Active',
  es = 'Activo',
  fr = 'Actif',
  de = 'Aktiv',
  pt = 'Ativo',
  cs = 'Aktivní',
  fi = 'Aktiivinen',
}
