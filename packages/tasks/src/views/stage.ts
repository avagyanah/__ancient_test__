import { Container } from 'pixi.js';
import { emitter } from '../const';
import { MenuScene } from './scene-menu';
import { TaskScene } from './scene-task';

export class Stage extends Container {
    private _menu!: MenuScene;
    private _task!: TaskScene;

    public constructor() {
        super();

        emitter.on('task', this._onTaskClick, this);
        emitter.on('menu', this._onMenuClick, this);
    }

    public show(): void {
        this.addChild((this._menu = new MenuScene()));
        this.addChild((this._task = new TaskScene()));

        this._menu.show();
    }

    public resize(w: number, h: number): void {
        this._menu?.resize(w, h);
        this._task?.resize(w, h);
    }

    private _onTaskClick(taskId: number): void {
        this._menu.hide();
        this._task.show(taskId);
    }

    private _onMenuClick(): void {
        this._menu.show();
        this._task.hide();
    }
}
