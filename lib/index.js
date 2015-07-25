/*!
**  bauer-crawler-fetch -- Plugin for bauer-crawler to make http requests.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-fetch>
*/
// - -------------------------------------------------------------------- - //

"use strict";

module.exports = {
  
  name: "fetch",
  
  config: {
    workers: 1,
    request: {
      method: "GET"
    },
    cache: {
      json: false,
      expires: "1d",
      file: {
        dir: ".",
        ext: "txt"
      }
    }
  },
  
  worker: __dirname + "/worker.js",
  promise: __dirname + "/promise.js"
  
};

// - -------------------------------------------------------------------- - //
