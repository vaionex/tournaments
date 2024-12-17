import { getArticles } from "@/db/articles";
import { useQuery } from "react-query";

export default function useArticles(params) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticles(params)
  });
}