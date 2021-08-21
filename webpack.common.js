const path = require('path');


module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
              test: /\.html$/,
              use: {
                  loader: 'html-loader',
                  options: {
                      sources: true
                  }
              }
          },
      ],

  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
};