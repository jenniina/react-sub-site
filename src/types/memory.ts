import { ReactElement } from 'react'

export enum CardType {
  letters = 'letters',
  numbers = 'numbers',
  icons = 'icons',
}
export interface CardTypeOptions {
  value: CardType
  label: string
}

export interface IHighScore {
  _id?: string
  levelKey: string
  time: number
  size: number
  type: string
  players: IPlayer[]
  createdAt?: string
  updatedAt?: string
}

export interface IPlayer {
  id: number
  name: string
  score: number
}

export interface IHighScoreResponse {
  success: boolean
  message: string
  highScore?: IHighScore
  highScores?: IHighScore[]
}

export type GameMode = 'solo' | 'duet'
export enum EGameMode {
  solo = 'solo',
  duet = 'duet',
}
export enum ESolo {
  en = 'Solo',
  es = 'Solitario',
  fr = 'Solo',
  de = 'Solo',
  pt = 'Solo',
  cs = 'Solo',
  fi = 'Soolo',
}
export enum EDuet {
  en = 'Duet',
  es = 'Dúo',
  fr = 'Duo',
  de = 'Duo',
  pt = 'Duo',
  cs = 'Duet',
  fi = 'Duetto',
}

export type HighScores = {
  [mode: string]: {
    [levelKey: string]: IHighScore[]
  }
}

