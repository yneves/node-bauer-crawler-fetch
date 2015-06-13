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

// - -------------------------------------------------------------------- - //

module.exports = function(worker,config) {
  
  worker.on("request",function(options,response) {

      var cache = new Cache({
        json: config.cache.json,
        expires: config.cache.expires,
        file:{
          dir: config.cache.dir,
          ext: config.cache.ext,
          name: options.url.replace(/[^\w]/g,"_")
        }
      });
      
      cache.exists(function(error,exists) {
        if (error) {
          response.sendError(error);
          
        } else if (exists) {
          
          cache.expired(function(error,expired) {
            if (error) {
              response.sendError(error);
              
            // cache expired, make http request
            } else if (expired) {
              cache.pipe(request(options),function(error) {
                if (error) {
                  response.sendError(error);
                } else {
                  response.sendOk({
                    file: cache.getFile()
                  });
                }
              });
            
            // reuse cache
            } else {
              response.sendOk({
                file: cache.getFile()
              });
            }
          });
            
        // cache does not exists, make http request
        } else {
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
      });
      
  });
  
  worker.send({ ready: true });
  
};

// - -------------------------------------------------------------------- - //
