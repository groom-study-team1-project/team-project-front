module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }], // React 자동 import
  ],
  plugins: [
    process.env.NODE_ENV === "production"
      ? ["transform-remove-console", { exclude: ["error", "warn"] }]
      : null,
  ].filter(Boolean),
};
