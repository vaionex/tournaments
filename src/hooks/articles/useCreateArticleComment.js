import { createArticleComment } from "@/db/articles";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateArticleComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, content }) => createArticleComment(content, slug),
    onSuccess: async (_, { slug }) => {
      await queryClient.invalidateQueries({
        queryKey: ["article", slug, "comments"],
      });
    },
  });
}
