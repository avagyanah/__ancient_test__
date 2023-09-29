import { Sprite } from 'pixi.js';
import { assets } from '../assets';
import { emitter } from '../const';
import type { IGridConfig } from '../grid';
import { CellAlign, Grid } from '../grid';

const getGridConfig = (width: number, height: number): IGridConfig => {
    return {
        debug: { color: 0xff0000 },

        area: { x: 0, y: 0, width, height },

        cells: [
            {
                name: 'back',
                align: CellAlign.leftTop,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                offset: { x: 20, y: 20 },
            },
        ],
    };
};

export class TaskScene extends Grid {
    public constructor() {
        super();

        this._build();
        this.hide();
    }

    public getGridConfig(): IGridConfig {
        return getGridConfig(0, 0);
    }

    public resize(w: number, h: number): void {
        this.rebuild(getGridConfig(w, h));
    }

    public show(taskId: number): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    private _build(): void {
        const back = Sprite.from(assets.images.back);
        back.eventMode = 'static';
        back.on('pointertap', () => {
            emitter.emit('menu');
        });

        this.attach('back', back);
    }
}
