import type { StatsJSAdapter } from 'pixi-stats';
import { addStats } from 'pixi-stats';
import type { Application } from 'pixi.js';

export class StatsPlugin {
    private readonly _stats: StatsJSAdapter;

    public constructor(private readonly _app: Application) {
        this._stats = addStats(document, this._app);
    }

    public resize = (): void => {
        //
    };

    public update = (): void => {
        this._stats.update();
    };
}
