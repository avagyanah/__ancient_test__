import { Sprite } from 'pixi.js';
import { emitter } from '../const';
import type { IGridConfig } from '../grid';
import { CellAlign, Grid } from '../grid';
import { Task1 } from './tasks/task1';
import { Task2 } from './tasks/task2';
import { Task3 } from './tasks/task3';

const getGridConfig = (width: number, height: number): IGridConfig => {
    return {
        debug: { color: 0xff0000 },

        area: { x: 0, y: 0, width, height },

        cells: [
            {
                name: 'back',
                align: CellAlign.leftTop,
                bounds: { x: 0.02, y: 0.02, width: 0.1, height: 1 },
            },
        ],
    };
};

export class TaskScene extends Grid {
    private _task?: ITaskView;

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
        this._task?.resize(w, h);
    }

    public show(taskId: number): void {
        switch (taskId) {
            case 1:
                this._task = new Task1();
                break;

            case 2:
                this._task = new Task2();
                break;

            case 3:
                this._task = new Task3();
                break;

            default:
                throw new Error(`Incorrect task ID ${this.tabIndex}`);
        }

        this.addChild(this._task!);
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
        this._task?.dispose();
        this._task = undefined;
    }

    private _build(): void {
        const back = Sprite.from('back-btn');
        back.eventMode = 'static';
        back.on('pointertap', () => {
            emitter.emit('menu');
        });

        this.attach('back', back);
    }
}
