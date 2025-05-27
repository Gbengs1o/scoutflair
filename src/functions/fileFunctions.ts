export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
}

export function detectFileType(file: File) {
  if (
    file.name.includes(".jpg") ||
    file.name.includes(".jpeg") ||
    file.name.includes(".png")
  )
    return "image";

  if (file.name.includes(".mkv") || file.name.includes(".mp4")) return "video";

  return "Invalid Format";
}

export function getVideoThumbnail(file: File) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, 320, 180);
      const dataURL = canvas.toDataURL("image/jpeg");
      resolve(dataURL);
    };
  });
}
