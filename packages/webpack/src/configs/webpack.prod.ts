/* eslint-disable @typescript-eslint/naming-convention */

import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

export default (): Configuration => {
    return merge(commonConfig('production'), {
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'esbuild-loader',
                    exclude: /node_modules/,
                    options: {
                        target: 'es2015',
                    },
                },
            ],
        },

        plugins: [
            //
        ],

        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: 4,
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        format: {
                            comments: false,
                            ascii_only: true,
                        },
                    },
                }),
            ],
        },
    });
};
