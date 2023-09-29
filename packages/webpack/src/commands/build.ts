import { webpack } from 'webpack';
import webpackProd from '../configs/webpack.prod';
import utils from '../utils';

export default (async (): Promise<void> => {
    webpack(webpackProd(), (err, stats) => {
        if (err != null) {
            throw new Error(err.message);
        } else if (stats?.hasErrors() ?? stats?.hasWarnings()) {
            utils.logStats(stats, err);
        }
    });
})();
