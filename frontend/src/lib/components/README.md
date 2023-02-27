# Components organization

Nplex's UI components should be organized (in progress) under their own directories as co-located
collections of `.svelte` markup + logic and `.scss` styles.

## Edge cases

### Group bindings

For components that need to handle `bind:group`, refer to
https://github.com/sveltejs/svelte/issues/2308#issuecomment-539954299.

We decide to adopt the following makeshift solution:

```ts
$: type === 'radio' && updateRadio(group, value);
$: type === 'checkbox' && group && value != null && updateCheckbox(group, value);
$: type === 'checkbox' && group && updateGroup(checked, value);

function updateRadio(g: $$Props['group'], v: $$Props['value']) {
  checked = group === value;
}

function updateCheckbox(g: NonNullable<$$Props['group']>, v: NonNullable<$$Props['value']>) {
  checked = g.indexOf(v) > -1;
}

function updateGroup(c?: boolean, v?: V) {
  if (!group || v == null) {
    return;
  }
  const index = group.indexOf(v);
  if (c) {
    if (index < 0) {
      group.push(v);
      group = group;
    }
  } else {
    if (index >= 0) {
      group.splice(index, 1);
      group = group;
    }
  }
}
```

Note that, unlike svelte's own handling of group bindings that keeps the order of the original
array, this implementation follows a _push-last_ logic where elements are added to the group array
in the order they are checked.
