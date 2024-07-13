const express = require("express");

const shares = require("../models/shares");

const users = require("../models/users");

const trades = require("../models/trades");

exports.getIndex = (req, res, next) => {
  
    res.render("pages/index",{
        errorMessage: null,
    });
};

exports.getInvestment = async(req, res, next) => {

    const userid = req.user._id;
    const user = await trades.findOne({uid : userid});
    if(!user){

        res.render("pages/investment", {errorMessage: "no trades", trades: null});

    }else{

        res.render("pages/investment", {
            errorMessage: null,
            trades: user
        });
    }



    
    
};

exports.getShare = async(req, res, next) => {
    const sharedetails = await shares.find({});
    let date_ob = new Date();
    let minutes = date_ob.getMinutes();
    sharedetails.forEach(myfunction);
    function myfunction(value) {
        this[value.share_name] = value.share_price;
     };
     let TCS_price = TCS.slice(0, minutes);
     let HDFC_price = HDFC.slice(0, minutes);
     let BPCL_price = BPCL.slice(0, minutes);
     let HeroMotoCorp_price = HeroMotoCorp.slice(0, minutes);
     let Pfizer_price = Pfizer.slice(0, minutes);
     let details = [{name: 'TCS' , price: TCS_price },
     {name: 'HDFC' , price: HDFC_price },
     {name: 'BPCL' , price: BPCL_price },
     {name: 'HeroMotoCorp' , price: HeroMotoCorp_price },
     {name: 'Pfizer' , price: Pfizer_price}];
     const userid = req.user._id;
     const user = await trades.findOne({uid : userid});
     if (!user){
        let amount = 100000;
        res.render("pages/share", {
            sharedetails: details,
            initamount: amount,
            errorMessage: null
        });
     }else{
        let amount = user.amount;
        res.render("pages/share", {
            sharedetails: details,
            initamount: amount,
            errorMessage: null
        });
     }

};


