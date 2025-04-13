import { getArticleCommentsBySlug } from "@/db/articles";
import { useQuery } from "react-query";

export default function useArticleComments(slug) {
  return useQuery({
    queryKey: ["article", slug, "comments"],
    queryFn: () => getArticleCommentsBySlug(slug),
  });
}
