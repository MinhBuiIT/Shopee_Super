import { useSearchParams } from 'react-router-dom'

export default function useProductParam() {
  const [param] = useSearchParams()
  return Object.fromEntries([...param])
}
