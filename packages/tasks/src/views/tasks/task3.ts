import { Container } from 'pixi.js';

export class Task3 extends Container implements ITaskView {
    public constructor() {
        super();
    }

    public dispose(): void {
        super.destroy({ children: true });
    }

    public resize(width: number, height: number): void {
        //
    }
}
