import { Assets, Spritesheet } from 'pixi.js';
import { assets } from '../assets';

export class LoaderPlugin {
    public constructor() {
        //
    }

    public async load(): Promise<void> {
        const { atlases, images, fonts } = assets;

        await Promise.all([
            //
            this._loadImages(images),
            this._loadAtlases(atlases),
            this._loadFonts(fonts),
        ]);
    }

    private async _loadImages(images: Record<string, string>): Promise<void> {
        const keys = Object.keys(images);

        for (const k of keys) {
            Assets.add({ alias: k, src: images[k] });
        }

        await Assets.load(keys);
    }

    private async _loadAtlases(atlases: Record<string, { json: any; image: string }>): Promise<void> {
        const keys = Object.keys(atlases);

        for await (const k of keys) {
            const { image, json } = atlases[k];

            const texture = await Assets.load(image);
            const atlas = new Spritesheet(texture.baseTexture, json);

            await atlas.parse();
        }
    }

    private async _loadFonts(fonts: Record<string, string>): Promise<void> {
        const keys = Object.keys(fonts);

        for (const k of keys) {
            Assets.add({ alias: k, src: fonts[k] });
        }

        await Assets.load(keys);
    }
}
