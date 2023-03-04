import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "https://api.punkapi.com/v2/beers?per_page=10";

const fetchData = async (page: number) => {
  const { data } = await axios.get(BASE_URL + `&page=${page ?? 1}`);
  return { data, page: page ?? 1 };
};

export const useAllBeer = () => {
  return useInfiniteQuery(
    ["allbeer"],
    ({ pageParam = 1 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return (lastPage?.page ?? 1) + 1;
      },
    }
  );
};
