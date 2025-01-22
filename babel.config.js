module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    process.env.NODE_ENV === "production"
      ? ["transform-remove-console", { exclude: [] }] // 모든 console 제거
      : null,
  ].filter(Boolean),
};
