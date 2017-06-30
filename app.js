var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
//----main---------
//
//
//
var fs = require('fs');
var utils = require('./utils');
var cp = require('child_process');
//------
//
//
//
//--- template
var engine = require('ejs-mate');
var engine = require('ejs-locals');
//este é que faz o Render do layout + outro app.use
var expressLayouts = require('express-ejs-layouts');

//----- login
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  //-----------------
  var app = express();
  //--------------------
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  //--------
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

  app.use(passport.initialize());
  app.use(passport.session());
  // Define routes.

  app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/login',
  function(req, res){
    res.render('login');
  });

  app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/start');
  });

  app.get('/server',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('server', { user: req.user });
  });

  app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

  app.get('/start',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('start', { user: req.user });
  });

  app.get('/config',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('config', { user: req.user });
  });


  app.get('/contact',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('contact', { user: req.user });
  });
  //-------
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(expressLayouts); //este pertence ao Render dos Layout
  app.use('/', index);
  app.use('/users', users);
  //----main----------------------
  //
  //
  //
  app.use(bodyParser.json());
  var exec = require('child_process').exec;
  //---FIM Main--------------------
  //
  //
  //
  //----- main------------------------
  //
  //
  //
  //

  // List Files Configuration
  app.post('/folder', function(req, res) {
    var output = cp.spawnSync('sh', ['scripts/script_listap.sh'], {
      encoding: 'utf8'
    });
    console.log("Ficheiros  Nginx:" + output.stdout.toString());
    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });

  // Reload Nginx
  app.post('/nginx/reload', function(req, res) {
    var output = cp.spawnSync('/usr/sbin/nginx', ['-s', 'reload'], {
      encoding: 'utf8'
    });
    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });

  // Connect Nginx
  app.post('/conect', function(req, res) {
    var output = cp.spawnSync('sh', ['scripts/script_ligacoes.sh'], {
      encoding: 'utf8'
    });

    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });

  // Total Memory
  app.post('/conectmemtotal', function(req, res) {
    var output = cp.spawnSync('sh', ['scripts/script_memtotal.sh'], {
      encoding: 'utf8'
    });

    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
    console.log('out:', output);
  });

  // Memory Free
  app.post('/conectmemfree', function(req, res) {
    var output = cp.spawnSync('sh', ['scripts/script_memfree.sh'], {
      encoding: 'utf8'
    });

    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });

  // Memory Avail
  app.post('/conectmemavail', function(req, res) {
    var output = cp.spawnSync('sh', ['scripts/script_memavail.sh'], {
      encoding: 'utf8'
    });

    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });
  app.post('/nginx/test', function(req, res) {
    var output = cp.spawnSync('/usr/sbin/nginx', ['-t'], {
      encoding: 'utf8'
    });

    res.send({
      'status': 'ok',
      'stdout': output.stdout.toString(),
      'stderr': output.stderr.toString(),
    });
  });


  // Remover Ficheiros
  app.post('/remover', function(req, res) {
    var exec = require('child_process').exec;
    var ligacaossh = exec('rm -rf /etc/nginx/conf.d/' + req.body.labelt , function(err, ligacaossh, stderr){
      console.log("Ficheiro a Apagar:" + ligacaossh);
    });
    //console.log(req.body.labelt);
  });

  /* Create Single and Multi Host(s)
  * @params: SERVERNAME, PORT, PROXY, CACHE
  */
  app.post('/host', function(req, res) {
    var confcontent = utils.prepareConf('simpleproxy', {
      'SERVERNAME': req.body.host,
      'PORT': req.body.port,
      'PROXY': req.body.destination,
      'CACHE': req.body.cache === true ? 'include /etc/nginx/dashboard/cache.conf;' : '',
      'PROXY2': req.body.proxy
    });

    fs.writeFile('/etc/nginx/conf.d/' + req.body.host + '.conf', confcontent, function(err) {
      if (err) {
        return res.status(500).send({
          'status': 'failed',
          'message': err
        });
      }

      res.send({
        'status': 'created'
      });
    });
  });


  //Load Balancing
  app.post('/hostlb', function(req, res) {
    //console.log(req.body);

    var confcontent = utils.prepareConf('loadbalancing', {
      'SERVERNAME1': req.body.host1lb,
      'SERVERNAME2': req.body.host2lb,
      'SERVERNAME3': req.body.host3lb,
      'SERVERNAME4': req.body.host4lb,
      'PORT': req.body.portlb,
      'PROXY': req.body.destinationlb,
      'CACHE': req.body.cachelb === true ? 'include /etc/nginx/dashboard/cache.conf;' : '',
      'PROXY2': req.body.proxylb
    });

    fs.writeFile('/etc/nginx/conf.d/' + req.body.filenamelb + '.conf', confcontent, function(err) {
      if (err) {
        return res.status(500).send({
          'status': 'failed',
          'message': err
        });
      }

      res.send({
        'status': 'created'
      });
    });
  });

  // Redirect OPT1 (HTTP to HTTPs)
  app.post('/hostopt1', function(req, res) {
    //console.log('File Name: ' + req.body.hostop1);
    //console.log(req.body);

    var confcontent = utils.prepareConf('redirectopt1', {
      'SERVERNAME': req.body.host1opt1,
      'SERVERNAMEHTTPS': req.body.host2opt1,
      'PORT': req.body.portopt1,
      'PROXY': req.body.destinationopt1,
      'CACHE': req.body.cacheopt1 === true ? 'include /etc/nginx/dashboard/cache.conf;' : '',
      'PROXY2': req.body.proxyopt1
    });

    fs.writeFile('/etc/nginx/conf.d/' + req.body.hostop1 + '.conf', confcontent, function(err) {
      if (err) {
        return res.status(500).send({
          'status': 'failed',
          'message': err
        });
      }

      res.send({
        'status': 'created'
      });
    });
  });

  // Redirect OPT2 (non WWW to WWW)
  app.post('/hostopt2', function(req, res) {
    //console.log('File Name: ' + req.body.hostop2);
    //console.log(req.body);

    var confcontent = utils.prepareConf('redirectopt2', {
      'SERVERNAMENONWWW': req.body.host1opt2,
      'SERVERNAMEWWW': req.body.host2opt2,
      'PORT': req.body.portopt2,
      'PROXY': req.body.destinationopt2,
      'CACHE': req.body.cacheopt2 === true ? 'include /etc/nginx/dashboard/cache.conf;' : '',
      'PROXY2': req.body.proxyopt2
    });

    fs.writeFile('/etc/nginx/conf.d/' + req.body.hostop2 + '.conf', confcontent, function(err) {
      if (err) {
        return res.status(500).send({
          'status': 'failed',
          'message': err
        });
      }

      res.send({
        'status': 'created'
      });
    });
  });

  // Redirect OPT3 (IP Address to Domain Name)
  app.post('/hostopt3', function(req, res) {
    //console.log('File Name: ' + req.body.hostop3);
    //console.log(req.body);

    var confcontent = utils.prepareConf('redirectopt3', {
      'SERVERIP': req.body.host1opt3,
      'SERVERDOMAIN': req.body.host2opt3,
      'PORT': req.body.portopt3,
      'PROXY': req.body.destinationopt3,
      'CACHE': req.body.cacheopt3 === true ? 'include /etc/nginx/dashboard/cache.conf;' : '',
      'PROXY2': req.body.proxyopt3
    });

    fs.writeFile('/etc/nginx/conf.d/' + req.body.hostop3 + '.conf', confcontent, function(err) {
      if (err) {
        return res.status(500).send({
          'status': 'failed',
          'message': err
        });
      }

      res.send({
        'status': 'created'
      });
    });
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
