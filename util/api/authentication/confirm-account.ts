import { backendURL } from "../index";
import { get } from "../../methods";

const confirmAccounts = async (code: string) => {
  const fetchURL = `${backendURL}/confirmation?confirmation_token=${code}`;

  let content: any;
  let error: any;
  try {
    const res = await get(fetchURL);
    if (res && res.data) content = res;
    if (res && res.error) throw new Error(res.error);
    if (res && res.errors) {
      if (res.errors.email) {
        throw new Error(res.errors.email);
      } else if (res.errors.confirmation_token) {
        throw new Error(res.errors.confirmation_token);
      }
    }
  } catch (e) {
    error = e;
  }
  return {
    content,
    fetchURL,
    error,
  };
};

export default confirmAccounts;
