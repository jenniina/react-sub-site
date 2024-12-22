import { ELanguages, ENone, EOther, EText, IUser } from '../../../interfaces'
import { EPersonal, EWork } from '../../../interfaces/form'
import { EAll } from '../../Jokes/interfaces'
import { SelectOption } from '../../Select/Select'

export type TPriority = 'all' | 'low' | 'medium' | 'high'

export type TCategory = 'all' | 'work' | 'personal' | 'shopping' | 'other'

export type TSortOptions = 'none' | 'text' | 'priority' | 'deadline' | 'category'

export interface ITask {
  key: string
  name: string
  complete: boolean
  order: number
  user?: IUser['_id'] | null
  priority: TPriority
  deadline: string
  category: TCategory
  createdAt?: string
  updatedAt?: string
}

//export type TDeadline = 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'thisMonth' | 'overdue'

export interface ITodos {
  user?: IUser['_id'] | null
  todos: ITask[]
}
export interface TodosState {
  todos: ITask[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

export enum ELow {
  en = 'Low',
  es = 'Bajo',
  fr = 'Faible',
  de = 'Niedrig',
  pt = 'Baixo',
  cs = 'Nízký',
  fi = 'Matala',
}
export enum EMedium {
  en = 'Medium',
  es = 'Medio',
  fr = 'Moyen',
  de = 'Mittel',
  pt = 'Médio',
  cs = 'Střední',
  fi = 'Keskiverto',
}

export enum EHigh {
  en = 'High',
  es = 'Alto',
  fr = 'Haut',
  de = 'Hoch',
  pt = 'Alto',
  cs = 'Vysoký',
  fi = 'Korkea',
}

export enum EPriority {
  en = 'Priority',
  es = 'Prioridad',
  fr = 'Priorité',
  de = 'Priorität',
  pt = 'Prioridade',
  cs = 'Priorita',
  fi = 'Tärkeys',
}

export enum EDeadline {
  en = 'Deadline',
  es = 'Fecha Límite',
  fr = 'Date Limite',
  de = 'Frist',
  pt = 'Prazo',
  cs = 'Termín',
  fi = 'Määräaika',
}

export enum ECategory {
  en = 'Category',
  es = 'Categoría',
  fr = 'Catégorie',
  de = 'Kategorie',
  pt = 'Categoria',
  cs = 'Kategorie',
  fi = 'Kategoria',
}

export enum EClearCompleted {
  en = 'Clear Completed Tasks',
  es = 'Borrar Tareas Completadas',
  fr = 'Effacer les Tâches Terminées',
  de = 'Abgeschlossene Aufgaben Löschen',
  pt = 'Limpar Tarefas Completas',
  cs = 'Vymazat Dokončené Úkoly',
  fi = 'Poista valmiit tehtävät',
}
export enum EAddTask {
  en = 'Add Task',
  es = 'Agregar Tarea',
  fr = 'Ajouter une Tâche',
  de = 'Aufgabe hinzufügen',
  pt = 'Adicionar Tarefa',
  cs = 'Přidat Úkol',
  fi = 'Lisää tehtävä',
}
export enum ETask {
  en = 'Task',
  es = 'Tarea',
  fr = 'Tâche',
  de = 'Aufgabe',
  pt = 'Tarefa',
  cs = 'Úkol',
  fi = 'Tehtävä',
}

export enum ELeftToDo {
  en = 'left to do',
  es = 'restantes',
  fr = 'restantes',
  de = 'übrig',
  pt = 'restantes',
  cs = 'zbývá',
  fi = 'jäljellä',
}

export enum EAddTaskToTheTaskList {
  en = 'Add task to the task list',
  es = 'Agregar tarea a la lista de tareas',
  fr = 'Ajouter une tâche à la liste des tâches',
  de = 'Aufgabe zur Aufgabenliste hinzufügen',
  pt = 'Adicionar tarefa à lista de tarefas',
  cs = 'Přidat úkol do seznamu úkolů',
  fi = 'Lisää tehtävä tehtäväluetteloon',
}
export enum ETodoApp {
  en = 'Todo App',
  es = 'Aplicación de Tareas',
  fr = 'Application de Tâches',
  de = 'Aufgaben App',
  pt = 'Aplicativo de Tarefas',
  cs = 'Úkolová Aplikace',
  fi = 'Tehtäväsovellus',
}
// Get organized, one task at a time!
export enum EGetOrganizedOneTaskAtATime {
  en = 'Get organized, one task at a time!',
  es = '¡Organízate, una tarea a la vez!',
  fr = 'Organisez-vous, une tâche à la fois!',
  de = 'Organisieren Sie sich, eine Aufgabe nach der anderen!',
  pt = 'Organize-se, uma tarefa de cada vez!',
  cs = 'Zorganizujte se, jedna úloha za druhou!',
  fi = 'Järjestäydy, yksi tehtävä kerrallaan!',
}
export enum EShopping {
  en = 'Shopping',
  es = 'Compras',
  fr = 'Achats',
  de = 'Einkaufen',
  pt = 'Compras',
  cs = 'Nákupy',
  fi = 'Ostokset',
}

export const translationMap: Record<string, Record<ELanguages, string>> = {
  all: EAll,
  low: ELow,
  medium: EMedium,
  high: EHigh,
  priority: EPriority,
  deadline: EDeadline,
  category: ECategory,
  work: EWork,
  personal: EPersonal,
  shopping: EShopping,
  other: EOther,
  none: ENone,
  text: EText,
}

export const generateOptions = (
  enumValues: string[],
  language: ELanguages
): SelectOption[] => {
  return enumValues.map((value) => ({
    label: translationMap[value][language],
    value,
  }))
}

export const translate = <T extends string | number | symbol>(
  translationMap: Record<T, Record<ELanguages, string>>,
  key: T,
  language: ELanguages
): string => {
  return translationMap[key]?.[language] || (key as string)
}
