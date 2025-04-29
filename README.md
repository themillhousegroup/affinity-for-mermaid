# Affinity symbol set (for Mermaid.js)
Free 2D symbols for computer network diagrams. 

This fork simply takes the excellent work of [ecceman](https://github.com/ecceman/affinity) and exposes the Affinity networking icon set for consumption via Mermaid.js.

To do this, just follow the [Registering icon pack in Mermaid](https://mermaid.js.org/config/icons.html#registering-icon-pack-in-mermaid) guide, substituting the Github Pages endpoint from this project; i.e.:

```javascript
mermaid.registerIconPacks([
  {
    name: 'affinity',
    loader: () =>
      fetch('https://themillhousegroup.github.io/affinity-for-mermaid/icons.json').then((res) => res.json()),
  },
]);
```

Then, within Mermaid, use the `affinity` prefix:

```
architecture-beta
    group home(affinity:house)[API]

    service db(affinity:storage[Database] in home
    service server(affinity:server)[Big Server] in home
```

The above example uses the [architecture (beta)](https://mermaid.js.org/syntax/architecture.html#groups) syntax.
