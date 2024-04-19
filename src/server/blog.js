import axios from "axios";

const cms = axios.create({
  baseURL: "https://cms.vaionex.com/tournaments/index.php?graphql",
});

export async function getAllPosts(options = {}) {
  const { limit = 99 } = options;
  const response = await cms.post("", {
    operationName: "AllPosts",
    query: `
query AllPosts {
  posts(first: ${limit}) {
    nodes {
      title
      date
      slug
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
  });
  return response.data?.data?.posts?.nodes || [];
}

export async function getPostBySlug(slug) {
  const response = await cms.post("", {
    operationName: "SingleBlogPostBySlug",
    query: `
  query SingleBlogPostBySlug {
    post(id: "${slug}", idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content
      author {
        node {
          name
        }
      }
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
    }
  }`,
    variables: null,
  });
  return response.data.data.post;
}
