/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
export interface UrlInterface {
  login: string;
  register: string;
  profile: string;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
export const URL_LIST: UrlInterface = {
  login: "/login",
  register: "/register",
  profile: "/profile",
};
