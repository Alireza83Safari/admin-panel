import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFetchPagination = (url, customAxios) => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState([]);
  const [total, setTotal] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm");
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const fetchData = async () => {
    let URL = `${url}${location.search}`;

    switch (true) {
      case Boolean(searchTerm):
        URL += `&searchTerm=${searchTerm}`;
        break;
      case Boolean(categoryId):
        URL += `&categoryId=${categoryId}`;
        break;
      case Boolean(brandId):
        URL += `&brandId=${brandId}`;
        break;
      case Boolean(order):
        URL += `&order=${order}`;
        break;
      case Boolean(minPrice):
        URL += `&minPrice=${minPrice}`;
        break;
      case Boolean(maxPrice):
        URL += `&maxPrice=${maxPrice}`;
        break;
      default:
        break;
    }

    setLoading(true);
    try {
      const res = await customAxios.get(URL);
      setPaginations(res?.data?.data);
      setTotal(res?.data?.total);
      setLoading(false);
    } catch (err) {
      setLoading(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    location.search,
    categoryId,
    brandId,
    order,
    minPrice,
    maxPrice,
    searchTerm,
  ]);

  return { isLoading, paginations, total, fetchData };
};
