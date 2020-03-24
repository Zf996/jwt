let express  = require("express")
let app = express();
let bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
app.use( function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
    
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // 如果是试探性请求，则直接返回
    if(req.method.toLowerCase() === 'options' ){
        res.end();
    }
    next();
    
    });
    // cookie token(json web token)
    // 后端会返回给你一个token（令牌）上面有后端的印章，下次请求时携带这个token过来，后端就会查看这个请求是不是
    // 的token是不是携带有我的印章，有的话就会成功
app.use(bodyParser.json());
app.post('/login',(req,res)=>{
    let {username} = req.body;
    if(username == 'admin'){
        res.json({
            code:0,
            username: 'admin',
            token: jwt.sign({username: "admin"}, 'zfnb',{
                expiresIn: 20
            })
        })
    }else{
        res.json({
            code:1,
            data:'用户名不存在'
        })
    }
})
app.listen(3000);