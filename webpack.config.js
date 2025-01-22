const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.js", // 진입점
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // 기존 파일 삭제 후 빌드
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JS, JSX 파일 변환
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
            plugins: [
              process.env.NODE_ENV === "production"
                ? ["transform-remove-console", { exclude: ["error", "warn"] }]
                : null,
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/, // ✅ CSS 파일을 처리할 로더 추가
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // ✅ 이미지 파일을 처리할 로더 추가
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 🚀 public/index.html을 dist로 복사
      filename: "index.html",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    historyApiFallback: true, // React 라우팅 문제 해결
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    extensions: [".js", ".jsx"],
  },
};
