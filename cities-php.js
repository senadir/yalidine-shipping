const rawCities = require('./cities.json');
const slugify = require('slugify');
const fs = require('fs');
const options = {
	remove: undefined,
	lower: true,
	strict: true,
	locale: 'en',
	trim: true,
};

Object.entries(rawCities).forEach(([state, cities]) => {
	let file = '';
	file += '<?php\n';
	file +='return [\n';
	Object.entries(cities).forEach(([index, city]) => {
		file += `\t\t'${index}' => __("${city}", 'yalidine-shipping' ),\n`;
	});
	file +='];';
	fs.appendFile(`inc/cities/${state}.php`, file, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
});
//'DZ-1-101' => __( 'Adrar', 'yalidine-shipping' )
