const express = require("express");

const users = require("../models/users");

const { validationResult } = require("express-validator");

exports.postLogin = (req, res, next) => {

  const uname = req.body.uname.trim();
  const pwd = req.body.pwd.trim();

  users.findOne({ username: uname})
  .then((user) => {
        
      if (!user) {
          return res.render("pages/index", {
            errorMessage: "Invalid email or password."
          });
      }

      if (pwd == user.password.trim()) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          res.redirect("/share");
        });
      }
      else {
        return res.render("pages/index", {
            errorMessage: "Invalid password."
          });
      }

  })
  .catch((err) => {
      console.log(err)
  });

};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
  };

exports.getSignup = (req, res, next) => {



  if (req.user.username == "parth.manish.shah"){

    res.render("pages/signup",{
      errorMessage: null,
    });
  
  }else{
  
    res.render("pages/index",{
      errorMessage: "you are not admin",
    });
  
  }

};

exports.postSignup = (req, res, next) => {

 const uname = req.body.username;
 const pwd = req.body.password;
 

if (req.user.username == "parth.manish.shah"){

  users.findOne({ username: uname})
  .then((user)=> {
 
     if(!user){
 
       const userdetails = new users({
         username: uname,
         password: pwd
     });
     
     userdetails.save();
 
     res.render("pages/signup",{
       errorMessage: "user added",
     });
 
     }else{
 
       res.render("pages/signup",{
         errorMessage: "user already exsist",
       });
 
     }
 
  });

}else{

  res.render("pages/index",{
    errorMessage: "you are not admin",
  });

}





};

