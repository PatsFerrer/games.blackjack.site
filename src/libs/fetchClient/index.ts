export const fetchClient = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  return fetch(input, init);
};
