/* eslint-disable @typescript-eslint/consistent-type-imports */

export declare global {
    type IApp = import('../src/app').App;

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
}
