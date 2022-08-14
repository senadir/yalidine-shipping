const fs = require('fs');
const { SourceMapConsumer } = require('source-map');

fs.readFile('./build/frontend.js.map', 'utf8', (err, data) => {
	if (err) return console.error(err);

	const sourceMapData = data.split(
		'//# sourceMappingURL=data:application/json;base64,'
	)[1];
	const buff = new Buffer.from(sourceMapData, 'base64');
	const rawSourceMap = buff.toString('ascii');

	const parsed = SourceMapConsumer(rawSourceMap);

	fs.writeFile(
		'./src/city-field/frontend.js',
		parsed.sourcesContent,
		function (err) {
			if (err) return console.log(err);
		}
	);
});
