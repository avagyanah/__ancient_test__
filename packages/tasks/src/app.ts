import { Application } from 'pixi.js';
import { emitter } from './const';
import { LoaderPlugin } from './plugins/loader-plugin';
import { ScreenPlugin } from './plugins/screen-plugin';
import { TickerPlugin } from './plugins/ticker-plugin';
import { getElementById, getResolution } from './utils';
import { Stage } from './views/stage';

export class App extends Application {
    public declare stage: Stage;

    public readonly tickerPlugin: TickerPlugin;
    public readonly loaderPlugin: LoaderPlugin;
    public readonly screenPlugin: ScreenPlugin;

    public constructor() {
        super({
            hello: true,
            view: getElementById('game_canvas'),
            resolution: getResolution(),
            backgroundAlpha: 1,
            antialias: true,
            backgroundColor: 0x686868,
        });

        this.stage = new Stage();

        emitter.on('resize', this._onResize, this);

        this.tickerPlugin = new TickerPlugin();
        this.loaderPlugin = new LoaderPlugin();
        this.screenPlugin = new ScreenPlugin();
    }

    public async preload(): Promise<void> {
        await this.loaderPlugin.load();
    }

    public async show(): Promise<void> {
        this.screenPlugin.resize();
        this.stage.show();
    }

    private _onResize(width: number, height: number): void {
        this.renderer.resize(width, height);
        this.stage.resize(width, height);
    }
}
