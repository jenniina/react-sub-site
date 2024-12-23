import { useState, useEffect } from 'react'

// type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>, () => void]

type ReturnType<T> = [T, (value: T | ((val: T) => T)) => void, () => void]

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T>(key: string, defaultValue: T) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): ReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject?.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === 'function') {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject?.removeItem(key)
    storageObject?.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = () => {
    setValue(defaultValue)
    return storageObject?.removeItem(key)
  }

  const setValueWithFunction = (value: T | ((val: T) => T)) => {
    if (typeof value === 'function') {
      setValue((currentValue) => (value as (val: T) => T)(currentValue))
    } else {
      setValue(value)
    }
  }

  return [value, setValueWithFunction, remove]
}
