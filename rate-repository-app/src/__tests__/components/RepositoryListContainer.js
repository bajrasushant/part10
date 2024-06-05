import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { formatCounts } from "../../utils/helpers";

describe("RepositoryList", () => {
  describe("RepositryListContainer", () => {
    it('renders repository information correctly', () => {
      const repositories = {
         totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);
      repositoryItems.forEach((item, index) => {
        const repo = repositories.edges[index].node;
        const utils = within(item);

        expect(utils.getByTestId('fullName')).toHaveTextContent(repo.fullName);
        expect(utils.getByTestId('description')).toHaveTextContent(repo.description);
        expect(utils.getByTestId('language')).toHaveTextContent(repo.language);
        expect(utils.getByTestId('Forks')).toHaveTextContent(formatCounts(repo.forksCount));
        expect(utils.getByTestId('Stars')).toHaveTextContent(formatCounts(repo.stargazersCount));
        expect(utils.getByTestId('Rating')).toHaveTextContent(formatCounts(repo.ratingAverage));
        expect(utils.getByTestId('Reviews')).toHaveTextContent(formatCounts(repo.reviewCount));
      });
    })
  })
})
