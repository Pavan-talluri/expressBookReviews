const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"coursera","password":"CourseraUser"},];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
  return user.username === username
});
if(userswithsamename.length > 0){
  return true;
} else {
  return false;
}
  
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
       return (user.username === username && user.password === password)
    });
   if(validusers.length > 0){
       return true;
    } else {
      return false;
   }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
   let isbn = req.params.isbn;
   let review = req.query.reviews;
   for(let i=1;i<=Object.keys(books).length;i++){
    if(books[i]["isbn"]==isbn){
        books[i]["reviews"][0]=review;
        res.send(`added review successfully added for ${isbn} ISBN book`);
    }
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn",(req,res)=>{
  let isbn = req.params.isbn;
  for(let i=1;i<=Object.keys(books).length;i++){
    if(books[i]["isbn"]==isbn){
        books[i]["reviews"]={};
        res.send(`deleted review  added by user for ${isbn} ISBN book`);
    }
}})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser= authenticatedUser;
