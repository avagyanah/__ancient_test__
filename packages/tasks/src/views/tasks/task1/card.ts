import { shuffle } from 'lodash-es';
import type { Texture } from 'pixi.js';
import { Sprite } from 'pixi.js';

export const cardFrames = shuffle([
    'card-001',
    'card-002',
    'card-003',
    'card-004',
    'card-005',
    'card-006',
    'card-007',
    'card-008',
    'card-009',
    'card-010',
    'card-011',
    'card-012',
    'card-013',
    'card-014',
    'card-015',
    'card-016',
    'card-017',
    'card-018',
    'card-019',
    'card-020',
    'card-021',
    'card-022',
    'card-023',
    'card-024',
    'card-025',
    'card-026',
]);

export class Card extends Sprite {
    public constructor(texture: Texture) {
        super(texture);

        this.anchor.set(0.5, 0);
    }
}
