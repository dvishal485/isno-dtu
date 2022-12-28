export default async function fetchJson(input, init) {
  if (!input) throw new FetchError({
    message: "fetch url is required",
    response,
    data,
  });
  if (!init) init = { method: "GET" };
  const response = await fetch(input, init);
  const data = await response.json();
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response;
  data;
  constructor({ message, response, data }) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}
