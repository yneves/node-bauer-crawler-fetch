// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var Crawler = require("bauer-crawler");

var crawler = new Crawler({
  config: {
    fetch: {
      cache: {
        file: {
          dir: __dirname
        }
      }
    }
  }
});

crawler.loadPlugin(__dirname + "/../../");

crawler.start(function() {
  
  return this.promise()
    .fetch("http://httpbin.org/get?a=b")
    .then(function(getFile) {
      
      return this.promise()
        .fetch({
          source: getFile,
          request: {
            method: "POST",
            url: "http://httpbin.org/post"
          }
        })
        .then(function(postFile) {
          fs.unlinkSync(getFile);
          fs.unlinkSync(postFile);
        });
    });
});

crawler.start();

// - -------------------------------------------------------------------- - //
