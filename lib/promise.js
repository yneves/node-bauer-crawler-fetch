/*!
**  bauer-crawler-fetch -- Plugin for bauer-crawler to make http requests.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-fetch>
*/
// - -------------------------------------------------------------------- - //

"use strict";

// - -------------------------------------------------------------------- - //

module.exports = {
  
  fetch: {
    
    // .fetch() :Promise
    0: function() {
      return this.then(function(value) {
        return this.promise().fetch(value);
      });
    },
    
    // .fetch(url String) :Promise
    s: function(url) {
      return this.then(function() {
        return this.promise().fetch({ request: { url: url } });
      });
    },
    
    // .fetch(options String) :Promise
    o: function(options) {
      return this.then(function() {
        return this.requestWorker("fetch",options).get("file");
      });
    },
    
    // .fetch(list Array) :Promise
    a: function(list) {
      return this.then(function() {
        return this.promise().resolve(list).map(function(options) {
          return this.fetch(options);
        });
      });
    }
    
  }
  
};

// - -------------------------------------------------------------------- - //
