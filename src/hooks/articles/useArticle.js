import { getArticleBySlug } from "@/db/articles";
import { useQuery } from "react-query";

export default function useArticle(slug) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug
  });
}