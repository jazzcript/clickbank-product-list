const xml2js = require('xml2js');
const webzip = require('webzip');
const xmlParser = new xml2js.Parser({ attrkey: "ATTR" });

function cleanData(data) {
	let categories = data;
	for (let category of categories) {
		category['Name'] = category['Name'][0];

		if (category['Site']) {
			for (let product of category['Site']) {
				let keys = Object.keys(product);
				for (let key of keys) {
					product[key] = product[key][0];
				}
			}

			category['Products'] = category['Site'];

			delete category['Site'];

		} else {
			category['Products'] = [];
		}

		if (category['Category']) {
			delete category['Category'];
		}
	}

	return data;
}

function xmlToJson(data) {
	var products;

	xmlParser.parseString(data, function(error, result) {
		if(error === null) {
			products = cleanData(result['Catalog']['Category']);
			
		} else {
			console.log(error);
		}
	});

	return products;
}

function clickbankProductList(xmlZipUrl, targetXml) {
	xmlZipUrl = xmlZipUrl || 'https://accounts.clickbank.com/feeds/marketplace_feed_v2.xml.zip';
	targetXml = targetXml || 'marketplace_feed_v2.xml';
	return webzip(xmlZipUrl, targetXml).then(xmlToJson);
}

module.exports = clickbankProductList;