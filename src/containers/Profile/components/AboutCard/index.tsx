"use client";
import React, {
  ChangeEventHandler,
  FC,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ButtonEdit from "@components/ButtonEdit";
import { useProfileStore } from "@stores/useProfile";
import {
  FileType,
  InputInterface,
  getBase64,
} from "@containers/Profile/constants/interface";
import {
  FORMAT_DATE,
  GENDER_LIST,
  getHoroscope,
} from "@containers/Profile/constants/config";
import { AboutInterface } from "@constants/about";
import { BASE_URL } from "@constants/baseUrl";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import BoxAnimate from "@components/BoxAnimate";
import { isNumberKey } from "@utils/validation";

interface Props {
  data: AboutInterface;
}

const AboutCard: FC<Props> = ({ data }) => {
  const token = getCookie("token");
  const { about, isEditAbout, setAbout, setIsEditAbout, setProfile } =
    useProfileStore();
  const [fileImg, setFileImg] = useState<UploadFile<any>[]>();
  const aboutInformation = useMemo(
    () => ({
      birthday: about?.birthday,
      horoscope: about?.horoscope,
      zodiac: about?.zodiac,
      height: about?.height,
      weight: about?.weight,
    }),
    [
      about?.birthday,
      about?.height,
      about?.horoscope,
      about?.weight,
      about?.zodiac,
    ]
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    for (const key in data) {
      setAbout({ key, val: data?.[key as keyof AboutInterface] as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* -------------------------------------------------------------------------- */
  /*                               HANDLER UPLOAD                               */
  /* -------------------------------------------------------------------------- */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileImg(newFileList);
  };

  const handlerSaveAbout = () => {
    setIsEditAbout(false);
    refetch();
  };

  const renderIcon = useMemo(
    () =>
      !isEditAbout ? (
        <ButtonEdit onClick={() => setIsEditAbout(true)} />
      ) : (
        <Button
          type="text"
          className="button-text !text-xs !bg-golden !text-transparent !bg-clip-text "
          onClick={handlerSaveAbout}
        >
          Save & Update
        </Button>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditAbout]
  );

  const renderUploadButton = (
    <button className="rounded-[17px] w-[57px] h-[57px]" type="button">
      <PlusOutlined className="text-white text-[20px]" />
    </button>
  );

  /* -------------------------------------------------------------------------- */
  /*                                HANDLER INPUT                               */
  /* -------------------------------------------------------------------------- */
  const INPUT_LIST = useMemo(
    (): InputInterface[] => [
      {
        key: "displayName",
        title: "Display name",
        placeholder: "Enter name",
        type: "text",
        value: about?.displayName,
      },
      {
        key: "gender",
        title: "Gender",
        placeholder: "Select Gender",
        type: "single-select",
        value: about?.gender,
        options: GENDER_LIST,
      },
      {
        key: "birthday",
        title: "Birthday",
        placeholder: "DD MM YYYY",
        type: "datepicker",
        value: about?.birthday,
      },
      {
        key: "horoscope",
        title: "Horoscope",
        placeholder: "--",
        type: "text",
        value: about?.horoscope,
      },
      {
        key: "zodiac",
        title: "Zodiac",
        placeholder: "--",
        type: "text",
        value: about?.zodiac,
      },
      {
        key: "height",
        title: "Height",
        placeholder: "Add height",
        type: "text",
        value: about?.height,
      },
      {
        key: "weight",
        title: "Weight",
        placeholder: "Add weight",
        type: "text",
        value: about?.weight,
      },
    ],
    [
      about?.displayName,
      about?.gender,
      about?.birthday,
      about?.horoscope,
      about?.zodiac,
      about?.height,
      about?.weight,
    ]
  );

  const handlerChangeInput = (val: string, key: string) => {
    setAbout({
      key,
      val,
    });
  };
  const renderInputByType = (data: InputInterface) => {
    const type = data?.type;
    if (type === "text") {
      return (
        <Input
          className="col-span-6 input-custom-2 !text-right pr-5 !border-white !border-opacity-[22%] focus:!border-white focus:!border-opacity-40 disabled:!bg-[#D9D9D90F] disabled:!bg-opacity-[6%] disabled:text-white disabled:text-opacity-30 "
          placeholder={data?.placeholder}
          value={data?.value}
          onKeyDown={
            ["height", "weight"]?.includes(data?.key)
              ? (event) => {
                  isNumberKey(event);
                }
              : () => {}
          }
          onChange={(e) => handlerChangeInput(e?.target?.value, data?.key)}
          disabled={["horoscope", "zodiac"]?.includes(data?.key)}
          suffix={
            data?.key === "height" ? (
              <div className={data?.value ? "" : "hidden"}>cm</div>
            ) : data?.key === "weight" ? (
              <div className={data?.value ? "" : "hidden"}>kg</div>
            ) : undefined
          }
        />
      );
    } else if (type === "single-select") {
      return (
        <Select
          className="col-span-6  text-right "
          placeholder={data?.placeholder}
          value={data?.value}
          options={data?.options}
          onChange={(value) => setAbout({ key: data?.key, val: value })}
        />
      );
    } else if (type === "datepicker") {
      return (
        <DatePicker
          allowClear={false}
          className="col-span-6  text-right"
          suffixIcon={undefined}
          placeholder={data?.placeholder}
          value={
            data?.value?.length ? dayjs(data?.value, FORMAT_DATE) : undefined
          }
          onChange={(_value, dateString) => {
            const date = dateString as string;
            const { horoscope, zodiac } = getHoroscope(date);
            setAbout({ key: data?.key, val: date });
            setAbout({ key: "horoscope", val: horoscope });
            setAbout({ key: "zodiac", val: zodiac });
          }}
          format={FORMAT_DATE}
        />
      );
    }
  };

  const renderAboutContent = useMemo(
    () =>
      isEditAbout ? (
        <div className="flex flex-col gap-[29px]">
          <div className="flex items-center gap-[15px]">
            <Upload
              listType="picture-card"
              fileList={fileImg}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileImg && fileImg?.length >= 1 ? null : renderUploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
                alt="image"
              />
            )}
            <div className="text-xs font-medium">Add image</div>
          </div>
          <div className="flex flex-col gap-3">
            {INPUT_LIST?.map((item) => (
              <div
                key={item?.title}
                className="grid grid-cols-9 items-center gap-x-[29px] font-medium text-[13px]"
              >
                <div className="col-span-3 opacity-[33%]">{item?.title}</div>
                {renderInputByType(item)}
              </div>
            ))}
          </div>
        </div>
      ) : Object?.values(aboutInformation)?.every(
          (x) => x === null || x === ""
        ) ? (
        <div className="font-medium text-sm opacity-[52%] pr-5">
          Add in your your to help others know you better
        </div>
      ) : (
        <div className="flex flex-col gap-[15px] font-medium text-[13px]">
          {Object?.keys(about)?.map((item, index) => {
            if (
              ["birthday", "horoscope", "zodiac", "height", "weight"]?.includes(
                item
              )
            ) {
              const value = about?.[item as keyof AboutInterface];
              const age =
                item === "birthday"
                  ? dayjs()?.diff(dayjs(value, "DD MM YYYY"), "years")
                  : undefined;
              const valueTransform =
                item === "birthday"
                  ? `${
                      value?.replace(/ /g, " / ")?.length === 0
                        ? "-"
                        : value?.replace(/ /g, " / ")
                    } ${age === 0 ? "" : `(Age ${age ?? "-"})`}`
                  : value;

              return (
                <BoxAnimate key={`label-${item}`} index={index}>
                  <div className="flex items-center gap-1 ">
                    <div className="capitalize opacity-[33%]">
                      {item ?? "-"}:
                    </div>
                    <div className="">
                      {valueTransform === "" ? "-" : valueTransform}{" "}
                      {item === "height" ? "cm" : item === "weight" ? "kg" : ""}
                    </div>
                  </div>
                </BoxAnimate>
              );
            }
            return undefined;
          })}
        </div>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [INPUT_LIST, about, fileImg, isEditAbout, previewImage, previewOpen]
  );

  /* -------------------------------------------------------------------------- */
  /*                                   WIRING                                   */
  /* -------------------------------------------------------------------------- */
  const {
    data: dataPost,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["update-about"],
    queryFn: async () => {
      const resp = await axios?.put(
        `${BASE_URL}/api/updateProfile`,
        {
          name: about?.displayName,
          birthday: about?.birthday,
          gender: about?.gender,
          horoscope: about?.horoscope,
          zodiac: about?.horoscope,
          height: parseFloat(about?.height),
          weight: parseFloat(about?.weight),
        },
        {
          headers: {
            "x-access-token": token,
            "content-type": "application/json",
          },
        }
      );

      return resp?.data;
    },
    enabled: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  useEffect(() => {
    if (isFetching) {
      if (fileImg) {
        setProfile(fileImg);
      }
      messageApi?.open({
        key: "fetching-update-about",
        type: "loading",
        content: "processing profile updates",
        duration: 0,
      });
    } else {
      if (dataPost) {
        messageApi?.destroy("fetching-update-about");
        messageApi?.open({
          key: "update-about",
          type: "info",
          content: dataPost?.message,
          duration: 5,
        });
        router?.refresh();
      } else {
        messageApi?.destroy("fetching-update-about");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, dataPost, messageApi, router, fileImg]);

  return (
    <div className="menu-container xl:h-[50dvh] xl:overflow-auto">
      {contextHolder}
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">About</div>
        {renderIcon}
      </div>
      {renderAboutContent}
    </div>
  );
};

export default AboutCard;
