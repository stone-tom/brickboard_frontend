export const get = async (url: string, options?: any) => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  });

  return res.json();
};

export const post = async (
  url: string,
  data: { [key: string]: any },
  options: any,
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
    body: JSON.stringify(data),
  });
  return res.json();
};
