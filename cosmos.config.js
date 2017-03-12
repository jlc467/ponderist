export default {
  componentPaths: ['src/components'],
  containerQuerySelector: '#root',
  webpackConfigPath: 'react-scripts/config/webpack.config.dev',
  globalImports: ['./public/antd.css', './src/App.css'],
  hot: true,
  hmrPlugin: true
};
