// .storybook/main.js
export default {
  stories: ["../src/**/*.stories.@(js|jsx|mjs)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Remove existing CSS module rules to avoid conflicts
    config.module.rules = config.module.rules.filter(
      rule => !(rule.test && rule.test.toString().includes('module'))
    );

    config.module.rules.push(
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              },
              esModule: false,  // <-- explicitly set this to false for Storybook
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    );

    config.resolve.extensions.push('.js', '.jsx');

    return config;
  },
};
