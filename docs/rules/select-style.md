# Select Style

> This rule enforces consistent usage of `select` method or `select` operator on the store.

## Rule Details

There are two ways of selecting data from the store, either by using the `this.store.select(selectorFn)` method, or by using the `this.store.pipe(select(selectorFn))` operator. Either way is considered correct, although the first way is preferred as it requires less code and it doesn't require the need to import the `selector` operator.

Because it's important to keep things consistent, this rule disallows using both across the same codebase.

Examples of **incorrect** code for this rule:

```ts
export class Component {
  someData$ = this.store.select(someData)
  otherData$ = this.store.pipe(select(otherData))
}
```

Examples of **correct** code for this rule:

```ts
export class Component {
  someData$ = this.store.select(someData)
  otherData$ = this.store.select(otherData)
}
```

## Rule Config

To configure this rule you can change the preferred `mode` of the selectors, the allowed values are `method` and `operator`.

To prefer the **method** syntax (`this.store.select(selector)`) use:

```json
"rules": {
  "ngrx/select-style": ["warn", { "mode": "method" }]
}
```

To prefer the **operator** syntax (`this.store.pipe(select(selector))`) use:

```json
"rules": {
  "ngrx/select-style": ["warn", { "mode": "operator" }]
}
```
