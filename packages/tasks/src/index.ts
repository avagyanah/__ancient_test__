import { App } from './app';

window.addEventListener('load', async () => {
    const app = new App();
    window.globals.app = app;

    await app.preload();
    await app.show();
});
