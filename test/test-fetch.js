// - -------------------------------------------------------------------- - //

"use strict";

var assert = require("assert");

// - -------------------------------------------------------------------- - //

describe("Fetch",function() {

  it("promise",function() {
    require(__dirname + "/../lib/promise.js");
  });
  
  it("master",function() {
    require(__dirname + "/../lib/master.js");
  });
  
  it("worker",function() {
    require(__dirname + "/../lib/worker.js");
  });
  
  it("index",function() {
    require(__dirname + "/../lib/index.js");
  });
  
});

// - -------------------------------------------------------------------- - //
