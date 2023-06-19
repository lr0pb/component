# ⚡ Bootstrap React component folder structure (Beta)

CLI for bootstraping component folder structure for TypeScript React projects that use SCSS Modules for styling and [React Cosmos](https://github.com/react-cosmos/react-cosmos#readme) for visual testing

### Install

```sh
npm i -D @lr0pb/component
```

### Using

```sh
npx c Button
```

It will create in your working directory folder `src/components/Button` for component.

Actually, you can create components like this:

```sh
npx c shared/ui/Button
```

In this case, `src/shared/ui/components/Button` will be created. You can also remove creating nested `components` folder with `--exact-path` (`-e`) flag or set custom base folder via `--source-dir` flag. Component have file structure like this:

```
Button
  |- Button.tsx
  |- Button.fixture.tsx
  |- Button.types.ts
  |- index.ts
```

You can also use flags `--css` (`-c`) and `--decorator` (`-d`) to get complete component folder:

```diff
Button
  |- Button.tsx
  |- Button.fixture.tsx
+ |- Button.module.scss
+ |- Button.module.scss.d.ts
  |- Button.types.ts
+ |- cosmos.decorator.tsx
  |- index.ts
```

Types declaration file for styles is the same you get from [Typed CSS Modules](https://www.npmjs.com/package/typed-css-modules) with `--namedExports` flag

CLI was created using [Pastel](https://github.com/vadimdemedes/pastel#readme), [Ink](https://github.com/vadimdemedes/ink#readme) and [Ink UI](https://github.com/vadimdemedes/ink-ui#readme)
