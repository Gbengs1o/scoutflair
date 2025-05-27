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
      size="auto"
    >
      <Modal.Overlay />
      <Modal.Content className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[500px] mx-auto">
        <Modal.Body>
          <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="w-full flex flex-col gap-3 sm:gap-4">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-dark font-bold text-14-16 sm:text-16-19">
                  Upload Gallery Media
                </h2>
                <IoMdCloseCircleOutline
                  onClick={close}
                  className="cursor-pointer text-dark hover:text-red-500 transition-colors"
                  size={20}
                />
              </div>

              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-12-14 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 sm:h-12 px-3 focus:outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent transition-all"
              />

              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent transition-all h-20 sm:h-28 rounded-lg border bg-white placeholder:text-placeholder text-dark text-12-14 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3"
              />

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-12-14 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 sm:h-12 px-3 focus:outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent transition-all"
              >
                <option
                  value={""}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Select a category
                </option>
                <option
                  value={"Goals"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Goals
                </option>
                <option
                  value={"Assists"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Assists
                </option>
                <option
                  value={"Free Kicks"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Free Kicks
                </option>
                <option
                  value={"Penalties"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Penalties
                </option>
                <option
                  value={"Throws"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Throws
                </option>
                <option
                  value={"Other"}
                  className="cursor-pointer text-14-16 sm:text-16-19 text-dark font-semibold"
                >
                  Other
                </option>
              </select>

              {file === null && (
                <button 
                  onClick={openFileManager} 
                  className="w-fit flex gap-2 text-11-13 sm:text-12-14 items-center text-primary-2 font-semibold hover:text-primary-1 transition-colors p-2 rounded-md hover:bg-gray-50"
                >
                  Select Media
                  <FaRegFileImage className="text-primary-2" size={14} />
                  <input 
                    ref={fileRef} 
                    type="file" 
                    style={{ display: "none" }} 
                    accept=".jpg,.jpeg,.png,.mp4,.mkv" 
                    onChange={(e) => {
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
                    }} 
                  />
                </button>
              )}

              {fileThumbnail !== "" && (
                <div className="w-full max-w-[280px] sm:max-w-[320px] h-[160px] sm:h-[200px] relative overflow-hidden rounded-lg mx-auto">
                  <Image 
                    src={fileThumbnail} 
                    alt="Selected media preview" 
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover brightness-50" 
                  />
                  <IoMdClose
                    size={18}
                    className="cursor-pointer text-white absolute right-2 top-2 hover:text-red-300 transition-colors bg-black/30 rounded-full p-1"
                    onClick={() => {
                      setFile(null);
                      setFileThumbnail("");
                      setFileType("");
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {fileType === "image" ? "Image" : "Video"}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (file !== null && fileType === "image") {
                    uploadPicture(file);
                  } else if (file !== null && fileType === "video") {
                    uploadVideo(file!)
                  }
                }}
                disabled={!file || !title.trim() || !category || (loadingUploadPicture || loadingUploadVideo || loading)}
                className="w-full bg-primary-2 hover:bg-primary-1 disabled:bg-gray-300 disabled:cursor-not-allowed grid place-content-center rounded-lg text-white text-12-20 sm:text-14-24 h-10 sm:h-12 transition-colors font-semibold"
              >
                {(loadingUploadPicture || loadingUploadVideo || loading) ? <Loader color="white.6" size="sm" /> : "Upload"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default UploadMedia;