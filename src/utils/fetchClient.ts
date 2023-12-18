const url = 'https://60816d9073292b0017cdd833.mockapi.io/modes';

type RequestMethod = 'GET';

export function request<T>(
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(url, options)
    .then(response => response.json());
}
