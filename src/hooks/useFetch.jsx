import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data); 
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort(); // Cleanup
  }, [url]);

  return { data, loading, error };
}