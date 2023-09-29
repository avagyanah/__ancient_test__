import { random, sample, shuffle } from 'lodash-es';
import type { IGridConfig } from '../../../grid';
import { Grid } from '../../../grid';
import type { TickerTask } from '../../../plugins/ticker-plugin';
import { getTask2GridConfig } from '../../grid-configs';
import { Component } from './component';

const framesSamples = ['icon-01', 'icon-02', 'icon-03', 'icon-04', 'icon-05', 'icon-06', 'icon-07', 'icon-08'];
const textsSamples = ['abcdef', 'abcdefgh', 'abcdefghij', 'abcdefghijkl', 'abcdefghijklmn', 'abcdefghijklmnop'];

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
        return getTask2GridConfig(0, 0);
    }

    public dispose(): void {
        this._generationTask.dispose();
        super.destroy({ children: true });
    }

    public resize(width: number, height: number): void {
        this.rebuild(getTask2GridConfig(width, height));
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
            { type: 'image', width: 0.28 },
            { type: 'text', width: 0.44 },
            { type: 'image', width: 0.28 },
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
