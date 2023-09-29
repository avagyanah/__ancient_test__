import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDev from '../configs/webpack.dev';

export default (async (): Promise<void> => {
    new WebpackDevServer(
        {
            liveReload: true,
            hot: false,
            host: '0.0.0.0',
            client: { logging: 'error', overlay: { errors: true } },
            static: { publicPath: '/' },
            port: 8080,
            devMiddleware: {
                stats: { all: false, errors: true, colors: true, timings: true, performance: true },
            },
        },
        webpack(webpackDev()),
    ).startCallback((err) => {
        if (err != null) {
            throw new Error(err.message);
        }
    });
})();
