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
}
export enum EAddTask {
  en = 'Add Task',
  es = 'Agregar Tarea',
  fr = 'Ajouter une Tâche',
  de = 'Aufgabe hinzufügen',
  pt = 'Adicionar Tarefa',
  cs = 'Přidat Úkol',
}
export enum ETask {
  en = 'Task',
  es = 'Tarea',
  fr = 'Tâche',
  de = 'Aufgabe',
  pt = 'Tarefa',
  cs = 'Úkol',
}
export enum ELoading {
  en = 'Loading',
  es = 'Cargando',
  fr = 'Chargement',
  de = 'Wird geladen',
  pt = 'Carregando',
  cs = 'Načítání',
}
export enum ELeftToDo {
  en = 'left to do',
  es = 'restantes',
  fr = 'restantes',
  de = 'übrig',
  pt = 'restantes',
  cs = 'zbývá',
}

export enum EAddTaskToTheTaskList {
  en = 'Add task to the task list',
  es = 'Agregar tarea a la lista de tareas',
  fr = 'Ajouter une tâche à la liste des tâches',
  de = 'Aufgabe zur Aufgabenliste hinzufügen',
  pt = 'Adicionar tarefa à lista de tarefas',
  cs = 'Přidat úkol do seznamu úkolů',
}
export enum ETodoApp {
  en = 'Todo App',
  es = 'Aplicación de Tareas',
  fr = 'Application de Tâches',
  de = 'Aufgaben App',
  pt = 'Aplicativo de Tarefas',
  cs = 'Úkolová Aplikace',
}
