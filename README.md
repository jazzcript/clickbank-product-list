# ClickBank Product List
# or
# ClickBank Marketplace Catalog

Get all information from the whole ClickBank product catalog in JSON

`npm i clickbank-product-list`


# Usage


```javascript
const getClickBankCatalog = require('clickbank-product-list');

getClickBankCatalog().then(function (list) {
  console.log(list);
});
```