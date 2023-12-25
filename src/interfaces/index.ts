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
export enum EPleaseCheckYourEmailForYourVerificationLink {
  en = 'Please check your email for your verification link',
  es = 'Por favor revise su correo electrónico para obtener su enlace de verificación',
  fr = 'Veuillez vérifier votre e-mail pour votre lien de vérification',
  de = 'Bitte überprüfen Sie Ihre E-Mail auf Ihren Bestätigungslink',
  pt = 'Verifique seu e-mail para o link de verificação',
  cs = 'Zkontrolujte svůj e-mail na ověřovací odkaz',
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
export enum EExitToMainSite {
  en = 'Exit to Main Site',
  es = 'Salir al sitio principal',
  fr = 'Quitter le site principal',
  de = 'Zum Hauptstandort wechseln',
  pt = 'Sair para o site principal',
  cs = 'Ukončit na hlavní stránku',
}
export enum EApp {
  en = 'App',
  es = 'Aplicación',
  fr = 'Application',
  de = 'Anwendung',
  pt = 'Aplicativo',
  cs = 'Aplikace',
}
export enum EWelcome {
  en = 'Welcome',
  es = 'Bienvenido',
  fr = 'Bienvenue',
  de = 'Willkommen',
  pt = 'Bem-vinda',
  cs = 'Vítejte',
}
export enum EToTheReactSiteOfJenniinaFi {
  en = 'to the React site of jenniina.fi',
  es = 'al sitio React de jenniina.fi',
  fr = 'sur le site React de jenniina.fi',
  de = 'auf der React-Website von jenniina.fi',
  pt = 'ao site React da jenniina.fi',
  cs = 'na React webu jenniina.fi',
}
export enum EUserEdit {
  en = 'User Edit',
  es = 'Editar Usuario',
  fr = "Modifier l'utilisateur",
  de = 'Benutzer bearbeiten',
  pt = 'Editar Usuário',
  cs = 'Upravit Uživatele',
}
export enum EAbout {
  en = 'About',
  es = 'Acerca de',
  fr = 'À propos de',
  de = 'Über',
  pt = 'Sobre',
  cs = 'O',
}
export enum EAboutThisSite {
  en = 'This is a sub-site of jenniina.fi made with and focusing on ReactJS. Other porfolio items may be found at the portfolio section of the main site.',
  es = 'Este es un sub-sitio de jenniina.fi hecho con y enfocado en ReactJS. Otros elementos de cartera se pueden encontrar en la sección de cartera del sitio principal.',
  fr = "Ceci est un sous-site de jenniina.fi fait avec et axé sur ReactJS. D'autres éléments de portefeuille peuvent être trouvés dans la section portefeuille du site principal.",
  de = 'Dies ist eine Unterseite von jenniina.fi, die mit ReactJS erstellt und darauf fokussiert wurde. Weitere Portfolio-Elemente finden Sie im Portfolio-Bereich der Hauptseite.',
  pt = 'Este é um sub-site da jenniina.fi feito com e focado em ReactJS. Outros itens de portfólio podem ser encontrados na seção de portfólio do site principal.',
  cs = 'Toto je sub-site jenniina.fi vyrobený s důrazem na ReactJS. Další položky portfolia najdete v sekci portfolia hlavního webu.',
}
export enum EThisSite {
  en = 'this site',
  es = 'este sitio',
  fr = 'ce site',
  de = 'diese Seite',
  pt = 'este site',
  cs = 'tento web',
}
export enum EGithubRepository {
  en = 'Github Repository',
  es = 'Repositorio Github',
  fr = 'Dépôt Github',
  de = 'Github Repository',
  pt = 'Repositório Github',
  cs = 'Github Repository',
}
//Features of this site
export enum EFeaturesOfThisSite {
  en = 'Features of this site',
  es = 'Características de este sitio',
  fr = 'Fonctionnalités de ce site',
  de = 'Funktionen dieser Seite',
  pt = 'Recursos deste site',
  cs = 'Funkce tohoto webu',
}
export enum EContact {
  en = 'Contact',
  es = 'Contacto',
  fr = 'Contact',
  de = 'Kontakt',
  pt = 'Contato',
  cs = 'Kontakt',
}
export enum ELetsCollaborate {
  en = "Let's collaborate",
  es = 'Colaboremos',
  fr = 'Collaborons',
  de = 'Lass uns zusammenarbeiten',
  pt = 'Vamos colaborar',
  cs = 'Spolupracujme',
}
export enum ESettings {
  en = 'Settings',
  es = 'Configuraciones',
  fr = 'Paramètres',
  de = 'Einstellungen',
  pt = 'Configurações',
  cs = 'Nastavení',
}
export enum ESiteSettings {
  en = 'Site Settings',
  es = 'Configuraciones del sitio',
  fr = 'Paramètres du site',
  de = 'Website-Einstellungen',
  pt = 'Configurações do site',
  cs = 'Nastavení webu',
}
export enum ESeeSettingsAtMenuBar {
  en = 'See Settings at menu bar',
  es = 'Ver Configuraciones en la barra de menú',
  fr = 'Voir les paramètres dans la barre de menu',
  de = 'Siehe Einstellungen in der Menüleiste',
  pt = 'Ver Configurações na barra de menu',
  cs = 'Zobrazit nastavení v nabídce',
}
export enum EIcon {
  en = 'Icon',
  es = 'Icono',
  fr = 'Icône',
  de = 'Symbol',
  pt = 'Ícone',
  cs = 'Ikona',
}
export enum ELanguageSelect {
  en = 'Language Select',
  es = 'Selección de idioma',
  fr = 'Sélection de langue',
  de = 'Sprachauswahl',
  pt = 'Seleção de idioma',
  cs = 'Výběr jazyka',
}
export enum ELightDarkModeButton {
  en = 'Light/Dark mode button',
  es = 'Botón de modo claro/oscuro',
  fr = 'Bouton Light/Dark mode',
  de = 'Light/Dark mode button',
  pt = 'Botão Light/Dark mode',
  cs = 'Tlačítko Light/Dark mode',
}
export enum EFourStylesAltogether {
  en = 'Four styles altogether',
  es = 'Cuatro estilos en total',
  fr = 'Quatre styles au total',
  de = 'Vier Stile insgesamt',
  pt = 'Quatro estilos no total',
  cs = 'Celkem čtyři styly',
}
export enum ELogInAndRegisterButtons {
  en = 'Log In and Register buttons',
  es = 'Botones de inicio de sesión y registro',
  fr = "Boutons de connexion et d'inscription",
  de = 'Anmelde- und Registrierungsschaltflächen',
  pt = 'Botões de login e registro',
  cs = 'Tlačítka Přihlásit a Registrovat',
}
export enum EButtonToToggleBetweenNavigationStyles {
  en = 'Button to toggle between navigation styles',
  es = 'Botón para alternar entre estilos de navegación',
  fr = 'Bouton pour basculer entre les styles de navigation',
  de = 'Schaltfläche zum Umschalten zwischen Navigationsstilen',
  pt = 'Botão para alternar entre estilos de navegação',
  cs = 'Tlačítko pro přepínání mezi styly navigace',
}
//Two styles at small screen size and two at large screen size
export enum ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize {
  en = 'Two styles at small screen size and two at large screen size',
  es = 'Dos estilos en tamaño de pantalla pequeña y dos en tamaño de pantalla grande',
  fr = 'Deux styles en petit écran et deux en grand écran',
  de = 'Zwei Stile bei kleiner Bildschirmgröße und zwei bei großer Bildschirmgröße',
  pt = 'Dois estilos em tamanho de tela pequena e dois em tamanho de tela grande',
  cs = 'Dva styly v malé velikosti obrazovky a dva ve velké velikosti obrazovky',
}
export enum EHeroSection {
  en = 'Hero/Intro section',
  es = 'Sección de introducción',
  fr = "Section d'introduction",
  de = 'Einführungsabschnitt',
  pt = 'Seção de introdução',
  cs = 'Úvodní sekce',
}
export enum EInteractiveElements {
  en = 'Interactive elements',
  es = 'Elementos interactivos',
  fr = 'Éléments interactifs',
  de = 'Interaktive Elemente',
  pt = 'Elementos interativos',
  cs = 'Interaktivní prvky',
}
export enum EBubbles {
  en = 'Bubbles',
  es = 'Burbujas',
  fr = 'Bulles',
  de = 'Blasen',
  pt = 'Bolhas',
  cs = 'Bubliny',
}
export enum ESeeTheTopOfTheCurrentPage {
  en = 'See the top of the current page',
  es = 'Ver la parte superior de la página actual',
  fr = 'Voir le haut de la page actuelle',
  de = 'Siehe die Spitze der aktuellen Seite',
  pt = 'Veja o topo da página atual',
  cs = 'Zobrazit vrchol aktuální stránky',
}
export enum EHoverFocusAnimation {
  en = 'Hover/focus animation',
  es = 'Animación de desplazamiento/foco',
  fr = 'Animation de survol/focus',
  de = 'Hover/focus animation',
  pt = 'Animação de foco de foco',
  cs = 'Animace přejetí/focus',
}
export enum ERemoveWithClickOrEnterWhenFocused {
  en = 'Remove with click or Enter when focused',
  es = 'Eliminar con clic o Enter cuando está enfocado',
  fr = 'Supprimer avec un clic ou Entrée lorsque vous êtes concentré',
  de = 'Mit Klick oder Eingabe entfernen, wenn der Fokus liegt',
  pt = 'Remova com clique ou Enter quando estiver focado',
  cs = 'Odstraňte kliknutím nebo stisknutím klávesy Enter, když je zaměřen',
}
export enum EPointerEnterDirectionAwareMovement {
  en = 'Pointer-enter direction aware movement',
  es = 'Movimiento consciente de la dirección de entrada del puntero',
  fr = "Mouvement conscient de la direction d'entrée du pointeur",
  de = 'Pointer-enter Richtungsbewegung',
  pt = 'Movimento consciente da direção de entrada do ponteiro',
  cs = 'Pohyb vědomý směru vstupu ukazatele',
}
//Keyboard focus: move items with arrow keys
export enum EKeyboardFocusMoveItemsWithArrowKeys {
  en = 'Keyboard focus: move items with arrow keys',
  es = 'Enfoque del teclado: mueva los elementos con las teclas de flecha',
  fr = 'Focus clavier: déplacez les éléments avec les touches fléchées',
  de = 'Tastaturfokus: Bewegen Sie Elemente mit den Pfeiltasten',
  pt = 'Foco do teclado: mova itens com as teclas de seta',
  cs = 'Klávesnice: přesuňte položky pomocí šipek',
}
//Geometric shapes
export enum EGeometricShapes {
  en = 'Geometric shapes',
  es = 'Formas geométricas',
  fr = 'Formes géométriques',
  de = 'Geometrische Formen',
  pt = 'Formas geométricas',
  cs = 'Geometrické tvary',
}
export enum EElementsRotateToFaceCursor {
  en = 'Elements rotate to face cursor',
  es = 'Los elementos giran para enfrentar el cursor',
  fr = 'Les éléments tournent pour faire face au curseur',
  de = 'Elemente drehen sich, um dem Cursor gegenüberzustehen',
  pt = 'Elementos giram para enfrentar o cursor',
  cs = 'Prvky se otáčejí, aby čelily kurzoru',
}
export enum EMovementAccordingToPointerEnterDirection {
  en = "Movement according to pointer's enter direction",
  es = 'Movimiento según la dirección de entrada del puntero',
  fr = "Mouvement selon la direction d'entrée du pointeur",
  de = 'Bewegung entsprechend der Eingaberichtung des Zeigers',
  pt = 'Movimento de acordo com a direção de entrada do ponteiro',
  cs = 'Pohyb podle směru vstupu ukazatele',
}
export enum EPortfolio {
  en = 'Portfolio',
  es = 'Portafolio',
  fr = 'Portfolio',
  de = 'Portfolio',
  pt = 'Portfólio',
  cs = 'Portfolio',
}
export enum EQuiz {
  en = 'Quiz',
  es = 'Cuestionario',
  fr = 'Quiz',
  de = 'Quiz',
  pt = 'Questionário',
  cs = 'Kvíz',
}
export enum EQuizApp {
  en = 'Quiz App',
  es = 'Aplicación de cuestionario',
  fr = 'Application de quiz',
  de = 'Quiz-App',
  pt = 'Aplicativo de questionário',
  cs = 'Aplikace kvízu',
}
export enum ETestYourKnowledge {
  en = 'Test your knowledge',
  es = 'Prueba tu conocimiento',
  fr = 'Testez vos connaissances',
  de = 'Testen Sie Ihr Wissen',
  pt = 'Teste seu conhecimento',
  cs = 'Otestujte své znalosti',
}
export enum EJokes {
  en = 'Jokes',
  es = 'Chistes',
  fr = 'Blagues',
  de = 'Witze',
  pt = 'Piadas',
  cs = 'Vtipy',
}
export enum EToDo {
  en = 'ToDo',
  es = 'Quehacer',
  fr = 'Faire',
  de = 'Zu tun',
  pt = 'Fazer',
  cs = 'Dělat',
}
export enum EBlob {
  en = 'Blob',
  es = 'Bolita',
  fr = 'Boule',
  de = 'Kugel',
  pt = 'Bola',
  cs = 'Koule',
}
export enum EBlobs {
  en = 'Blobs',
  es = 'Bolitas',
  fr = 'Boules',
  de = 'Kugeln',
  pt = 'Bolas',
  cs = 'Koule',
}
export enum EBlobApp {
  en = 'Blob App',
  es = 'Aplicación de bolitas',
  fr = 'Application de boules',
  de = 'Kugel-App',
  pt = 'Aplicativo de bola',
  cs = 'Aplikace Blob',
}
//Make blob art your thing
export enum EBlobAppSlogan {
  en = 'Make blob art your thing',
  es = 'Haz que el arte de las bolitas sea lo tuyo',
  fr = "Faites de l'art blob votre truc",
  de = 'Machen Sie Blob Art zu Ihrem Ding',
  pt = 'Faça da arte de blob sua coisa',
  cs = 'Udělejte z blob art svou věc',
}
export enum EDraggable {
  en = 'Draggable',
  es = 'Arrastrable',
  fr = 'Déplaçable',
  de = 'Verschiebbar',
  pt = 'Arrastável',
  cs = 'Přetahovatelný',
}
export enum EDraggableBlobs {
  en = 'Draggable blobs',
  es = 'Bolitas arrastrables',
  fr = 'Boules déplaçables',
  de = 'Verschiebbare Kugeln',
  pt = 'Bolas arrastáveis',
  cs = 'Přetahovatelné koule',
}
export enum EDragAndDrop {
  en = 'Drag and Drop',
  es = 'Arrastrar y Soltar',
  fr = 'Glisser Déposer',
  de = 'Ziehen und Ablegen',
  pt = 'Arrastar e Soltar',
  cs = 'Táhnout a Pustit',
}
export enum ECustomSelect {
  en = 'Custom Select',
  es = 'Selección Personalizada',
  fr = 'Sélection Personnalisée',
  de = 'Benutzerdefinierte Auswahl',
  pt = 'Seleção Personalizada',
  cs = 'Vlastní Výběr',
}
export enum EMultistepForm {
  en = 'Multistep Form',
  es = 'Formulario Multietapa',
  fr = 'Formulaire Multistep',
  de = 'Mehrstufiges Formular',
  pt = 'Formulário Multistep',
  cs = 'Vícekrokový Formulář',
}
export enum ELightMode {
  en = 'Light Mode',
  es = 'Modo Claro',
  fr = 'Mode Lumière',
  de = 'Lichtmodus',
  pt = 'Modo Claro',
  cs = 'Světlý Režim',
}
export enum EDarkMode {
  en = 'Dark Mode',
  es = 'Modo Oscuro',
  fr = 'Mode Sombre',
  de = 'Dunkler Modus',
  pt = 'Modo Escuro',
  cs = 'Tmavý Režim',
}
export enum ENavStyle {
  en = 'Nav Style',
  es = 'Nav Estilo',
  fr = 'Nav Style',
  de = 'Nav Stil',
  pt = 'Nav Estilo',
  cs = 'Nav Styl',
}
export enum EMenu {
  en = 'Menu',
  es = 'Menú',
  fr = 'Menu',
  de = 'Menü',
  pt = 'Menu',
  cs = 'Menu',
}
export enum EScrollToTheLeft {
  en = 'Scroll to the left',
  es = 'Desplázate hacia la izquierda',
  fr = 'Faites défiler vers la gauche',
  de = 'Nach links scrollen',
  pt = 'Role para a esquerda',
  cs = 'Posuňte se doleva',
}
export enum EScrollToTheRight {
  en = 'Scroll to the right',
  es = 'Desplázate hacia la derecha',
  fr = 'Faites défiler vers la droite',
  de = 'Nach rechts scrollen',
  pt = 'Role para a direita',
  cs = 'Posuňte se doprava',
}
export enum EScrollToTheTop {
  en = 'Scroll to the top',
  es = 'Desplázate hacia arriba',
  fr = 'Faites défiler vers le haut',
  de = 'Nach oben scrollen',
  pt = 'Role para o topo',
  cs = 'Posuňte se nahoru',
}
export enum ESkipToMainNavigation {
  en = 'Skip to main navigation',
  es = 'Saltar a la navegación principal',
  fr = 'Passer à la navigation principale',
  de = 'Zur Hauptnavigation springen',
  pt = 'Pular para a navegação principal',
  cs = 'Přejít na hlavní navigaci',
}
export enum ESkipToMainContent {
  en = 'Skip to main content',
  es = 'Saltar al contenido principal',
  fr = 'Passer au contenu principal',
  de = 'Zum Hauptinhalt springen',
  pt = 'Pular para o conteúdo principal',
  cs = 'Přejít na hlavní obsah',
}
export enum ESkipToFooter {
  en = 'Skip to footer',
  es = 'Saltar al pie de página',
  fr = 'Passer au pied de page',
  de = 'Zum Fußbereich springen',
  pt = 'Pular para o rodapé',
  cs = 'Přejít na zápatí',
}

export enum EThisSiteFocusesOnReactApplications {
  en = 'This site focuses on React applications. Non-React porfolio items may be found at the portfolio section of the main site.',
  es = 'Este sitio se centra en aplicaciones React. Los elementos de cartera no React se pueden encontrar en la sección de cartera del sitio principal.',
  fr = 'Ce site se concentre sur les applications React. Les éléments de portefeuille non React se trouvent dans la section portefeuille du site principal.',
  de = 'Diese Seite konzentriert sich auf React-Anwendungen. Nicht-React-Porfolio-Elemente finden Sie im Portfolio-Bereich der Hauptseite.',
  pt = 'Este site se concentra em aplicativos React. Os itens de portfólio não React podem ser encontrados na seção de portfólio do site principal.',
  cs = 'Tato stránka se zaměřuje na aplikace React. Ne-React položky portfolia najdete v sekci portfolia hlavního webu.',
}
export enum EMainSite {
  en = 'Main Site',
  es = 'Sitio Principal',
  fr = 'Site Principal',
  de = 'Hauptseite',
  pt = 'Site Principal',
  cs = 'Hlavní stránka',
}
export enum EReactSpecificAppsMadeWithViteAndTypescript {
  en = 'React-specific apps made with Vite and Typescript. Each app is designed to be both pointer- and keyboard-accessible.',
  es = 'Aplicaciones específicas de React hechas con Vite y Typescript. Cada aplicación está diseñada para ser accesible tanto con puntero como con teclado.',
  fr = 'Applications spécifiques à React réalisées avec Vite et Typescript. Chaque application est conçue pour être accessible à la fois avec le pointeur et le clavier.',
  de = 'React-spezifische Apps mit Vite und Typescript. Jede App ist so konzipiert, dass sie sowohl mit dem Zeiger als auch mit der Tastatur zugänglich ist.',
  pt = 'Aplicativos específicos do React feitos com Vite e Typescript. Cada aplicativo é projetado para ser acessível tanto com o ponteiro quanto com o teclado.',
  cs = 'Aplikace specifické pro React vyrobené s Vite a Typescript. Každá aplikace je navržena tak, aby byla přístupná jak ukazovátkem, tak klávesnicí.',
}
export enum EDependencies {
  en = 'Dependencies',
  es = 'Dependencias',
  fr = 'Dépendances',
  de = 'Abhängigkeiten',
  pt = 'Dependências',
  cs = 'Závislosti',
}
export enum EQuizAppIntro {
  en = 'A quiz app with three difficulty levels, a timer, and a highscore list. The app uses the Open Trivia Database API to fetch questions.',
  es = 'Una aplicación de cuestionario con tres niveles de dificultad, un temporizador y una lista de puntuaciones altas. La aplicación utiliza la API de la base de datos de preguntas abiertas para recuperar preguntas.',
  fr = "Une application de quiz avec trois niveaux de difficulté, une minuterie et une liste de scores élevés. L'application utilise l'API de la base de données de quiz ouverte pour récupérer des questions.",
  de = 'Eine Quiz-App mit drei Schwierigkeitsgraden, einem Timer und einer Highscore-Liste. Die App verwendet die Open Trivia Database API, um Fragen abzurufen.',
  pt = 'Um aplicativo de questionário com três níveis de dificuldade, um temporizador e uma lista de pontuações altas. O aplicativo usa a API do banco de dados de perguntas abertas para buscar perguntas.',
  cs = 'Aplikace kvízu se třemi obtížnostmi, časovačem a seznamem nejlepších výsledků. Aplikace používá API databáze otázek Open Trivia k získání otázek.',
}
export enum EJokesAppIntro {
  en = 'A joke app with customizable options that uses the JokeAPI to fetch jokes.',
  es = 'Una aplicación de chistes con opciones personalizables que utiliza JokeAPI para buscar chistes.',
  fr = 'Une application de blagues avec des options personnalisables qui utilise JokeAPI pour récupérer des blagues.',
  de = 'Eine Witze-App mit anpassbaren Optionen, die JokeAPI verwendet, um Witze abzurufen.',
  pt = 'Um aplicativo de piadas com opções personalizáveis que usa o JokeAPI para buscar piadas.',
  cs = 'Aplikace vtipů s možnostmi přizpůsobení, která používá JokeAPI k získání vtipů.',
}
export enum EBlobAppIntro {
  en = 'A custom draggables app that uses the react-draggable package.',
  es = 'Una aplicación de arrastrables personalizada que utiliza el paquete react-draggable.',
  fr = 'Une application de glisser-déposer personnalisée qui utilise le package react-draggable.',
  de = 'Eine benutzerdefinierte Drag & Drop-App, die das Paket react-draggable verwendet.',
  pt = 'Um aplicativo de arrastáveis personalizado que usa o pacote react-draggable.',
  cs = 'Vlastní aplikace přetahovatelných, která používá balíček react-draggable.',
}
export enum EDragAndDropAppIntro {
  en = 'A custom drag-and-drop app.',
  es = 'Una aplicación de arrastrar y soltar personalizada.',
  fr = 'Une application de glisser-déposer personnalisée.',
  de = 'Eine benutzerdefinierte Drag & Drop-App.',
  pt = 'Um aplicativo de arrastar e soltar personalizado.',
  cs = 'Vlastní aplikace přetahování a přetažení.',
}
export enum ETodoAppIntro {
  en = 'A todo-app using localStorage and Mongo-DB when the user is logged in.',
  es = 'Una aplicación de tareas que utiliza localStorage y Mongo-DB cuando el usuario está conectado.',
  fr = "Une application todo utilisant localStorage et Mongo-DB lorsque l'utilisateur est connecté.",
  de = 'Eine Todo-App, die localStorage und Mongo-DB verwendet, wenn der Benutzer angemeldet ist.',
  pt = 'Um aplicativo de tarefas usando localStorage e Mongo-DB quando o usuário está conectado.',
  cs = 'Aplikace todo pomocí localStorage a Mongo-DB, když je uživatel přihlášen.',
}
export enum ECustomSelectIntro {
  en = 'A custom select component that can be used as a single- or multiple-select alternative.',
  es = 'Un componente de selección personalizado que se puede utilizar como una alternativa de selección única o múltiple.',
  fr = 'Un composant de sélection personnalisé qui peut être utilisé comme une alternative de sélection unique ou multiple.',
  de = 'Ein benutzerdefiniertes Auswahlelement, das als Einzel- oder Mehrfachauswahlalternative verwendet werden kann.',
  pt = 'Um componente de seleção personalizado que pode ser usado como uma alternativa de seleção única ou múltipla.',
  cs = 'Vlastní výběrový prvek, který lze použít jako jednotlivý nebo vícevýběrový prvek.',
}
export enum EMultistepFormIntro {
  en = 'A three-step fully functional contact form.',
  es = 'Un formulario de contacto totalmente funcional de tres pasos.',
  fr = 'Un formulaire de contact entièrement fonctionnel en trois étapes.',
  de = 'Ein dreistufiges voll funktionsfähiges Kontaktformular.',
  pt = 'Um formulário de contato totalmente funcional em três etapas.',
  cs = 'Třístupňový plně funkční kontaktní formulář.',
}
export enum EKeyboardUse {
  en = 'Keyboard use',
  es = 'Uso del teclado',
  fr = 'Utilisation du clavier',
  de = 'Tastatur verwenden',
  pt = 'Uso do teclado',
  cs = 'Použití klávesnice',
}
export enum EKeyboardAccessible {
  en = 'Keyboard accessible',
  es = 'Accesible con teclado',
  fr = 'Accessible au clavier',
  de = 'Tastaturzugänglich',
  pt = 'Acessível por teclado',
  cs = 'Přístupné klávesnicí',
}
//Clarification or feedback
export enum EClarificationOrFeedback {
  en = 'Clarification or feedback',
  es = 'Aclaración o comentarios',
  fr = 'Clarification ou commentaires',
  de = 'Klärung oder Feedback',
  pt = 'Esclarecimento ou feedback',
  cs = 'Objasnění nebo zpětná vazba',
}
export enum EOptional {
  en = 'Optional',
  es = 'Opcional',
  fr = 'Optionnel',
  de = 'Optional',
  pt = 'Opcional',
  cs = 'Volitelný',
}
//It is alright to send the entered information to Jenniina
export enum EItIsAlrightToSendTheEnteredInformationToJenniina {
  en = 'It is alright to send the entered information to Jenniina',
  es = 'Está bien enviar la información ingresada a Jenniina',
  fr = "Il est bon d'envoyer les informations saisies à Jenniina",
  de = 'Es ist in Ordnung, die eingegebenen Informationen an Jenniina zu senden',
  pt = 'Está tudo bem enviar as informações inseridas para Jenniina',
  cs = 'Je v pořádku poslat zadané informace Jenniině',
}
export enum EYes {
  en = 'Yes',
  es = 'Sí',
  fr = 'Oui',
  de = 'Ja',
  pt = 'Sim',
  cs = 'Ano',
}
export enum ENo {
  en = 'No',
  es = 'No',
  fr = 'Non',
  de = 'Nein',
  pt = 'Não',
  cs = 'Ne',
}
export enum EThankYouForYourMessage {
  en = 'Thank you for your message!',
  es = '¡Gracias por tu mensaje!',
  fr = 'Merci pour votre message!',
  de = 'Vielen Dank für Ihre Nachricht!',
  pt = 'Obrigado pela sua mensagem!',
  cs = 'Děkuji za vaši zprávu!',
}
export enum EAccessibility {
  en = 'Accessibility',
  es = 'Accesibilidad',
  fr = 'Accessibilité',
  de = 'Barrierefreiheit',
  pt = 'Acessibilidade',
  cs = 'Přístupnost',
}
export enum EAppearance {
  en = 'Appearance',
  es = 'Apariencia',
  fr = 'Apparence',
  de = 'Aussehen',
  pt = 'Aparência',
  cs = 'Vzhled',
}
export enum EText {
  en = 'Text',
  es = 'Texto',
  fr = 'Texte',
  de = 'Text',
  pt = 'Texto',
  cs = 'Text',
}
export enum EAnimation {
  en = 'Animation',
  es = 'Animación',
  fr = 'Animation',
  de = 'Animation',
  pt = 'Animação',
  cs = 'Animace',
}
export enum ENavigation {
  en = 'Navigation',
  es = 'Navegación',
  fr = 'Navigation',
  de = 'Navigation',
  pt = 'Navegação',
  cs = 'Navigace',
}
export enum EButtons {
  en = 'Buttons',
  es = 'Botones',
  fr = 'Boutons',
  de = 'Tasten',
  pt = 'Botões',
  cs = 'Tlačítka',
}
export enum EMultiStepContactForm {
  en = 'Multi-step contact form',
  es = 'Formulario de contacto de varios pasos',
  fr = 'Formulaire de contact à plusieurs étapes',
  de = 'Mehrstufiges Kontaktformular',
  pt = 'Formulário de contato de várias etapas',
  cs = 'Vícestupňový kontaktní formulář',
}
export enum EOther {
  en = 'Other',
  es = 'Otro',
  fr = 'Autre',
  de = 'Andere',
  pt = 'Outro',
  cs = 'Jiný',
}
export enum EClarifiedBelow {
  en = 'Clarified below',
  es = 'Aclarado a continuación',
  fr = 'Clarifié ci-dessous',
  de = 'Unten geklärt',
  pt = 'Esclarecido abaixo',
  cs = 'Objasněno níže',
}
export enum ENoIssues {
  en = 'No issues',
  es = 'Sin problemas',
  fr = 'Pas de problèmes',
  de = 'Keine Probleme',
  pt = 'Sem problemas',
  cs = 'Žádné problémy',
}
//Please select an option
export enum EPleaseSelectAnOption {
  en = 'Please select an option',
  es = 'Por favor seleccione una opción',
  fr = 'Veuillez sélectionner une option',
  de = 'Bitte wählen Sie eine Option',
  pt = 'Por favor selecione uma opção',
  cs = 'Vyberte prosím možnost',
}
export enum ENone {
  en = 'None',
  es = 'Ninguno',
  fr = 'Aucun',
  de = 'Keiner',
  pt = 'Nenhum',
  cs = 'Žádný',
}
// "Alien eyes"
export enum EAlienEyes {
  en = 'Alien eyes',
  es = 'Ojos de alienígena',
  fr = "Yeux d'alien",
  de = 'Alien Augen',
  pt = 'Olhos de alienígena',
  cs = 'Oči vetřelce',
}
export enum EEyes {
  en = 'Eyes',
  es = 'Ojos',
  fr = 'Yeux',
  de = 'Augen',
  pt = 'Olhos',
  cs = 'Oči',
}
export enum EDiamondShapes {
  en = 'Diamond shapes',
  es = 'Formas de diamante',
  fr = 'Formes de diamant',
  de = 'Diamantformen',
  pt = 'Formas de diamante',
  cs = 'Tvary diamantů',
}
export enum EYouMaySelectMultipleOptions {
  en = 'You may select multiple options',
  es = 'Puede seleccionar varias opciones',
  fr = 'Vous pouvez sélectionner plusieurs options',
  de = 'Sie können mehrere Optionen auswählen',
  pt = 'Você pode selecionar várias opções',
  cs = 'Můžete vybrat více možností',
}
//'Please offer some feedback'
export enum EPleaseOfferSomeFeedback {
  en = 'Please offer some feedback',
  es = 'Por favor ofrezca algunos comentarios',
  fr = 'Veuillez offrir des commentaires',
  de = 'Bitte geben Sie Feedback',
  pt = 'Por favor, ofereça algum feedback',
  cs = 'Nabídněte prosím zpětnou vazbu',
}
export enum ESurvey {
  en = 'Survey',
  es = 'Encuesta',
  fr = 'Enquête',
  de = 'Umfrage',
  pt = 'Pesquisa',
  cs = 'Průzkum',
}
export enum EInstructions {
  en = 'Instructions',
  es = 'Instrucciones',
  fr = 'Instructions',
  de = 'Anleitung',
  pt = 'Instruções',
  cs = 'Instrukce',
}
//Note!
export enum ENote {
  en = 'Note!',
  es = '¡Nota!',
  fr = 'Remarque!',
  de = 'Hinweis!',
  pt = 'Nota!',
  cs = 'Poznámka!',
}
// 'User not updated'
export enum EUserNotUpdated {
  en = 'User not updated',
  es = 'Usuario no actualizado',
  fr = 'Utilisateur non mis à jour',
  de = 'Benutzer nicht aktualisiert',
  pt = 'Usuário não atualizado',
  cs = 'Uživatel neaktualizován',
}
export enum EUserUpdated {
  en = 'User updated',
  es = 'Usuario actualizado',
  fr = 'Utilisateur mis à jour',
  de = 'Benutzer aktualisiert',
  pt = 'Usuário atualizado',
  cs = 'Uživatel aktualizován',
}
//`Password must be at least 10 characters`
export enum EPasswordMustBeAtLeastTenCharacters {
  en = 'Password must be at least 10 characters',
  es = 'La contraseña debe tener al menos 10 caracteres',
  fr = 'Le mot de passe doit comporter au moins 10 caractères',
  de = 'Das Passwort muss mindestens 10 Zeichen lang sein',
  pt = 'A senha deve ter pelo menos 10 caracteres',
  cs = 'Heslo musí mít nejméně 10 znaků',
}
