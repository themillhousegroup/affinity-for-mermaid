# Affinity symbol set (for Mermaid.js)
Free 2D symbols for computer network diagrams. 

This fork simply takes the excellent work of [ecceman](https://github.com/ecceman/affinity) and exposes the *Affinity* networking icon set for consumption via Mermaid.js.

To do this, just follow the [Registering icon pack in Mermaid](https://mermaid.js.org/config/icons.html#registering-icon-pack-in-mermaid) guide, substituting the [Github Pages resource files](https://themillhousegroup.github.io/affinity-for-mermaid/) from this project; i.e.:

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

### Demonstration Pages
If you just want to know what icons are available, and by what name, the [Icon List Page](https://themillhousegroup.github.io/affinity-for-mermaid/list.html) is for you.

The [Demonstration Page](https://themillhousegroup.github.io/affinity-for-mermaid/demo.html) shows this library in use.

### Icon file resources
Beneath the [Github Pages top level](https://themillhousegroup.github.io/affinity-for-mermaid/) are currently 3 separate icon sets, corresponding to the `naked`, `square` and `circle` subdirectories beneath `svg` in the repo, with prefixes as follows:
```
svg/naked: => icons.json with no prefix
svg/square => square.json with prefix square-
svg/circle => circle.json with prefix circle-
```

### Full worked example
If you wanted to use the circular [c_coffee_blue](svg/circle/blue/c_coffee_blue.svg) image in your own Mermaid network diagram:

* Import the circle icon set (you can use any `prefix` you like):

```
mermaid.registerIconPacks([
  {
    name: 'affinity-circle',
    loader: () =>
      fetch('https://themillhousegroup.github.io/affinity-for-mermaid/circle.json').then((res) => res.json()),
  },
]);
```

* Use an icon from the set, via the prefix you chose in the previous step:

```
architecture-beta
    service coffee-machine(affinity-circle:c-coffee-blue[Yum] 

```  


### How it works
See the `createIconSet.js` script. 
Using the excellent [Iconify Tools](https://iconify.design/docs/libraries/tools/import/directory.html) we simply iterate over the directories under the `svg` directory, placing the icons we find into appropriate collections

### Run it yourself

You can run it by cloning this repo and doing:

```
  % npm install
  % node createIconSet.js
```

Example output:

```
Processed 43 icons from svg/naked into icons.json with no prefix
Processed 256 icons from svg/square into square.json with prefix square-
Processed 255 icons from svg/circle into circle.json with prefix circle-

```



