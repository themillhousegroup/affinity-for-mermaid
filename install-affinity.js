// If you know you've already got a Mermaid instance somewhere in the global namespace
// e.g. you've loaded Mermaid from a CDN etc using a script tag, 
// you can just add a call to *this* script in a tag to install Affinity icons; e.g.:
// <script src='//themillhousegroup.github.io/affinity-for-mermaid/install-affinity.js' type='text/javascript'/>


const installAllAffinityIcons = () => {
    mermaid.registerIconPacks([
        {
            name: 'affinity',
            loader: () =>
            fetch('https://themillhousegroup.github.io/affinity-for-mermaid/icons.json').then((res) => res.json()),
        },
        {
            name: 'affsquare',
            loader: () =>
            fetch('https://themillhousegroup.github.io/affinity-for-mermaid/square.json').then((res) => res.json()),
        },
        {
            name: 'affcircle',
            loader: () =>
            fetch('https://themillhousegroup.github.io/affinity-for-mermaid/circle.json').then((res) => res.json()),
        },
    ]);
};

$(document).ready(installAllAffinityIcons);