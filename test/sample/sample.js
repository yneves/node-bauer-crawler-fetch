// - -------------------------------------------------------------------- - //

"use strict";

var fs = require("fs");
var Crawler = require("bauer-crawler");

var crawler = new Crawler();

crawler.require(__dirname + "/../../");

crawler.ready(function() {
  
  this.promise()
    .fetch("http://yneves.com/")
    .then(function(val) {
      fs.unlinkSync(val.file);
    })
    .exit();
  
  
});

crawler.start();

// - -------------------------------------------------------------------- - //
