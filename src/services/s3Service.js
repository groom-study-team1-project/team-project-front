import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "http://localhost:4566",
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  forcePathStyle: true,
});

export const uploadImageToS3 = async (file) => {
  console.log(file);

  if (!file || !file.name) {
    throw new Error("파일이 선택되지 않았습니다.");
  }
  const uploadParams = {
    Bucket: "test-bucket",
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    console.log(command);
    const response = await s3.send(command);
    console.log("이미지 업로드 성공:", response);

    const imageUrl = `http://localhost:4566/test-bucket/${file.name}`;

    return imageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};
