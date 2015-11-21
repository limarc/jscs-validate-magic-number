# jscs-validate-magic-number
JSCS plugin for validate magic number

## Usage
```
$ npm i jscs-validate-magic-number
```

Edit .jscsrc
```js
{
    "plugins": ["jscs-validate-magic-number/jscs-plugin"],
    "validateMagicNumber": true,
    ...
}
```
or
```js
{
    "additionalRules": ["jscs-validate-magic-number"],
    "validateMagicNumber": true,
    ...
}
```
