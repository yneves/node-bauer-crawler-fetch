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
    
    // .fetch(then Function) :Promise
    f: function(then) {
      return this.then(function(value) {
        return this.promise().fetch(value);
      }).then(then);
    },
    
    // .fetch(then Function, fail Function) :Promise
    ff: function(then,fail) {
      return this.then(function(value) {
        return this.promise().fetch(value);
      }).then(then).fail(fail);
    },
    
    // .fetch(url String) :Promise
    s: function(url) {
      return this.then(function() {
        return this.promise().fetch({
          url: url
        });
      });
    },
    
    // .fetch(url String, then Function) :Promise
    sf: function(url,then) {
      return this.then(function() {
        return this.promise().fetch({
          url: url
        });
      }).then(then);
    },
    
    // .fetch(url String, then Function, fail Function) :Promise
    sff: function(url,then,fail) {
      return this.then(function() {
        return this.promise().fetch({
          url: url
        });
      }).then(then).fail(fail);
    },
    
    // .fetch(options String) :Promise
    o: function(options) {
      return this.then(function() {
        return this.requestWorker("fetch",options);
      });
    },
    
    // .fetch(options Object, then Function) :Promise
    of: function(options,then) {
      return this.then(function() {
        return this.promise().fetch(options);
      }).then(then);
    },
    
    // .fetch(options Object, then Function, fail Function) :Promise
    off: function(options,then,fail) {
      return this.then(function() {
        return this.promise().fetch(options);
      }).then(then).fail(fail);
    },
    
    // .fetch(list Array) :Promise
    a: function(list) {
      return this.then(function() {
        return this.promise().resolve(list).map(function(options) {
          return this.fetch(options);
        });
      });
    },
    
    // .fetch(list Array, then Function) :Promise
    af: function(list,then) {
      return this.then(function() {
        return this.promise().fetch(list);
      }).then(then);
    },
    
    // .fetch(list Array, then Function, fail Function) :Promise
    aff: function(list,then,fail) {
      return this.then(function() {
        return this.promise().fetch(list);
      }).then(then).fail(fail);
    }
    
  }
  
};

// - -------------------------------------------------------------------- - //
