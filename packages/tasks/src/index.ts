import { App } from './app';

window.addEventListener('load', async () => {
    const app = new App();

    await app.preload();
    await app.show();
});
