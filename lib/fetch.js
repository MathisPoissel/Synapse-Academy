export default async function fetchGraphQL(query, variables) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  const response = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, options);

  return response.json();
}
