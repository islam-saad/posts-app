import { useState, useCallback } from 'react';
import axios from 'axios';

function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //   const [data, setData] = useState([]);

  const callAPI = useCallback(async (data) => {
    try {
      setLoading(true);
      // const response = await axios.get('http://localhost:3000/posts');
      const response = await axios({ ...data });
      return response.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callAPI };
}

export default useAPI;
