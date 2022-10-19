module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["tailwindcss-react-native/babel","module:react-native-dotenv","react-native-reanimated/plugin"],
  };
};