exports.postShare = async(req, res, next) => {

    const sharedetails = await shares.find({});
    let date_ob = new Date();
    let minutes = date_ob.getMinutes();

 
    sharedetails.forEach(myfunction);
    function myfunction(value) {
        this[value.share_name] = value.share_price;
     };
     let TCS_price = TCS.slice(0, minutes);
     let HDFC_price = HDFC.slice(0, minutes);
     let BPCL_price = BPCL.slice(0, minutes);
     let HeroMotoCorp_price = HeroMotoCorp.slice(0, minutes);
     let Pfizer_price = Pfizer.slice(0, minutes);
     let details = [{name: 'TCS' , price: TCS_price },
     {name: 'HDFC' , price: HDFC_price },
     {name: 'BPCL' , price: BPCL_price },
     {name: 'HeroMotoCorp' , price: HeroMotoCorp_price },
     {name: 'Pfizer' , price: Pfizer_price}];

    let qty = Number(req.body.qty);
    let sharename = req.body.sharename.toLowerCase();
    let price = Number(req.body.price);
    let userid = req.user._id;
    const user = await trades.findOne({uid : userid});



    if (!user) {

        let baseamount = 100000;

        if (qty*price > baseamount) {

           return res.render("pages/share", {
            sharedetails: details,
            initamount: baseamount,
            errorMessage: "you dont have required balance",
            });
        }

        else {
            
            const BuyShares = new trades({
                uid: req.user._id,
                amount: baseamount - (qty*price),
                [sharename]: [qty , qty*price]

            });
        
            BuyShares.save();
    
            res.render("pages/index",{
                errorMessage: "Buy Successful",
            });

        }

        

    }
    else{

        if (qty*price > user.amount) {

            return res.render("pages/share", {
             sharedetails: details,
             initamount: user.amount,
             errorMessage: "you dont have required balance",
             });
         }
 
         else {

                switch(sharename) {
                    case "tcs":

                        user.amount = user.amount - (qty*price);
                        if(user.tcs[0] == undefined){
                            user.tcs.set(0, 0);
                            user.tcs.set(1, 0);
                        }
                        let oldqtytcs = user.tcs[0];
                        let oldpricetcs = user.tcs[1];
                        user.tcs.set(0, oldqtytcs + qty);
                        user.tcs.set(1,oldpricetcs + (qty*price));
                        user.save();
                    
                    break;
                    case "hdfc":

                        user.amount = user.amount - (qty*price);
                        if(user.hdfc[0] == undefined){
                            user.hdfc.set(0, 0);
                            user.hdfc.set(1, 0);
                        }
                        let oldqtyhdfc = user.hdfc[0];
                        let oldpricehdfc = user.hdfc[1];
                        user.hdfc.set(0, oldqtyhdfc + qty);
                        user.hdfc.set(1,oldpricehdfc + (qty*price));
                        user.save();

                    break;
                    case "bpcl":

                        user.amount = user.amount - (qty*price);
                        if(user.bpcl[0] == undefined){
                            user.bpcl.set(0, 0);
                            user.bpcl.set(1, 0);
                        }
                        let oldqtybpcl = user.bpcl[0];
                        let oldpricebpcl = user.bpcl[1];
                        user.bpcl.set(0, oldqtybpcl + qty);
                        user.bpcl.set(1,oldpricebpcl + (qty*price));
                        user.save();
                        
                    break;
                    case "heromotocorp":

                        user.amount = user.amount - (qty*price);
                        if(user.heromotocorp[0] == undefined){
                            user.heromotocorp.set(0, 0);
                            user.heromotocorp.set(1, 0);
                        }
                        let oldqtyheromotocorp = user.heromotocorp[0];
                        let oldpriceheromotocorp = user.heromotocorp[1];
                        user.heromotocorp.set(0, oldqtyheromotocorp + qty);
                        user.heromotocorp.set(1,oldpriceheromotocorp + (qty*price));
                        user.save();

                    break;
                    case "pfizer":

                        user.amount = user.amount - (qty*price);
                        if(user.pfizer[0] == undefined){
                            user.pfizer.set(0, 0);
                            user.pfizer.set(1, 0);
                        }
                        let oldqtypfizer = user.pfizer[0];
                        let oldpricepfizer = user.pfizer[1];
                        user.pfizer.set(0, oldqtypfizer + qty);
                        user.pfizer.set(1,oldpricepfizer + (qty*price));
                        user.save();          
                }


                res.render("pages/index",{
                    errorMessage: "Buy Successful",
                });

         }

    };

};

