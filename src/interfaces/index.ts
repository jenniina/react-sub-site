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
  users: {
    users: IUser[]
  }
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
}
export enum ELogout {
  en = 'Log Out',
  es = 'Cerrar sesión',
  fr = 'Se déconnecter',
  de = 'Ausloggen',
  pt = 'Sair',
  cs = 'Odhlásit se',
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
export enum EPleaseGiveValidEmail {
  en = 'Please give valid email',
  es = 'Por favor, dé un correo electrónico válido',
  fr = 'Veuillez donner un email valide',
  de = 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  pt = 'Por favor, dê um email válido',
  cs = 'Zadejte platný e-mail',
}
export enum EPasswordsDoNotMatch {
  en = 'Passwords do not match',
  es = 'Las contraseñas no coinciden',
  fr = 'Les mots de passe ne correspondent pas',
  de = 'Passwörter stimmen nicht überein',
  pt = 'As senhas não coincidem',
  cs = 'Hesla se neshodují',
}
export type EGeneric<T> = {
  [key in keyof T]: T[key]
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
export enum EUsername {
  en = 'Username',
  es = 'Nombre de usuario',
  fr = "Nom d'utilisateur",
  de = 'Nutzername',
  pt = 'Nome do usuário',
  cs = 'Uživatelské jméno',
}
export enum EUsernameIsTheSame {
  en = 'Username is the same as before',
  es = 'El nombre de usuario es el mismo que antes',
  fr = "Le nom d'utilisateur est le même qu'avant",
  de = 'Der Benutzername ist der gleiche wie zuvor',
  pt = 'O nome de usuário é o mesmo de antes',
  cs = 'Uživatelské jméno je stejné jako dříve',
}
export enum ECurrentNickname {
  en = 'Current Nickname',
  es = 'Apodo actual',
  fr = 'Surnom actuel',
  de = 'Aktueller Spitzname',
  pt = 'Apelido atual',
  cs = 'Aktuální přezdívka',
}
export enum ESelectAnOption {
  en = 'Select an option',
  es = 'Seleccione una opción',
  fr = 'Sélectionnez une option',
  de = 'Wählen Sie eine Option',
  pt = 'Selecione uma opção',
  cs = 'Vyberte možnost',
}
export enum EFeatures {
  en = 'Features',
  es = 'Caracteristicas',
  fr = 'Traits',
  de = 'Eigenschaften',
  pt = 'Características',
  cs = 'Vlastnosti',
}
export enum EAppTranslatedTo {
  en = 'App translated to',
  es = 'Aplicación traducida a',
  fr = 'Application traduite en',
  de = 'App übersetzt nach',
  pt = 'Aplicativo traduzido para',
  cs = 'Aplikace přeložena do',
}
export enum ESubmit {
  en = 'Submit',
  es = 'Enviar',
  fr = 'Soumettre',
  de = 'Einreichen',
  pt = 'Enviar',
  cs = 'Odeslat',
}
export enum EDelete {
  en = 'Delete',
  es = 'Eliminar',
  fr = 'Supprimer',
  de = 'Löschen',
  pt = 'Excluir',
  cs = 'Odstranit',
}
export enum EOnOff {
  en = 'On/Off',
  es = 'Encendido/Apagado',
  fr = 'Activé/Désactivé',
  de = 'Ein/Aus',
  pt = 'Ligado/Desligado',
  cs = 'Zapnuto/Vypnuto',
}
export enum EWarning {
  en = 'Warning',
  es = 'Advertencia',
  fr = 'Attention',
  de = 'Warnung',
  pt = 'Aviso',
  cs = 'Varování',
}
