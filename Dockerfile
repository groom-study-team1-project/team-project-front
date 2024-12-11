# 베이스 이미지로 Node.js 18 사용 (Slim 버전으로 최적화)
FROM node:18-bullseye-slim

# 앱 디렉토리 생성 및 설정
WORKDIR /app

# 애플리케이션 파일 추가
COPY package*.json ./  
RUN npm install        

# 나머지 애플리케이션 파일 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 환경 변수 및 포트 설정
ENV HOST=0.0.0.0
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]
