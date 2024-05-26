/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */

export interface AboutInterface {
  displayName: string;
  gender: "male" | "female" | undefined;
  birthday: string;
  horoscope?: string;
  zodiac?: string;
  height: string;
  weight: string;
}
