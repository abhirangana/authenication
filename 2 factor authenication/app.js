const Express = require("express");
const bodyparser= require("body-parser");
const speakeasy= require("speakeasy");

var app =Express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post("/otp-secret",(request,response,next)=>{
     var secret=speakeasy.generateSecret({length:20});
     response.send({"secret":secret.base32});
});

app.post("/otp-generate",(request,response,next)=>{
    response.send({
        "token":speakeasy.totp({
           secret: request.body.secret,
            encoding:"base32"
        }),
        "remaining": (30 - Math.floor((new Date().getTime() / 1000.0 %30)))
    });
});

app.post("/otp-validate",(request,response,next)=>{
    response.send({
        "valid":speakeasy.totp.verify({
            secret:request.body.secret,
            encoding:"base32",
            token:request.body.token,
            window:0
        })
    })
});

app.listen(3000,()=>{
    console.log("listening at port 3000");
})


