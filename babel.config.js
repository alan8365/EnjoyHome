module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "src": "./src",
            "views": "./src/views",
            // "types": "./src/@types",
            "components": "./src/components",
            "contexts": "./src/contexts",

            "assets": "./assets",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
