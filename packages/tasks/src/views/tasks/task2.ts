import { random, sample, shuffle } from 'lodash-es';
import { Container, NineSlicePlane, Sprite, Text, Texture } from 'pixi.js';
import type { IGridConfig } from '../../grid';
import { Grid } from '../../grid';
import type { TickerTask } from '../../plugins/ticker-plugin';

const getGridConfig = (width: number, height: number): IGridConfig => {
    return {
        debug: { color: 0xff0000 },
        area: { x: 0, y: 0, width, height },
        cells: [
            {
                name: 'component',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const framesSamples = ['icon-01', 'icon-02', 'icon-03', 'icon-04', 'icon-05', 'icon-06', 'icon-07', 'icon-08'];
const textsSamples = ['icon-01', 'icon-02', 'icon-03', 'icon-04', 'icon-05', 'icon-06', 'icon-07', 'icon-08'];

export class Task2 extends Grid implements ITaskView {
    private _generationTask!: TickerTask;
    private _component?: Component;

    public constructor() {
        super();

        const { width, height } = window.globals.app.screen;
        this.resize(width, height);

        this._startGeneration();
    }

    public getGridConfig(): IGridConfig {
        return getGridConfig(0, 0);
    }

    public dispose(): void {
        this._generationTask.dispose();
        super.destroy({ children: true });
    }

    public resize(width: number, height: number): void {
        this.rebuild(getGridConfig(width, height));
    }

    private _startGeneration(): void {
        this._generationTask = window.globals.app.tickerPlugin
            .task({
                delay: 2,
                repeat: -1,
            })
            .on('repeat', this._generateComponent)
            .on('start', this._generateComponent);
    }

    private _generateComponent = (): void => {
        if (this._component != null) {
            this._component.destroy({ children: true });
        }

        const types = shuffle<{ type: 'image' | 'text'; width: number }>([
            { type: 'image', width: 0.25 },
            { type: 'image', width: 0.25 },
            { type: 'text', width: 0.5 },
        ]);

        const { 0: t0, 1: t1, 2: t2 } = types;

        const config: IComponentConfig = {
            bg: { frame: 'nineslice-01', width: 400, height: 58 },
            elements: [
                {
                    type: t0.type,
                    area: { x: 0, y: 0, width: t0.width, height: 1 },
                    config: this._generateElementConfig(t0.type),
                },
                {
                    type: t1.type,
                    area: { x: t0.width, y: 0, width: t1.width, height: 1 },
                    config: this._generateElementConfig(t1.type),
                },
                {
                    type: t2.type,
                    area: { x: t0.width + t1.width, y: 0, width: t2.width, height: 1 },
                    config: this._generateElementConfig(t2.type),
                },
            ],
        };

        const component = new Component(config);
        this.attach('component', (this._component = component));
    };

    private _generateElementConfig(type: 'text' | 'image'): IComponentElementConfig['config'] {
        switch (type) {
            case 'text':
                return {
                    text: sample(textsSamples)!,
                    fontSize: random(20, 40, false),
                };

            case 'image':
                return {
                    frame: sample(framesSamples)!,
                };
        }
    }
}

interface IComponentConfig {
    bg: IComponentBgConfig;
    elements: IComponentElementConfig[];
}

interface IComponentBgConfig {
    width: number;
    height: number;
    frame: string;
}

interface IComponentElementConfig {
    type: 'image' | 'text';
    area: IRect;
    config: IComponentImageElementConfig | IComponentTextElementConfig;
}

interface IComponentImageElementConfig {
    frame: string;
}

interface IComponentTextElementConfig {
    text: string;
    fontSize: number;
}

class Component extends Container {
    public constructor(private readonly _config: IComponentConfig) {
        super();

        const { bg, elements } = this._config;

        this._buildBg(bg);
        this._buildElements(elements);
    }

    private _buildBg(config: IComponentBgConfig): void {
        const bg = new NineSlicePlane(Texture.from(config.frame), 30, 25, 30, 25);
        bg.width = config.width;
        bg.height = config.height;
        this.addChild(bg);
    }

    private _buildElements(elements: IComponentElementConfig[]): void {
        elements.forEach((elConfig) => {
            const { type, area, config } = elConfig;
            let element: Sprite | Text;

            switch (type) {
                case 'image':
                    element = this._buildImage(config as IComponentImageElementConfig);
                    break;
                case 'text':
                    element = this._buildText(config as IComponentTextElementConfig);
                    break;
            }

            this.addChild(element);
            this._fitElement(element, area);
        });
    }

    private _buildImage(config: IComponentImageElementConfig): Sprite {
        const el = Sprite.from(Texture.from(config.frame));
        el.anchor.set(0.5);

        return el;
    }

    private _buildText(config: IComponentTextElementConfig): Text {
        const { fontSize, text } = config;

        const el = new Text(text, { fontSize });
        el.anchor.set(0.5);

        return el;
    }

    private _fitElement(element: Container, area: IRect): void {
        const { width, height } = this._config.bg;

        const gapY = 10;
        const gapX = 10;

        const center = { x: area.x + area.width * 0.5, y: area.y + area.height * 0.5 };
        const scale = Math.min(
            (height * area.height - gapY) / element.height,
            (width * area.width - gapX) / element.width,
        );

        element.scale.set(Math.min(1, scale));
        element.position.set(center.x * width, center.y * height);
    }
}
