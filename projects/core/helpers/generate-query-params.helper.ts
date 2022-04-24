/**
 * Function to build query params for navigation
 **/

export function GenerateUrlParamsHelper<T>(
  queryParams: any = {},
  searchParams: Partial<T> = {},
): Record<string, string> {
  const params = { ...queryParams, ...searchParams };

  for (const key in params) {
    if (params[key] === null || params[key] === undefined || params[key].length === 0) {
      delete params[key];
    }
  }

  if (params?.page) {
    params.page++;
  }

  return params;
}
