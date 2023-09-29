import { Container, Sprite, Text } from 'pixi.js';
import { assets } from '../../../assets';
import type { Card } from './card';

export class Stack extends Container {
    private _count!: Text;
    private _cards: Card[] = [];
    private _gap = 0;

    public constructor() {
        super();

        this._buildBack();
        this._buildCount();
    }

    public getLast(): Card | undefined {
        return this._cards[this._cards.length - 1];
    }

    public hasCard(): boolean {
        return this._cards.length > 0;
    }

    public adjustGap(gap: number): void {
        this._gap = gap;

        this._cards.forEach((card, i) => {
            card.position.y = i * gap;
        });
    }

    public pushCard(card: Card): Card {
        this._cards.push(card);
        this.addChild(card);

        card.position.y = (this._cards.length - 1) * this._gap;

        this.updateCount();

        return card;
    }

    public popCard(): Card {
        const index = this._cards.length - 1;
        const card = this._cards[index];

        this._cards.splice(index, 1);
        this.removeChild(card);
        this.updateCount();

        return card;
    }

    public updateCount(): void {
        this._count.text = `${this._cards.length}`;
        this._count.updateText(true);
    }

    private _buildBack(): void {
        const back = Sprite.from('card-empty');
        back.anchor.set(0.5, 0);
        this.addChild(back);
    }

    private _buildCount(): void {
        this._count = new Text(' ', {
            fontFamily: assets.fonts.LilitaOne,
            fill: 0xffffff,
        });

        this._count.anchor.set(0.5, 0);
        this._count.y = -40;
        this.addChild(this._count);
    }
}
