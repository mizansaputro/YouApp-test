import Image from "next/image";
import { FC } from "react";

interface Props {
  img: string;
  label: string;
}
const InformationBox: FC<Props> = ({ img, label }) => {
  return (
    <div className="flex items-center gap-2 min-w-[80px] h-9 rounded-[100px] px-4 py-2 bg-white bg-opacity-[6%] ">
      <Image src={img} alt={`img-${label}`} className="w-5 h-5" />
      <div className="text-[14px] font-semibold">{label ?? "-"}</div>
    </div>
  );
};

export default InformationBox;
