const AJV = require('ajv').default;
const addFormats = require('ajv-formats');
const ajv = new AJV({ useDefaults: true });
addFormats(ajv);

module.exports = ajv;
