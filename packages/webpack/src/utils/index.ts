import type webpack from 'webpack';

const logStats = (stats: webpack.Stats | undefined, err: Error | undefined): void => {
    console.log(
        stats?.toString({
            chunks: false,
            colors: true,
        }),
    );

    void err;
};

export default { logStats };
