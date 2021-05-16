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

export const sessionget = async (url: string, options?: any) => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    throw new Error('Session abgelaugfen');
  }
  return res.json();
};

export const post = async (
  url: string,
  data?: any,
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    ...options,
    body: JSON.stringify(data),
  });
  if (res.status === 204) {
    return null;
  }
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

export const putMethod = async (
  url: string,
  data?: any,
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
    body: JSON.stringify(data),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const postWithoutJson = async (
  url: string,
  data?: any,
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    ...options,
    body: data,
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const patchWithoutJson = async (
  url: string,
  data?: any,
  options?: any,
) => {
  const res = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    ...options,
    body: data,
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};
