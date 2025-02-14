const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
  
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});

  }
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn];
  res.send(book);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authori = req.params.author;
  for(let i=1;i<=Object.keys(books).length;i++){
     if(books[i]["author"]==authori)
         res.send(books[i]);
  }
  res.send("not available");
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  for(let i=1;i<=Object.keys(books).length;i++){
     if(books[i]["title"]==title)
         res.send(books[i]);
  }
  res.send("not available");
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  for(let i=1;i<=Object.keys(books).length;i++){
     if(books[i]["isbn"]==isbn)
         res.send(books[i]["reviews"]);
  }
  res.send("not available");
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
