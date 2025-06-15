import React, { FC, useEffect, useState, useRef } from "react";
import { iCreateGalleryMedia, useUploadMediaToGallery, useUploadPicture, useUploadVideo } from "@/hooks/common";
import { detectFileType, getBase64, getVideoThumbnail } from "@/functions/fileFunctions";
import Swal from "sweetalert2";
import { Loader, Modal } from "@mantine/core";
import Image from "next/image";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa6";


const UploadMedia: FC<{ close: () => void }> = ({ close }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [fileThumbnail, setFileThumbnail] = useState<string>("");

  const { loading: loadingUploadVideo, data: uploadedVideoUrl, upload: uploadVideo, success: uploadedVideo } = useUploadVideo();
  const { loading: loadingUploadPicture, data: uploadedPictureUrl, upload: uploadPicture, success: uploadedPicture } = useUploadPicture();
  const { loading, data, success, upload } = useUploadMediaToGallery();


  const fileRef = useRef<HTMLInputElement>(null);

  const openFileManager = () => {
    fileRef.current?.click();
  }


  useEffect(() => {
    const showSuccessAlert = (!loadingUploadPicture && uploadedPicture) || (!loadingUploadVideo && uploadedVideo);
    if (showSuccessAlert) {
      const mediaUrl = fileType === "image" ? uploadedPictureUrl : uploadedVideoUrl;

      const payload: iCreateGalleryMedia = {
        category,
        title,
        description,
        mediaUrl,
        fileName: "",
      }

      upload(payload);
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "Uploaded successfully"
      })
    }

  }, [loadingUploadVideo, loadingUploadPicture, uploadedPicture, uploadedVideo])





  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      padding={0}
      top={0}
      radius={16}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <div className="w-full bg-white px-8 py-6">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-dark font-bold text-16-19">
                  Upload Gallery Media
                </h2>
                <IoMdCloseCircleOutline
                  onClick={close}
                  className="cursor-pointer text-dark"
                  size={24}
                />
              </div>

              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />

              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none focus:outline-none h-28 rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray p-2"
              />

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option
                  value={""}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Select a category
                </option>
                <option
                  value={"Goals"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Goals
                </option>
                <option
                  value={"Assists"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Assists
                </option>
                <option
                  value={"Free Kicks"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Free Kicks
                </option>
                <option
                  value={"Penalties"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Penalties
                </option>
                <option
                  value={"Throws"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Throws
                </option>
                <option
                  value={"Other"}
                  className="cursor-pointer text-16-19 text-dark font-semibold"
                >
                  Other
                </option>
              </select>

              {
                file === null && <button onClick={openFileManager} className="w-fit flex gap-1 text-12-14 items-center text-primary-2 font-semibold">
                  Select Media
                  <FaRegFileImage className="text-primary-2" size={12} />
                  <input ref={fileRef} type="file" style={{ display: "none" }} accept=".jpg,.jpeg,.png,.mp4,.mkv" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const format = detectFileType(file);
                      if (format === "image") {
                        getBase64(file).then((res) => {
                          setFileThumbnail(res as string)
                          setFileType(format);
                          setFile(file);
                        })
                      } else if (format === "video") {
                        getVideoThumbnail(file).then((res) => {
                          setFileThumbnail(res as string)
                          setFileType(format);
                          setFile(file);
                        })
                      }
                    }
                  }} />
                </button>
              }
              {
                fileThumbnail !== "" && <div className="w-[320px] h-[200px] relative overflow-hidden">
                  <Image src={fileThumbnail} alt="" className="w-[320px] h-[200px] object-cover brightness-50" />
                  <IoMdClose
                    size={16}
                    className="cursor-pointer text-white absolute right-2 top-1"
                    onClick={() => {
                      setFile(null);
                      setFileThumbnail("");
                      setFileType("");
                    }}
                  />
                </div>
              }

              <button
                onClick={() => {
                  if (file !== null && fileType === "image") {
                    uploadPicture(file);
                  } else if (file !== null && fileType === "video") {
                    uploadVideo(file!)
                  }
                }}
                className="w-full bg-primary-2 grid place-content-center rounded-lg text-white text-14-24 h-12"
              >
                {(loadingUploadPicture || loadingUploadVideo || loading) ? <Loader color="white.6" /> : "Upload"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default UploadMedia;
