const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../core/pool.js');
const bcrypt = require('bcrypt');
var session = require('express-session');
const app = require('../app.js');



router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get home page
router.get('/home',function(req,res,next){
  res.send(' oyaa! This is my home page')
});

// post login data
router.post('/login',function(req,res,next){
  console.log('something bb')
  // res.json(req.body);
const bdy =req.body
const username = req.body.username;
const password= bdy.password; 
var session

// let sql=('SELECT * FROM accounts WHERE username = ?',[userName,password]);

db.query(`SELECT * FROM accounts WHERE username = ? ` ,[username],function(err,results,fields){
  if (results.length>0){
    let bool = bcrypt.compareSync(password,results[0].password)
    console.log(results.password)
    if (bool==true)
   { 
     session=req.session;
     session.userid=req.body.username
     console.log(req.session)
     res.send(`successfully logged in as ${username} <a href=\'/logout'>click to logout</a>`)
  } else {
      res.send('Incorrect username and password')
  }
 } else{
    res.send('User not found ')
  }
  res.end();
  

  
})

});

// logout
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})

// post register data
router.post('/register',function(req,res,next){
  // res.json(req.body);
  const body=req.body;
  var pwd = body.password;
  body.password=bcrypt.hashSync(pwd,10);
  var bind=[];
  for(i in body){
    bind.push(body[i]);
  }
  console.log(bind);
  let sql = `INSERT INTO accounts(username,fullname,password) VALUES(?,?,?)`;
  db.query(sql,bind,function(err,results){
    if (err) throw err;
    console.log("new user added");

  });
  res.send(`hello  ${req.body.fullname}welcome to our website`)
  res.end()

});



module.exports = router;