export enum EHighScores {
  en = 'High Scores',
  es = 'Puntuaciones Altas',
  fr = 'Meilleurs Scores',
  de = 'Highscores',
  pt = 'Pontuações Altas',
  cs = 'Nejlepší skóre',
  fi = 'Huippupisteet',
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
export enum EMemoryGame {
  en = 'Memory Game',
  es = 'Juego de Memoria',
  fr = 'Jeu de Mémoire',
  de = 'Memory-Spiel',
  pt = 'Jogo da Memória',
  cs = 'Hra paměti',
  fi = 'Muistipeli',
}
export enum EMemoryGameIntro {
  en = 'Test your memory with this fun game!',
  es = '¡Pon a prueba tu memoria con este divertido juego!',
  fr = 'Testez votre mémoire avec ce jeu amusant!',
  de = 'Testen Sie Ihr Gedächtnis mit diesem lustigen Spiel!',
  pt = 'Teste sua memória com este jogo divertido!',
  cs = 'Vyzkoušejte si paměť s touto zábavnou hrou!',
  fi = 'Testaa muistiasi tällä hauskalla pelillä!',
}
export enum ECardType {
  en = 'Card Type',
  es = 'Tipo de Tarjeta',
  fr = 'Type de Carte',
  de = 'Kartentyp',
  pt = 'Tipo de Cartão',
  cs = 'Typ karty',
  fi = 'Korttityyppi',
}
export enum EIcons {
  en = 'Icons',
  es = 'Iconos',
  fr = 'Icônes',
  de = 'Symbole',
  pt = 'Ícones',
  cs = 'Ikony',
  fi = 'Kuvakkeet',
}
export enum ELetters {
  en = 'Letters',
  es = 'Letras',
  fr = 'Lettres',
  de = 'Buchstaben',
  pt = 'Letras',
  cs = 'Písmena',
  fi = 'Kirjaimet',
}
export enum ENumbers {
  en = 'Numbers',
  es = 'Números',
  fr = 'Nombres',
  de = 'Zahlen',
  pt = 'Números',
  cs = 'Čísla',
  fi = 'Numerot',
}
export enum EGridSize {
  en = 'Grid Size',
  es = 'Tamaño de la Cuadrícula',
  fr = 'Taille de la Grille',
  de = 'Rastergröße',
  pt = 'Tamanho da Grade',
  cs = 'Velikost mřížky',
  fi = 'Ruudukon koko',
}
export enum EPlayer {
  en = 'Player',
  es = 'Jugador',
  fr = 'Joueur',
  de = 'Spieler',
  pt = 'Jogador',
  cs = 'Hráč',
  fi = 'Pelaaja',
}
export enum EPlayers {
  en = 'Players',
  es = 'Jugadores',
  fr = 'Joueurs',
  de = 'Spieler',
  pt = 'Jogadores',
  cs = 'Hráči',
  fi = 'Pelaajia',
}
export enum EStartGame {
  en = 'Start Game',
  es = 'Comenzar Juego',
  fr = 'Démarrer le Jeu',
  de = 'Spiel Starten',
  pt = 'Iniciar Jogo',
  cs = 'Začít hru',
  fi = 'Aloita peli',
}
export enum ETime {
  en = 'Time',
  es = 'Tiempo',
  fr = 'Temps',
  de = 'Zeit',
  pt = 'Tempo',
  cs = 'Čas',
  fi = 'Aika',
}
export enum EScores {
  en = 'Scores',
  es = 'Puntuaciones',
  fr = 'Scores',
  de = 'Punkte',
  pt = 'Pontuações',
  cs = 'Skóre',
  fi = 'Pisteet',
}
export enum ETimeTaken {
  en = 'Time taken',
  es = 'Tiempo tomado',
  fr = 'Temps pris',
  de = 'Benötigte Zeit',
  pt = 'Tempo decorrido',
  cs = 'Uplynulý čas',
  fi = 'Kulunut aika',
}
export enum ESeconds {
  en = 'seconds',
  es = 'segundos',
  fr = 'secondes',
  de = 'Sekunden',
  pt = 'segundos',
  cs = 'sekund',
  fi = 'sekuntia',
}
export enum EDone {
  en = 'Done!',
  es = '¡Hecho!',
  fr = 'Terminé!',
  de = 'Erledigt!',
  pt = 'Feito!',
  cs = 'Hotovo!',
  fi = 'Valmis!',
}
export enum EBeginner {
  en = 'Beginner',
  es = 'Principiante',
  fr = 'Débutant',
  de = 'Anfänger',
  pt = 'Iniciante',
  cs = 'Začátečník',
  fi = 'Aloittelija',
}
export enum EUsual {
  en = 'Usual',
  es = 'Usual',
  fr = 'Usuel',
  de = 'Üblich',
  pt = 'Usual',
  cs = 'Běžný',
  fi = 'Perustaso',
}
export enum EAdvanced {
  en = 'Advanced',
  es = 'Avanzado',
  fr = 'Avancé',
  de = 'Fortgeschritten',
  pt = 'Avançado',
  cs = 'Pokročilý',
  fi = 'Edistynyt',
}
export enum EExpert {
  en = 'Expert',
  es = 'Experto',
  fr = 'Expert',
  de = 'Experte',
  pt = 'Perito',
  cs = 'Expert',
  fi = 'Asiantuntija',
}
export enum EPlayAgain {
  en = 'Play Again',
  es = 'Jugar de Nuevo',
  fr = 'Rejouer',
  de = 'Nochmal Spielen',
  pt = 'Jogar Novamente',
  cs = 'Hrát znovu',
  fi = 'Pelaa uudelleen',
}
export enum EYouMadeItToTheHighScores {
  en = 'You made it to the high scores!',
  es = '¡Llegaste a las puntuaciones más altas!',
  fr = 'Vous avez atteint les meilleurs scores!',
  de = 'Sie haben es in die Bestenliste geschafft!',
  pt = 'Você chegou às pontuações mais altas!',
  cs = 'Dostali jste se na nejlepší skóre!',
  fi = 'Pääsit sijoille!',
}
enum EHighScoreAddedSuccessfully {
  en = 'High score added successfully',
  es = 'Puntuación alta añadida con éxito',
  fr = 'Score élevé ajouté avec succès',
  de = 'Highscore erfolgreich hinzugefügt',
  pt = 'Pontuação alta adicionada com sucesso',
  cs = 'High score úspěšně přidán',
  fi = 'Tulos lisätty onnistuneesti',
}
export enum EErrorAddingHighScore {
  en = 'Error adding high score',
  es = 'Error al agregar puntuación alta',
  fr = "Erreur lors de l'ajout du score élevé",
  de = 'Fehler beim Hinzufügen des Highscores',
  pt = 'Erro ao adicionar pontuação alta',
  cs = 'Chyba při přidávání vysokého skóre',
  fi = 'Virhe tuloksen lisäämisessä',
}

export enum EErrorRetrievingHighScores {
  en = 'Error retrieving high scores',
  es = 'Error al recuperar las puntuaciones más altas',
  fr = 'Erreur lors de la récupération des scores élevés',
  de = 'Fehler beim Abrufen der Highscores',
  pt = 'Erro ao recuperar pontuações altas',
  cs = 'Chyba při získávání vysokých skóre',
  fi = 'Virhe pisteiden noutamisessa',
}
export enum EHighScoreNotFound {
  en = 'High score not found',
  es = 'Puntuación alta no encontrada',
  fr = 'Score élevé non trouvé',
  de = 'Highscore nicht gefunden',
  pt = 'Pontuação alta não encontrada',
  cs = 'Vysoké skóre nebylo nalezeno',
  fi = 'Tulosta ei löytynyt',
}
export enum EHighScoreDeletedSuccessfully {
  en = 'High score deleted successfully',
  es = 'Puntuación alta eliminada con éxito',
  fr = 'Score élevé supprimé avec succès',
  de = 'Highscore erfolgreich gelöscht',
  pt = 'Pontuação alta excluída com sucesso',
  cs = 'Vysoké skóre bylo úspěšně smazáno',
  fi = 'Tulos poistettu onnistuneesti',
}
export enum EErrorDeletingHighScore {
  en = 'Error deleting high score',
  es = 'Error al eliminar la puntuación alta',
  fr = 'Erreur lors de la suppression du score élevé',
  de = 'Fehler beim Löschen des Highscores',
  pt = 'Erro ao excluir pontuação alta',
  cs = 'Chyba při mazání vysokého skóre',
  fi = 'Virhe tuloksen poistamisessa',
}
export enum EHighScoreUpdatedSuccessfully {
  en = 'High score updated successfully',
  es = 'Puntuación alta actualizada con éxito',
  fr = 'Score élevé mis à jour avec succès',
  de = 'Highscore erfolgreich aktualisiert',
  pt = 'Pontuação alta atualizada com sucesso',
  cs = 'Vysoké skóre úspěšně aktualizováno',
  fi = 'Tulos päivitetty onnistuneesti',
}
export enum EErrorUpdatingHighScore {
  en = 'Error updating high score',
  es = 'Error al actualizar la puntuación alta',
  fr = 'Erreur lors de la mise à jour du score élevé',
  de = 'Fehler beim Aktualisieren des Highscores',
  pt = 'Erro ao atualizar pontuação alta',
  cs = 'Chyba při aktualizaci vysokého skóre',
  fi = 'Virhe tuloksen päivittämisessä',
}
export enum EDeleteHighScore {
  en = 'Delete this high score?',
  es = '¿Eliminar esta puntuación alta?',
  fr = 'Supprimer ce score élevé?',
  de = 'Diesen Highscore löschen?',
  pt = 'Excluir esta pontuação alta?',
  cs = 'Smazat toto vysoké skóre?',
  fi = 'Poista tämä tulos?',
}
export enum EDeletePlayersHighScores {
  en = "Delete this player's high scores?",
  es = '¿Eliminar las puntuaciones altas de este jugador?',
  fr = 'Supprimer les scores élevés de ce joueur?',
  de = 'Löschen Sie die Highscores dieses Spielers?',
  pt = 'Excluir as pontuações altas deste jogador?',
  cs = 'Smazat vysoké skóre tohoto hráče?',
  fi = 'Poista tämän pelaajan tulokset?',
}
export enum EStopGame {
  en = 'Stop Game',
  es = 'Detener Juego',
  fr = 'Arrêter le Jeu',
  de = 'Spiel beenden',
  pt = 'Parar Jogo',
  cs = 'Zastavit hru',
  fi = 'Lopeta peli',
}

export enum EFastestTime {
  en = 'Fastest Time',
  es = 'Tiempo más rápido',
  fr = 'Temps le plus rapide',
  de = 'Schnellste Zeit',
  pt = 'Tempo mais rápido',
  cs = 'Nejrychlejší čas',
  fi = 'Nopein aika',
}
