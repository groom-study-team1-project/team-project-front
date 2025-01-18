import axiosInstance from "../axiosConfig";

export const imageUpload = async (keyType, image) => {
  try {
    const body = {
      contentType: "image/jpeg",
      keyType: keyType,
    };
    const result = await axiosInstance.post(
      `/open/file/presigned-url-generation`,
      body
    );
    await s3Presigned(result, image);
    return {
      accessImage: result.data.result.accessUrl,
      fileKey: result.data.result.fileKey,
    };
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    throw error;
  }
};

export const s3Presigned = async (body, image) => {
  try {
    console.log(body.data.result.presignedUrl);
    console.log(image);
    await axiosInstance.put(body.data.result.presignedUrl, image, {
      headers: {
        "Content-Type": "image/jpeg",
        "x-amz-tagging": "Status=Deleted",
      },
    });
  } catch (error) {
    console.error("s3Presigned 업로드 에러:", error);
    throw error;
  }
};
