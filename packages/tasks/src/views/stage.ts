import { Container } from 'pixi.js';
import { MenuScene } from './scene-menu';
import { TaskScene } from './scene-task';
import { UIScene } from './scene-ui';

// GridSettings.debug = process.env.NODE_ENV === 'development';

export class Stage extends Container {
    private _ui!: UIScene;
    private _menu!: MenuScene;
    private _task!: TaskScene;

    public constructor() {
        super();

        this.addChild((this._ui = new UIScene()));
        this.addChild((this._menu = new MenuScene()));
        this.addChild((this._task = new TaskScene()));
    }

    public show(): void {
        this._menu.show();
    }

    public resize(w: number, h: number): void {
        this._ui.resize(w, h);
        this._menu.resize(w, h);
        this._task.resize(w, h);
    }
}
