(function(){
	var presidents = [
					{
						name: "Geogre Washington",
						country: "US"                                                                                       
					},
					{
						name: "Abramham Lincoln",
						country: "US"
					},
					{
						name: "Franklin Delano Roosevelt",
						country: "US"
					},
					{
						name: "Vladimir Ilyich Lenin",
						country: "Russia"
					},
					{
						name: "Vladimir Vladimirovich Putin",
						country: "Russia"
					}
					];
	initialize();
	//testConnect();
	
	function testConnect(){
		var connect = require('connect'),
	    http = require('http');
	 
		var app = connect()
		    .use(function(req, res, next) {
		        console.log("That's my first middleware");
		        next();
		    })
		    .use(function(req, res, next) {
		        console.log("That's my second middleware");
		        next();
		    })
		    .use(function(req, res, next) {
		        console.log("end");
		        res.end("hello world");
		    });
		 
		http.createServer(app).listen(3000);
	}
	
	function initialize(){		  
	    var express = require('express');
	    var path = require('path');
	    var app = express();
	    var oneDay = 86400000;
	    // New call to compress content
		app.use(express.compress());
	    // Express configurations
	    app.configure(function(){
	       app.set('port', process.env.PORT || 3000);
	       app.set('views', __dirname + '/views');
	       app.set('view engine', 'ejs');
	       //configuration for public folder
	       //app.use('')
	       //----end
           app.use(express.urlencoded());
           //app.use(express.bodyParser());
           app.use(express.favicon(path.join(__dirname, 'favicon.ico')));
	       app.use('/content', express.static(path.join(__dirname, '/public'), { maxAge: oneDay}));
           app.use('/uploadFiles', express.static(path.join(__dirname, '/filesUploaded')));
	       app.use(app.router);
	       app.use(function(req, res){
		    	res.status(404).render('error404.ejs', {url: req.url});
		    });	       	
	       	console.log(path.join(__dirname, 'public'));
	    });	    
	    app.get('/', function(req, res) {
	  	     res.render('index', {title: 'Án Bình Trọng'});
	  	  });
	    app.get('/index/:name', function(req, res){
	    	res.render('index', {title: req.params.name});
	    });
	    app.get('/params/index', function(req, res){
	    	res.render('params/index',{title: "Test"});
	    });
	    app.get('/presidents', function(req, res){
	    	res.render('list', { presidents: presidents });
	    });
        app.get('/presidents/:country', function(req, res){
        	var data = presidents.filter(function(president){
    			return president.country == req.params.country;
        	});
        	res.render('list', { presidents: data });
        });
	    app.listen(app.get('port'));	    
	    console.log(new Date());
  }})();
  