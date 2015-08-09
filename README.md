# bauer-crawler-fetch

Plugin for `bauer-crawler` to make http requests.

## Installation

```
npm install bauer-crawler-fetch
```

## Usage

The popular `request` module is used internally to make the http requests. 

```js
module.exports = function(promise) {
  return promise.fetch("http://httpbin.org").then(function(outputFile) {
    // outputFile contains fetched content
  });
};
```

```js
module.exports = function(promise) {
  return promise.return("http://httpbin.org").fetch().then(function(outputFile) {
    // outputFile contains fetched content
  });
};
```

## Configuration

```js
{
  workers: 1,
  slots: 1,
  delay: 0,
  request: { // default options for request
    method: "GET"
  },
  cache: { // default options for bauer-cache
    json: false,
    expires: "1d",
    file: {
      dir: ".",
      ext: "txt"
    }
  }
}
```

## API Summary

  * `Promise`
    * `.fetch() :Promise`
    * `.fetch(url String) :Promise`
    * `.fetch(urls Array) :Promise`
    * `.fetch(options object) :Promise`

## License

[MIT](./LICENSE)
