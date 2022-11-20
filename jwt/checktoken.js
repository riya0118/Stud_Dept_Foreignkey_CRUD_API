const jwt = require("jsonwebtoken");

const checktoken = (req, res, next) => {
  var auth = req.headers.authorization;


  if(!auth) {
    res.status(401).send("Token not found!! Please authenticate using valid token!!");
  }
  else{
    auth = auth.split(" ")[1];
    try{
      const data = jwt.verify(auth, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    }catch(err){
      res.status(401).send("There was some error while autheticating!!");
    }
  }
}

module.exports = checktoken;