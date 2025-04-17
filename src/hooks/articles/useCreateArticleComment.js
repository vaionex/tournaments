import { createArticleComment } from "@/db/articles";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateArticleComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, content, parent_id }) =>
      createArticleComment(content, slug, parent_id),
    onSuccess: async (_, { slug }) => {
      await queryClient.invalidateQueries({
        queryKey: ["article", slug, "comments"],
      });
    },
  });
}
