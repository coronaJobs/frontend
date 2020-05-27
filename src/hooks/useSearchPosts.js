import { GET_ALL_POSTS } from "./../graphql/queries/posts";
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { useDebounceCallback } from "@react-hook/debounce";

function useDebounceSearchPosts(handleSearch) {
  const client = useApolloClient();

  const [getPosts, { data }] = useLazyQuery(GET_ALL_POSTS);
  const useDebounceSearchPosts = useDebounceCallback(getPosts, 500);

  if (data && data.getAllPosts) {
    const posts = data.getAllPosts;

    client.cache.writeData({
      data: { getAllPosts: posts },
    });

    handleSearch(posts);
  }

  return useDebounceSearchPosts;
}

export default useDebounceSearchPosts;
