import { Ticker, utils } from 'pixi.js';

export class TickerPlugin {
    private readonly _ticker: Ticker;

    public constructor() {
        this._ticker = Ticker.shared;
    }

    public task = (config: ITickerTaskConfig): TickerTask => {
        const task = new TickerTask(config)
            //
            .on('complete', this.removeTask)
            .on('dispose', this.removeTask);

        this._ticker.add(task.update);

        return task;
    };

    public removeTask = (task: TickerTask): void => {
        this._ticker.remove(task.update);
    };
}

export class TickerTask {
    public speed = 1;
    public paused = false;

    private readonly _emitter: utils.EventEmitter<TickerTaskEvent>;

    private _repeat: number;
    private _remaining: number;
    private _started: boolean;

    public constructor(public readonly config: ITickerTaskConfig) {
        const { delay, repeat = 0 } = config;

        this._emitter = new utils.EventEmitter();
        this._remaining = delay * 1000;
        this._repeat = repeat;
        this._started = false;
    }

    public get running(): boolean {
        return this._remaining > 0;
    }

    public get remaining(): number {
        return this._remaining;
    }

    public get repeat(): number {
        return this._repeat;
    }

    public on(evt: TickerTaskEvent, listener: (...args: any[]) => void): TickerTask {
        this._emitter.on(evt, listener);

        return this;
    }

    public off(evt: TickerTaskEvent, listener: (...args: any[]) => void): TickerTask {
        this._emitter.off(evt, listener);

        return this;
    }

    public pause(): void {
        this.paused = true;
    }

    public resume(): void {
        this.paused = false;
    }

    public setSpeed(value: number): void {
        this.speed = value;
    }

    public dispose(): void {
        this._emitter.emit('dispose', this);
        this._dispose();
    }

    public update = (elapsed: number): void => {
        if (this.paused) {
            return;
        }

        if (!this._started) {
            this._emitter.emit('start');
            this._started = true;
        }

        this._remaining -= (elapsed / 0.06) * this.speed;

        if (this._remaining <= 0) {
            if (this._repeat === 0) {
                this._processComplete();
            } else {
                this._processRepeat();
            }
        }
    };

    private _processComplete(): void {
        this._remaining = 0;
        this._emitter.emit('complete', this);
        this._dispose();
    }

    private _processRepeat(): void {
        this._remaining = this.config.delay * 1000;
        this._repeat--;
        this._emitter.emit('repeat');
    }

    private _dispose(): void {
        this._remaining = 0;
        this._repeat = 0;

        this.update = () => {
            //
        };

        this._emitter.removeAllListeners();
    }
}
