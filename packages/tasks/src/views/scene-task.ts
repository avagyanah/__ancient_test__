import { Container } from 'pixi.js';

export class TaskScene extends Container {
    public constructor() {
        super();

        this.hide();
    }

    public resize(w: number, h: number): void {
        //
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}
