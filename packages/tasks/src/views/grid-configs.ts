import { CellAlign, CellScale, type IGridConfig } from '@gameastic/pixi-grid';

export const getMenuSceneGridConfig = (width: number, height: number): IGridConfig => {
    return {
        area: { x: 0, y: 0, width, height },

        cells: [
            {
                name: 'icon1',
                bounds: { x: 0, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'icon2',
                bounds: { x: 1 / 3, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
            {
                name: 'icon3',
                bounds: { x: 2 / 3, y: 0, width: 1 / 3, height: 1 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
        ],
    };
};

export const getTaskSceneGridConfig = (width: number, height: number): IGridConfig => {
    return {
        area: { x: 0, y: 0, width, height },

        cells: [
            {
                name: 'back',
                align: CellAlign.leftTop,
                bounds: { x: 0.02, y: 0.02, width: 0.1, height: 1 },
            },
        ],
    };
};

export const getTask2GridConfig = (width: number, height: number): IGridConfig => {
    return {
        area: { x: 0, y: 0, width, height },
        cells: [
            {
                name: 'component',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

export const getTask3GridConfig = (width: number, height: number): IGridConfig => {
    return {
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
