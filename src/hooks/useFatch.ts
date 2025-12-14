import { useState, useEffect } from "react";

interface UseFetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useFetch<T = any>(
    url: string | null,
    options?: UseFetchOptions
): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const refetch = () => {
        setRefetchTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: options?.method || "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...options?.headers,
                    },
                    body: options?.body ? JSON.stringify(options.body) : undefined,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An error occurred"));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, refetchTrigger, options?.method, options?.body, options?.headers]);

    return { data, loading, error, refetch };
}
