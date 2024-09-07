import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "http://localhost:4566",
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

export const uploadImageToS3 = async (file) => {
  const uploadParams = {
    Bucket: "profile-images-storage",
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    const response = await s3.send(command);
    console.log("이미지 업로드 성공:", response);

    const imageUrl = `http://localhost:4566/profile-images-storage/${file.name}`;

    return imageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};
