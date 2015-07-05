/*!
**  bauer-crawler-fetch -- Plugin for bauer-crawler to make http requests.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-crawler-fetch>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var request = require("request");
var Cache = require("bauer-cache");
var merge = require("lodash/object/merge");

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {
    
    var fileOptions = {
      file: {
        name: options.request.url.replace(/[^\w]/g,"_")
      }
    };
    
    var cacheOptions = merge(config.cache,options.cache,fileOptions);
    
    var requestOptions = merge(config.request,options.request);

    var cache = new Cache(cacheOptions);
    
    cache.exists(function(error,exists) {
      if (error) {
        response.sendError(error);
        
      } else if (exists) {
        
        cache.expired(function(error,expired) {
          if (error) {
            response.sendError(error);
            
          // cache expired, make http request
          } else if (expired) {
            
            doFetch(cache,requestOptions,response);
          
          // reuse cache
          } else {
            response.sendOk({
              file: cache.getFile()
            });
          }
        });
          
      // cache does not exists, make http request
      } else {
        
        doFetch(cache,requestOptions,response);
        
      }
    });
  });
  
  worker.send({ ready: true });
  
};

// - -------------------------------------------------------------------- - //

function doFetch(cache,options,response) {
  
  cache.pipe(request(options),function(error) {
    if (error) {
      response.sendError(error);
    } else {
      response.sendOk({
        file: cache.getFile()
      });
    }
  });
}

// - -------------------------------------------------------------------- - //
