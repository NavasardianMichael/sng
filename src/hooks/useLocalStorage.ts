import { useCallback, useMemo, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (x: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T): void => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(null)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return useMemo(() => [storedValue, setValue, removeValue], [storedValue, setValue, removeValue])
}
