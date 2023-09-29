import { Container, NineSlicePlane, Sprite, Text, Texture } from 'pixi.js';
import { assets } from '../../../assets';

export class Component extends Container {
    public constructor(private readonly _config: IComponentConfig) {
        super();

        const { bg, elements } = this._config;

        this._buildBg(bg);
        this._buildElements(elements);
    }

    private _buildBg(config: IComponentBgConfig): void {
        const bg = new NineSlicePlane(Texture.from(config.frame), 30, 25, 30, 25);
        bg.width = config.width;
        bg.height = config.height;
        this.addChild(bg);
    }

    private _buildElements(elements: IComponentElementConfig[]): void {
        elements.forEach((elConfig) => {
            const { type, area, config } = elConfig;

            let element: Sprite | Text;

            switch (type) {
                case 'image':
                    element = this._buildImage(config as IComponentImageElementConfig);
                    break;
                case 'text':
                    element = this._buildText(config as IComponentTextElementConfig);
                    break;
            }

            this.addChild(element);

            this._fitElement(element, area);
        });
    }

    private _buildImage(config: IComponentImageElementConfig): Sprite {
        const el = Sprite.from(Texture.from(config.frame));
        el.anchor.set(0.5);

        return el;
    }

    private _buildText(config: IComponentTextElementConfig): Text {
        const { fontSize, text } = config;

        const el = new Text(text, { fontSize, fontFamily: assets.fonts.LilitaOne });
        el.anchor.set(0.5);

        return el;
    }

    private _fitElement(element: Container, area: IRect): void {
        const { width, height } = this._config.bg;

        const gapY = 10;
        const gapX = 50;

        const center = { x: area.x + area.width * 0.5, y: area.y + area.height * 0.5 };
        const scale = Math.min(
            (height * area.height - gapY) / element.height,
            (width * area.width - gapX) / element.width,
        );

        element.scale.set(Math.min(1, scale));
        element.position.set(center.x * width, center.y * height);
    }
}
