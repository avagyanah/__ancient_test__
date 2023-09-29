import type { Container } from 'pixi.js';

export declare global {
    type AppEvents = {
        start: [time: number];
        resize: [width: number, height: number];
        task: [id: number];
        menu: [];
    };

    interface IDimension {
        width: number;
        height: number;
    }

    type TickerTaskEvent = 'start' | 'complete' | 'repeat' | 'dispose';

    interface ITickerTaskConfig {
        delay: number;
        repeat?: number;
    }

    interface ITaskView extends Container {
        dispose: () => void;
        resize: (width: number, height: number) => void;
    }

    interface IPoint {
        x: number;
        y: number;
    }

    interface IRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
