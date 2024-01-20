// useInfiniteScroll.js
import { useState, useRef, useEffect } from 'react';
const useInfiniteScroll = (fetchData, id) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isDataEnd, setIsDataEnd] = useState(false);
  const TopElementRef = useRef(null);
  const addData = async () => {
    console.log('come here');
    if (isDataEnd) return;
    setLoading(true);
    const response = await fetchData(id, page);
    if (response.length === 0) {
      setLoading(false);
      setIsDataEnd(true);
      return;
    }
    console.log(response);
    console.log('data fetched');
    setData(response);
    setLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop !== 0) return;
      setPage((prevPage) => prevPage + 1);
    };

    const timerId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
    }, 20000);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    addData();
  }, [page]);

  return { loading, data, TopElementRef };
};

export default useInfiniteScroll;
