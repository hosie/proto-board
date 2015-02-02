/*
Copyright 2014 
Author John Hosie 
 
  All rights reserved. This program and the accompanying materials
  are made available under the terms of the Eclipse Public License v1.0
  which accompanies this distribution, and is available at
  http://www.eclipse.org/legal/epl-v10.html
 
  Contributors:
      John Hosie - initial implementation 
*/
var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');

var router = express.Router();

    router.get('/:url',function(req,res){                        

        console.log("proxying request %j",req.params.url);
        var urlObject = url.parse(req.params.url);
        console.dir(urlObject);
        var clientRequest = http.request({
                        hostname:urlObject.hostname,
                        port:urlObject.port,
                        path:urlObject.path,
                        headers:
                        {
                          Accept: "application/json"
                        }
                     },
                     function(response){
                        console.log("got response");
                        //console.dir(response);
                        response.on('data', function (chunk) {
                            console.log('BODY: ' + chunk);
                            res.write(chunk);
                        });

                        response.on('end',function(){
                          res.end();  
                        });
                     });
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });

        // write data to request body
        clientRequest.write('data\n');
        clientRequest.end();


        
    });


module.exports = router;


