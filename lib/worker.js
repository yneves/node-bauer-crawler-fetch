/*!
**  bauer-plugin-fetch -- Plugin for bauer-crawler to make http requests.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-plugin-fetch>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var request = require("request");
var Cache = require("bauer-cache");
var factory = require("bauer-factory");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var input = options.source ? new Cache({ file: options.source }) : null;
    
    var outputFile = { file: { name: options.request.url.replace(/[^\w]/g,"_") } };
    var outputOptions = factory.merge(options.cache,outputFile,config.cache);
    var output = new Cache(outputOptions);
    
    var requestOptions = factory.merge(options.request,config.request);
    
    output.validate(function(error,valid) {
      if (error) {
        response.sendError(error);
      } else if (valid) {
        response.sendOk({ file: output.getFile() });
      } else {
        
        var errored = false;
        var stream = request(requestOptions);
        if (input) {
          stream = input.read().pipe(stream);
        }
        
        stream.on("error",function(error) {
          errored = true;
          output.remove(function() {
            response.sendError(error);
          });
        });
        
        stream.pipe(output.write()).on("close",function() {
          if (!errored) {
            response.sendOk({ file: output.getFile() });
          }
        });
      }
    });
    
  });
  
  worker.sendReady();
  
};

// - -------------------------------------------------------------------- - //
