export const request = <TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> =>
  fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
