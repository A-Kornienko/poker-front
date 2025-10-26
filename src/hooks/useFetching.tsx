import { useState } from "react"

type FetchCallback = (...args: any[]) => Promise<void>;

export const useFetching = (callback: FetchCallback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (...args: any[]) => {
        try {
          setIsLoading(true)  
          await callback(...args)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const;
}