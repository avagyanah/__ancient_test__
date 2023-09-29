## Technical Task (Ancient Gaming)

> #### Core Concepts
>
> - Monorepo. It's done to separate client side code from bundler one and minimize dependencies.
> - There are two entry points, **assets.ts** and **index.ts**. First one requires all necessary assets (webpack style). Second one in our entry point.
> - Atlases are created manually by **Free Texture Packer**.
> - Handlebars: Fancy html (maybe unnecessary)
> - Responsive Design: I did cover some aspects of it. In task description I found nothing about importance of resizing, so I decided to not spend much time for every detail (like handle resize when cards are moving, ...etc).
> - Skipped polyfills for old devices support, due to time consumption.
> - External Libs: **gsap**, **lodash-es**, **@pixi/particle-emitter**, **pixi-stats**, **@gameastic/pixi-grid** (developer: me)

> #### Task1
>
> - Skipped resize handling only when cards are moving.

> #### Task2
>
> - 'image | text | image' configuration always has 2 image and one text with different order.

> #### Task3
>
> - It was hard to get fire effect with requirement (max 10 sprites on screen at once), the result has nothing in common with fire effect :), just demo of usage **https://pixijs.io/pixi-particles-editor/#**


