export const getElementById = <T = HTMLElement>(id: string): T => {
    return <T>document.getElementById(id);
};

export function getResolution(): number {
    return 1;
}

export const getWindowSize = (): IDimension => {
    const { innerWidth: W, innerHeight: H } = window;

    return { width: W, height: H };
};
