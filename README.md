[![Netlify Status](https://api.netlify.com/api/v1/badges/64c0bac5-8fd8-4dc9-aba0-398e7e159a4f/deploy-status)](https://app.netlify.com/sites/sad-perlman-3b5f49/deploys)

# Tiber

A simple and clean TODO app writen with the newwest version of Vue framework (`3.0.0-beta.12`).

Live [here](https://www.tiber.joelxr.dev).

## Deploying

It's already deployed and avaliable at https://www.tiber.joelxr.dev/. To manually deploy it follow the instructions:

```sh
npm install
npm run build
```

Or, to development mode:

```sh
npm run dev
```

## About the project

### Motivation

`Tiber` is a simple and clean TODO app that I started this out to study and get my hands on the new features of Vue 3. It's not a Vue CLI project and doesn`t use Vite as well (no reason for that only that I'm still pretty conviced that webpack is one of the best things that ever happened for web development and I'm still a believer).

### What `Tiber` uses

It's a Vue 3 project built and delived by Webpack, it uses:

- `TailwindCSS` for styling,
- `popper.js` to handle dropdowns,
- `date-fns` to maniputale dates,
- `markdown-it` to make possibel tasks markdown description support,
- `highlight.js` to give markdown syntax highlight for all major programing languages,
- `idb` to help reading and storing data inside a IndexedDB store.

### Next steps

I'm looking foward to increase a lot of features and try a bunch of things out, such as:

- Unit testing with Jest and `vue-test-utils`,
- End to end tests with Cypress,
- Keyboard shortcuts,
- Built-in lists,
- Animations,
- Drag and drop to sort tasks and steps and
- Export and import data to avoid losing data with IndexedDB.
