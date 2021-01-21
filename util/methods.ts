export const get = async (url: string, options?: any) => {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
    });

    return res.json();
  } catch (e) {
    throw e;
  }
};

export const post = async (
  url: string,
  data: { [key: string]: any },
  options: any,
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (e) {
    throw e;
  }
};
