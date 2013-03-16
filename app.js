/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bing = require('binger');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){

  app.use(express.errorHandler());

});

app.get('/', routes.index);

app.post('/search', function(req, res){

         //for debug
         //res.render('search',{search: ['one','two','three']})

         var b = bing({appId:"49EB4B94127F7C7836C96DEB3F2CD8A6D12BDB71"})

             b.search(req.body['q'], function(error, response, body){

                  //for debug 
                  //res.send(body.SearchResponse.Web.Results)
       
                  res.render('search',{search: body.SearchResponse.Web.Results, title: req.body['q']})
             },{limit: 20})
});

http.createServer(app).listen(app.get('port'), function(){

  console.log("Express server listening on port " + app.get('port'));

});
