import axios from "axios";

export async function getAllPosts(options = {}) {
  const { limit = 99 } = options;
  const response = await axios.post(
    "https://cms.vaionex.com/tournaments/index.php?graphql",
    {
      operationName: "AllPosts",
      query: `
query AllPosts {
  posts(first: ${limit}) {
    nodes {
      title
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}`,
      variables: null,
    }
  );
  return response.data?.data?.posts?.nodes || [];
}
