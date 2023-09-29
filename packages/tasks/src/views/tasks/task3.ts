import type { EmitterConfigV3 } from '@pixi/particle-emitter';
import { Emitter, upgradeConfig } from '@pixi/particle-emitter';
import type { Container } from 'pixi.js';
import { ParticleContainer } from 'pixi.js';
import { assets } from '../../assets';
import type { IGridConfig } from '../../grid';
import { CellScale, Grid } from '../../grid';

interface IEmitterConfig {
    parent: Container;
    config: EmitterConfigV3;
}

export const getFireParticlesConfig = (): EmitterConfigV3 => {
    return upgradeConfig(assets.particles.fire, ['particle01']);
};

export const makeEmitter = (config: IEmitterConfig): Emitter => {
    const { parent, config: emitterConfig } = config;

    return new Emitter(parent, emitterConfig);
};

const getGridConfig = (width: number, height: number): IGridConfig => {
    return {
        debug: { color: 0xff0000 },
        area: { x: 0, y: 0, width, height },
        cells: [
            {
                name: 'particle',
                scale: CellScale.none,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

export class Task3 extends Grid implements ITaskView {
    private _emitter!: Emitter;

    public constructor() {
        super();

        const { width, height } = window.globals.app.screen;
        this.resize(width, height);

        this._buildEmitter();
    }

    public getGridConfig(): IGridConfig {
        return getGridConfig(0, 0);
    }

    public dispose(): void {
        this._emitter.destroy();
        super.destroy({ children: true });
    }

    public resize(width: number, height: number): void {
        this.rebuild(getGridConfig(width, height));
    }

    private _buildEmitter(): void {
        const cont = new ParticleContainer();
        this._emitter = new Emitter(cont, getFireParticlesConfig());
        this._emitter.emit = true;
        this.attach('particle', cont);
    }
}
