import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import pt from 'path';
import type { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

export default (): Configuration => {
    return merge(commonConfig('development'), {
        devtool: 'eval-source-map',

        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'esbuild-loader',
                    exclude: /node_modules/,
                    options: {
                        target: 'esnext',
                    },
                },
            ],
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin({
                devServer: true,
                typescript: {
                    configFile: pt.resolve('tsconfig.json'),
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                },
            }),
        ],
    });
};
