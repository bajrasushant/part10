export const availableSortingOptions = [
  "Latest repositories",
  "Highest rated repositories",
  "Lowest rated repositories",
];

export const sortParams = {
  "Latest repositories": { orderBy: "CREATED_AT" },
  "Highest rated repositories": {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  "Lowest rated repositories": {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};
