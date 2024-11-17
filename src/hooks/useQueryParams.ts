import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
    const [searchParams] = useSearchParams()
    
    return useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
}