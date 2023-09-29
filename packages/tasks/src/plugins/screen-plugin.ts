import { emitter } from '../const';
import { getWindowSize } from '../utils';

export class ScreenPlugin {
    public constructor() {
        this._setResizeListener();
        this.resize();
    }

    public resize = (): void => {
        const { width, height } = getWindowSize();

        emitter.emit('resize', width, height);
    };

    private _setResizeListener(): void {
        window.addEventListener('orientationchange', this.resize);
        window.addEventListener('resize', this.resize);
    }
}
