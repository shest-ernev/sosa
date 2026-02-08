import { useSearchParams } from 'react-router'
import qs from 'qs'

export const useQS = <T extends qs.ParsedQs>() => {
  const [query, setQuery] = useSearchParams()

  const searchParams = qs.parse(query.toString()) as Partial<T>

  const set = (value: Partial<T> | string) => {
    if (typeof value === 'string') {
      return setQuery(value)
    }

    const string = qs.stringify(value)

    return setQuery(string)
  }

  const append = (value: Partial<T>) => {
    const newSearch = { ...searchParams, ...value }

    setQuery(qs.stringify(newSearch))
  }

  const remove = (...args: (keyof T)[]) => {
    setQuery((p) => {
      args.forEach((item) => {
        p.delete(String(item))
      })

      return p
    })
  }

  const stringify = (value: T) => qs.stringify(value)

  return { searchParams, set, append, remove, stringify }
}
