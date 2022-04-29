/**
 * Function to build query params for navigation
 **/

export function generateUrlParamsHelper<Q, T>(
  queryParams: Partial<Q> = {},
  searchParams: Partial<T> = {},
): Record<string, string> {
  const params: Record<string, number | string | unknown> = {
    ...queryParams,
    ...searchParams,
  };

  for (const key in params) {
    if (
      params[key] === null ||
      params[key] === undefined ||
      (params[key] as unknown[]).length === 0
    ) {
      delete params[key];
    }
  }

  if (params?.['page']) {
    (params['page'] as number)++;
  }

  return params as Record<string, string>;
}
