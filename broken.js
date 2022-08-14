const gettextParser = require('gettext-parser');
const cities = ['01','02','03','04'];
const fs = require('fs')
cities.forEach(city => {
	const input = fs.readFileSync(`playground/DZ-${city}.po`);
	const po = gettextParser.po.parse(input);
	const newPo = structuredClone(po);
	const baladiya = Object.keys(po.translations['']);
	baladiya.forEach((original, i) => {
		po.translations[''][original].msgstr[0] =
			newPo.translations[''][baladiya[i - 1]]?.msgstr?.[0];
	});

	const output = gettextParser.po.compile(po);
	require('fs').createWriteStream(`playground/DZ-${city}.po`).write(output);
})

