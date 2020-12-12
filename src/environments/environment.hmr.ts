export function timelimit() {
  return 100000;
}

export const environment = {
  production: false,
  hmr: false,
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  apiConfig: {
    timeLimit: timelimit,
  },
  // credential:
  //   'OTRkZGQ0NjMtMTUwYS00MTYzLWFmM2QtYTVjYjI3OGRjNjUzOmM0MDEwYzA4LWI4MjktNDQ3ZS1iMjgzLWY5NDY5NjI2ZDRkMA==',
  // gtmId: 'GTM-TSM5TPX',
};
