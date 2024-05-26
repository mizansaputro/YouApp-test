import { GetProp, UploadProps } from "antd";
import { AboutInterface } from "@constants/about";

/* -------------------------------------------------------------------------- */
/*                                   UPLOAD                                   */
/* -------------------------------------------------------------------------- */
export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/* -------------------------------------------------------------------------- */
/*                                    INPUT                                   */
/* -------------------------------------------------------------------------- */
type InputType = "text" | "single-select" | "datepicker";
export interface InputInterface {
  key: keyof AboutInterface;
  title: string;
  placeholder: string;
  type: InputType;
  value: string | undefined;
  options?: { label: string; value: string }[];
}
