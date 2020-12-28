const xml2js = require('xml2js');
const webzip = require('webzip');
const xmlParser = new xml2js.Parser({ attrkey: "ATTR" });

function cleanData(data) {
    let count = 0;
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

            count += category['Products'].length;
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
	return new Promise(function (resolve, reject) {
		xmlZipUrl = xmlZipUrl || 'https://accounts.clickbank.com/feeds/marketplace_feed_v2.xml.zip';
		targetXml = targetXml || 'marketplace_feed_v2.xml';
		webzip(xmlZipUrl, targetXml).then(xmlToJson).then(resolve);
	});
}

module.exports = clickbankProductList;