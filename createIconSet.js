import fs from 'node:fs'
import {
    importDirectorySync,
    cleanupSVG,
    runSVGO,
    parseColors,
    isEmptyColor,
} from '@iconify/tools';

// Define naming conventions for input, prefixing and output
const iconSetDefinitions = [
	{ path: 'svg/naked', options: { replaceColors: true }, outputFile: 'icons.json' },
	{ path: 'svg/square', options:  { prefix: 'square', replaceColors: false }, outputFile: 'square.json'},
	{ path: 'svg/circle', options:  { prefix: 'circle', replaceColors: false }, outputFile: 'circle.json'},
];


iconSetDefinitions.forEach((iconSetDef) => {

	// Import icons
	const iconSet = importDirectorySync(iconSetDef.path, iconSetDef.options);

	// Validate, clean up, fix palette and optimise
	iconSet.forEachSync((name, type) => {
	    if (type !== 'icon') {
		return;
	    }

	    const svg = iconSet.toSVG(name);
	    if (!svg) {
		// Invalid icon
		iconSet.remove(name);
		return;
	    }

	    // Clean up and optimise icons
	    try {
		// Clean up icon code
		cleanupSVG(svg);

		if (iconSetDef.options.replaceColors) {
			// Assume icon is monotone: replace color with currentColor, add if missing
			parseColors(svg, {
			    defaultColor: 'currentColor',
			    callback: (attr, colorStr, color) => {
				return !color || isEmptyColor(color)
				    ? colorStr
				    : 'currentColor';
			    },
			});
		}

		// Optimise
		runSVGO(svg);
	    } catch (err) {
		// Invalid icon
		console.error(`Error parsing ${name}:`, err);
		iconSet.remove(name);
		return;
	    }

	    // Update icon
	    iconSet.fromSVG(name, svg);
	});

	// Export
//	console.log(iconSet.export());
	
	// Write it to the configured output file:
	const iconSetObject = iconSet.export();
	fs.writeFileSync(iconSetDef.outputFile, JSON.stringify(iconSetObject));
	console.log(`Processed ${iconSet.count()} icons from ${iconSetDef.path} into ${iconSetDef.outputFile} with ${iconSetDef.options.prefix ? `prefix ${iconSetDef.options.prefix}` : 'no prefix'}`); 

});

