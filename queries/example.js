export const EXAMPLE = `
  query Query {
    example(first: 300) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;
