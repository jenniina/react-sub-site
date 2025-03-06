import { ELanguages, IUser } from '../../../types'
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

export enum EShopping {
  en = 'Shopping',
  es = 'Compras',
  fr = 'Achats',
  de = 'Einkaufen',
  pt = 'Compras',
  cs = 'Nákupy',
  fi = 'Ostokset',
}

export enum EAll {
  en = 'All',
  es = 'Todos',
  fr = 'Tous',
  de = 'Alle',
  pt = 'Todos',
  cs = 'Vše',
  fi = 'Kaikki',
}

export enum EWork {
  en = 'Work',
  es = 'Trabajo',
  fr = 'Travail',
  de = 'Arbeit',
  pt = 'Trabalho',
  cs = 'Práce',
  fi = 'Työ',
}

export enum EPersonal {
  en = 'Personal',
  es = 'Personal',
  fr = 'Personnel',
  de = 'Persönlich',
  pt = 'Pessoal',
  cs = 'Osobní',
  fi = 'Henkilökohtainen',
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

export enum ENone {
  en = 'None',
  es = 'Ninguna',
  fr = 'Aucun',
  de = 'Keiner',
  pt = 'Nenhum',
  cs = 'Žádný',
  fi = 'Ei mitään',
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
