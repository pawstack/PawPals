import webpack from 'webpack';
import path from 'path';

const config = {
  entry: {
    app: './client/src/app',
    login: './client/src/login',
    stripe: './client/src/stripe.jsx'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2']
            }
          },
        ]
      },

      {
        test: /\.css$/,
        use: [
                'style-loader', 'css-loader' ]
      }
    ]
  }
};

export default config;
