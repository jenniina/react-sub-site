import { IUser } from '../../../interfaces'

export interface ITask {
  key: string
  name: string
  complete: boolean
  user?: IUser['_id'] | null
}
export interface ITodos {
  user?: IUser['_id'] | null
  todos: ITask[]
}
export interface TodosState {
  todos: ITask[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}
export enum EClearCompleted {
  en = 'Clear Completed Tasks',
  es = 'Borrar Tareas Completadas',
  fr = 'Effacer les Tâches Terminées',
  de = 'Abgeschlossene Aufgaben Löschen',
  pt = 'Limpar Tarefas Completas',
  cs = 'Vymazat Dokončené Úkoly',
  fi = 'Tyhjennä valmiit tehtävät',
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
export enum ELoading {
  en = 'Loading',
  es = 'Cargando',
  fr = 'Chargement',
  de = 'Wird geladen',
  pt = 'Carregando',
  cs = 'Načítání',
  fi = 'Ladataan',
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
