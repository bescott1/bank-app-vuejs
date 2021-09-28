# vue-bank-app

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm serve
```

### Compiles and minifies for production

```bash
npm build
```

### Lints and fixes files

```bash
npm lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Notes

This app is written in Vue 3 which more heavily relies on TypeScript than Vue 2. While TypeScript can be tricky to get a handle on, it will help to reinforce the learning of Vue so that you can quickly jump into a project utilizing either version/language. Vue 3 is where the industry is going so if you are starting a project from scratch, it is best to start using the [Options API](https://v3.vuejs.org/guide/typescript-support.html#using-with-options-api) because it is most similar to how Vue 2 operates. You will see this in the `CreateAccountForm.component.ts` file. The [Composition API](https://v3.vuejs.org/guide/typescript-support.html#using-with-composition-api) is trickier to understand at first and you may find less support online because of its novelty (if you are already familiar with React, then the equivalency/inspiration here is React Hooks).

Another way to write Vue class files is by utilizing [class components](https://class-component.vuejs.org/). This is a very popular style in Vue 2 but is not fully supported in Vue 3 yet (at least not as of now when I'm writing this because of [reasons](https://github.com/vuejs/rfcs/pull/17#issuecomment-494242121)). Nonetheless, the `master` branch includes some of this for anyone who may be learning coming into/from a Vue 2 project. Given there may be migration necessary for projects going from Vue 2 to Vue 3, [here](https://github.com/vuejs/vue-class-component/issues/406) are more details about using class components in Vue 3 (just because it uses an `@Options` decorator does not mean it is the same as the Options API mentioned before).

There are really only two ways to do state management in Vue: [props/emit](https://v3.vuejs.org/guide/component-basics.html#passing-data-to-child-components-with-props) and [Vuex](https://vuex.vuejs.org/). Vuex is the official pattern but may be overkill for small apps. The View Account in the `master` branch is retrieving an account via the `accountId` prop that is passed from the route. The Add Account component in the `master` branch emits up the new account that is sent from the backend. The `exercise-complete` branch should use Vuex as a way to learn the considerations for and refactor during an expanding app's evolution.

Forms in Vue can be done via 3rd party libraries but many are not available in Vue 3 yet. [Vee-Validate](https://vee-validate.logaretm.com/v4/) is one that works pretty well. It is demonstrated in the Add Account form via [the Components flavor](https://vee-validate.logaretm.com/v4/guide/overview#using-a-script-tag) for simplicity.