exports.postInvestment = async(req, res, next) => {

    let qty = Number(req.body.qty);
    let sharename = req.body.sharename;
    const sharedetails = await shares.find({});
    let date_ob = new Date();
    let minutes = date_ob.getMinutes();
 
    sharedetails.forEach(myfunction);
    function myfunction(value) {
        this[value.share_name] = value.share_price;
     };

     let userid = req.user._id;
     const user = await trades.findOne({uid : userid});

     switch(sharename) {
        case "tcs":
            let TCS_price = TCS[minutes - 1];
            let orgqtytcs = user.tcs[0];
            let amtspendtcs = user.tcs[1];
            let avgpricetcs = amtspendtcs/orgqtytcs;
            let amounttcs = user.amount;
            if (qty > orgqtytcs) {

                res.render("pages/investment", {
                    errorMessage: "sell quantity must be less than quantity you have",
                    trades: user
                });

            }else{

                user.tcs.set(0, orgqtytcs - qty );
                user.tcs.set(1, amtspendtcs - (avgpricetcs*qty) );
                user.amount = amounttcs + (qty*TCS_price) ;
                user.save();
                res.render("pages/index",{
                    errorMessage: "Sell Successful",
                });

            }

          break;
        case "hdfc":
            let HDFC_price = HDFC[minutes - 1];
            let orgqtyhdfc = user.hdfc[0];
            let amtspendhdfc = user.hdfc[1];
            let avgpricehdfc = amtspendhdfc/orgqtyhdfc;
            let amounthdfc = user.amount;
            if (qty > orgqtyhdfc) {

                res.render("pages/investment", {
                    errorMessage: "sell quantity must be less than quantity you have",
                    trades: user
                });

            }else{

                user.hdfc.set(0, orgqtyhdfc - qty );
                user.hdfc.set(1, amtspendhdfc - (avgpricehdfc*qty) );
                user.amount = amounthdfc + (qty*HDFC_price) ;
                user.save();
                res.render("pages/index",{
                    errorMessage: "Sell Successful",
                });

            }

          break;
        case "bpcl":
            let BPCL_price = BPCL[minutes - 1];
            let orgqtybpcl = user.bpcl[0];
            let amtspendbpcl = user.bpcl[1];
            let avgpricebpcl = amtspendbpcl/orgqtybpcl;
            let amountbpcl = user.amount;
            if (qty > orgqtybpcl) {

                res.render("pages/investment", {
                    errorMessage: "sell quantity must be less than quantity you have",
                    trades: user
                });

            }else{

                user.bpcl.set(0, orgqtybpcl - qty );
                user.bpcl.set(1, amtspendbpcl - (avgpricebpcl*qty) );
                user.amount = amountbpcl + (qty*BPCL_price) ;
                user.save();
                res.render("pages/index",{
                    errorMessage: "Sell Successful",
                });

            }

          break;
        case "heromotocorp":
            let HeroMotoCorp_price = HeroMotoCorp[minutes - 1];
            let orgqtyheromotocorp = user.heromotocorp[0];
            let amtspendheromotocorp = user.heromotocorp[1];
            let avgpriceheromotocorp = amtspendheromotocorp/orgqtyheromotocorp;
            let amountheromotocorp = user.amount;
            if (qty > orgqtyheromotocorp) {

                res.render("pages/investment", {
                    errorMessage: "sell quantity must be less than quantity you have",
                    trades: user
                });

            }else{

                user.heromotocorp.set(0, orgqtyheromotocorp - qty );
                user.heromotocorp.set(1, amtspendheromotocorp - (avgpriceheromotocorp*qty) );
                user.amount = amountheromotocorp + (qty*HeroMotoCorp_price) ;
                user.save();
                res.render("pages/index",{
                    errorMessage: "Sell Successful",
                });

            }

          break;
        case "pfizer":
            let Pfizer_price = Pfizer[minutes - 1];
            let orgqtypfizer = user.pfizer[0];
            let amtspendpfizer = user.pfizer[1];
            let avgpricepfizer = amtspendpfizer/orgqtypfizer;
            let amountpfizer = user.amount;
            if (qty > orgqtypfizer) {

                res.render("pages/investment", {
                    errorMessage: "sell quantity must be less than quantity you have",
                    trades: user
                });

            }else{

                user.pfizer.set(0, orgqtypfizer - qty );
                user.pfizer.set(1, amtspendpfizer - (avgpricepfizer*qty) );
                user.amount = amountpfizer + (qty*Pfizer_price) ;
                user.save();
                res.render("pages/index",{
                    errorMessage: "Sell Successful",
                });

            }


      }



};

exports.getRankings = async(req, res, next) => {

    const alltrades = await trades.find({}).populate();
    alltrades.sort((a,b) => {return b.amount - a.amount});

    if (req.user.username == "parth.manish.shah"){

        res.render("pages/rankings",{
            errorMessage: null,
            rankings: alltrades,
        });
    }else{

        res.render("pages/index",{
            errorMessage: "you need to be admin",
        });
    }


};

exports.getGraph = (req , res, next) => {

     shares.find({ share_name: req.params.share})
     .then(resp => {
        let date_ob = new Date();
        let minutes = date_ob.getMinutes();
        let share = resp[0].share_price;
        if(minutes > 10 && minutes < 40)  {
            share = share.slice(10, minutes);
        }else if(minutes >= 40){
            share = share.slice(10, 40);
        }else{
            share = [];
        }
        res.render("pages/technicals", {
            errorMessage: null,
            share: share,
            name: req.params.share,
            length: share.length,
        });
     })
     .catch(err => {
         console.log(err);
     });
    

};