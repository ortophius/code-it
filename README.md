# React-ssr-boilerplate
My lightweight boilerplate for react + redux + typescript ssr applications

There are no things like:
* Overcomplicated webpack config
* Routing table (there is only one route as example)
* Stylings (you can implement it however you like)

There are things like:
* React
* Redux
* Server-side rendering
* Simple webpack config, which you can extend in any way
* NPM scripts

## Installation
```
npm i
```
That's it!

## Scripts
* `npm run start` - Start webpack in watch mode. Please note, that as default you need to start backend server manually!
* `npm run build` - Just build a project with same config. You can exend webpack config to add options for producion build.

## Project tree

```
- client/           - Modules and scripts relevant only for front-end side
- dist/             - Build folder
- server/           - Server modules and scripts
- src/              - Modules used for front-end and back-end rendering
  - components/     - React components
  - store/          - Redux store modules
    - features/     - Redux features like reducers, action creators, etc.
  - types/
    - types.d.ts    - Global types for Typescript
```

# Path alias
Absolute path is mapped to `src` folder. For example, you can import module located in `/src/components/myComponent/index.ts` like this:

```Typescript
import myComponent from 'components/myComponent'
```

Don't worry, TS looks for modules at `node_modules` as well.

Feel free to fork and use this boilerplate in your projects!
