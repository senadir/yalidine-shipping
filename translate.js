// Imports the Google Cloud client library
const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;
const gettextParser = require("gettext-parser");
var input = require('fs').readFileSync('yalidine-shipping.pot');
const po = gettextParser.po.parse(input);
const cities = Object.keys(po.translations['']); // output translations for the default context
// Creates a client
const translate =  new TranslationServiceClient();
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'Lahlef';
const target = 'ar';

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
	let x = 0;
	for (let index = 0; index < Math.floor(cities.length / 100); index++) {
		let [translations] = await translate.translateText({
			contents: cities.slice(index * 100, (index + 1) * 100).filter(Boolean),
			targetLanguageCode: target,
			sourceLanguageCode: 'en',
			mimeType: 'text/plain',
			parent: translate.locationPath('translate-cities', 'us-central1'),
		});
		translations = Array.isArray(translations) ? translations : [translations];
		translations[0]['translations'].forEach(({translatedText}, i) => {
			const original = cities[(index * 100) + i];
			if (translatedText === original) {
				x++;
			} else {
				po.translations[''][original].msgstr = [translatedText]
			}
		});
	}
console.log(x)
	var output = gettextParser.po.compile(po);
	require('fs').createWriteStream('yalidine-shipping-ar.po').write(output);
}

translateText();
