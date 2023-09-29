import { Container, Graphics, Text } from 'pixi.js';
import { assets } from '../assets';
import { emitter } from '../const';
import type { IGridConfig } from '../grid';
import { Grid } from '../grid';

const getGridConfig = (width: number, height: number): IGridConfig => {
    return {
        debug: { color: 0xff0000 },

        area: { x: 0, y: 0, width, height },

        cells: [
            {
                name: 'icon1',
                bounds: { x: 0, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'icon2',
                bounds: { x: 1 / 3, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'icon3',
                bounds: { x: 2 / 3, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
        ],
    };
};

export class MenuScene extends Grid {
    private _icon1!: TaskIcon;
    private _icon2!: TaskIcon;
    private _icon3!: TaskIcon;

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

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    private _build(): void {
        this.attach('icon1', (this._icon1 = new TaskIcon(1)));
        this.attach('icon2', (this._icon2 = new TaskIcon(2)));
        this.attach('icon3', (this._icon3 = new TaskIcon(3)));
    }
}

class TaskIcon extends Container {
    public constructor(private readonly _id: number) {
        super();

        this._buildBg();
        this._buildText();
    }

    private _buildBg(): void {
        const gr = new Graphics();
        this.addChild(gr);

        gr.lineStyle(6, 0xffb000, 1);
        gr.beginFill(0x004225, 1);
        gr.drawRoundedRect(0, 0, 200, 300, 10);
        gr.endFill();
        gr.pivot.set(100, 130);
        gr.eventMode = 'static';
        gr.on('pointertap', () => {
            emitter.emit('task', this._id);
        });
    }

    private _buildText(): void {
        const text = new Text(`Task ${this._id}`, {
            fontFamily: assets.fonts.LilitaOne,
            fontSize: 50,
            fill: '#ffffff',
            align: 'center',
        });
        text.anchor.set(0.5);

        this.addChild(text);
    }
}
