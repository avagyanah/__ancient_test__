interface IComponentConfig {
    bg: IComponentBgConfig;
    elements: IComponentElementConfig[];
}

interface IComponentBgConfig {
    width: number;
    height: number;
    frame: string;
}

interface IComponentElementConfig {
    type: 'image' | 'text';
    area: IRect;
    config: IComponentImageElementConfig | IComponentTextElementConfig;
}

interface IComponentImageElementConfig {
    frame: string;
}

interface IComponentTextElementConfig {
    text: string;
    fontSize: number;
}
