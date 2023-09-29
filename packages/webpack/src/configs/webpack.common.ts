/* eslint-disable @typescript-eslint/naming-convention */

import HtmlWebpackPlugin from 'html-webpack-plugin';
import pt from 'path';
import type { Configuration } from 'webpack';

// prettier-ignore
const PATHS = {
    dist:               pt.resolve('dist'),
    html:               pt.resolve('html', 'index.hbs'),
    index:              pt.resolve('src', 'index.ts'),
    assets:             pt.resolve('src', 'assets.ts'),
};

export default (mode: 'none' | 'development' | 'production'): Configuration => {
    return {
        mode,

        entry: {
            assets: {
                import: [PATHS.assets],
            },
            index: {
                import: [PATHS.index],
                asyncChunks: false,
                dependOn: 'assets',
            },
        },

        output: {
            publicPath: '',
            path: PATHS.dist,
            filename: '[name].js',
            clean: true,
        },

        resolve: {
            extensions: ['.ts', '.js', '.jsx', '.tsx'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Technical Task',
                template: PATHS.html,
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    use: ['handlebars-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.((jpeg|jpg|png)|(mp3|ogg|wav)|(woff|woff2))$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[path][name][ext]',
                    },
                },
                {
                    test: /\.((atlas))/,
                    type: 'asset/source',
                },
            ],
        },
    };
};
