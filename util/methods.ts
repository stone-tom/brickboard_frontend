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
  data?: { [key: string]: any },
  options?: any,
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
  if (res.status === 204) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return res.json();
};

export const put = async (
  url: string,
  data?: any,
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    ...options,
    body: data,
  });
  return res.json();
};

export const deleteMethod = async (
  url: string,
  options?: any,
) => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  });
};

export const patch = async (
  url: string,
  data: { [key: string]: any },
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'PATCH',
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
