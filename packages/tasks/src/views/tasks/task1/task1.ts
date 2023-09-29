import gsap from 'gsap';
import { Container, Texture } from 'pixi.js';
import type { TickerTask } from '../../../plugins/ticker-plugin';
import { Card, cardFrames } from './card';
import { Stack } from './stack';

export class Task1 extends Container implements ITaskView {
    private _config = { cardsCount: 144, cardHeight: 210 };
    private _tweens: gsap.core.Tween[] = [];
    private _animationTask!: TickerTask;

    private _stack1!: Stack;
    private _stack2!: Stack;

    public constructor() {
        super();

        this._buildStacks();
        this._buildCards();

        const { width, height } = window.globals.app.screen;
        this._repositionStacks(width, height);

        this._startAnimation();
    }

    public resize(width: number, height: number): void {
        this._invalidateTweens();
        this._repositionStacks(width, height);
    }

    public dispose(): void {
        this._animationTask.dispose();
        this._tweens.forEach((t) => t.kill());

        super.destroy({ children: true });
    }

    private _buildStacks(): void {
        this._stack1 = new Stack();
        this._stack2 = new Stack();

        this.addChild(this._stack1);
        this.addChild(this._stack2);

        this._stack1.y = 50;
        this._stack2.y = 50;
    }

    private _buildCards(): void {
        const { cardsCount } = this._config;
        for (let i = 0; i < cardsCount; i++) {
            const card = new Card(Texture.from(cardFrames[i % (cardFrames.length - 1)]));
            this._stack1.pushCard(card);
        }
    }

    private _startAnimation(): void {
        this._animationTask = window.globals.app.tickerPlugin
            .task({
                delay: 1,
                repeat: this._config.cardsCount,
            })
            .on('repeat', () => {
                this._moveCard();
            });
    }

    private _moveCard(): void {
        const card = this._stack1.getLast()!;

        const posFrom = this._stack2.toLocal(this._stack1.toGlobal(card.position.clone()));

        this._stack1.popCard();
        this._stack2.pushCard(card);

        const tween = gsap.from(card, {
            duration: 2,
            x: posFrom.x,
            y: posFrom.y,
            onComplete: () => {
                this._tweens.splice(this._tweens.indexOf(tween), 1);
            },
        });

        this._tweens.push(tween);
    }

    private _invalidateTweens(): void {
        this._tweens.forEach((tween) => {
            tween.totalProgress(1);
            tween.kill();
        });
    }

    private _repositionStacks(width: number, height: number): void {
        this._stack1.position.x = width * 0.3;
        this._stack2.position.x = width * 0.7;

        const { cardsCount, cardHeight } = this._config;
        const gap = (height - cardHeight - 50) / cardsCount;

        this._stack1.adjustGap(gap);
        this._stack2.adjustGap(gap);
    }
}
