const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const app = express();
const http = require("http").Server(app);
const jsdom = require('jsdom')
const fs = require("fs");
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());
// app.use(express.static("public"));
app.use(bodyParser.json({extended: false}));

mongoose.connect("mongodb+srv://admin-prakhar:cowardlycourage@cluster0.0c4sc.mongodb.net/email", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);

const emailSchema = new mongoose.Schema({
    email: String,
    password: String,
    id: String,
    userId : String,
    data: {name: String, recipient : String, cc: String, subject : String, body: String, date: String, time: String, schedule: String, id : String},
    schedule : {time : {type:Number, default: new Date().getTime()}, repeat : Boolean, weekly : Boolean, monthly : Boolean, yearly : Boolean}
});
const Email = mongoose.model("Email", emailSchema);

var listeners = new Map([]);
var intervalId = new Map([]);

// start all the listeners again if server restarts
// setAll();


app.get("/mail-detail/", function(req, res){
  var email = req.query.email, userId = req.query.userId, id = req.query.id; //use query or params(if query does not work)

  //<----------for testing ------>
  var ret = [];
  Email.findOne({id : id}, function(err, docs){
    if(err) console.log(err);
    else{
      ret = [];
      if(docs){
        ret.push(docs.data);
      }
      else{
        console.log("no data found belonging to this id");
      }
      res.send({data: ret});
    }
  })
  //<----------for testing ------>


  //check if the id corresponds to the correct email

  // Email.findOne({email : email, id : id}, function(err, docs){
  //   if(err) console.log(err);
  //   else{
  //     if(docs){
  //       if(docs.userId==userId){
  //           res.send(docs.data);
  //       }
  //       else{
  //         sendNothing(res);
  //       }
  //     }
  //     else{
  //       sendNothing(res);
  //     }
  //   }
  // });
})

app.get("/mails/", function(req, res){
  //return all the mails

  //<----------for testing ------>
  var ret = [];
  Email.find({}, function(err, docs){
    if(err) console.log(err);
    else{
      for(let i=0; i < docs.length; ++i){
          ret.push(docs[i].data);
      }
      res.send({data: ret});
    }
  })
  //<----------for testing ------>

  // var email = req.query.email, id = req.query.id;
  // //check if the id corresponds to the correct email
  // Email.findOne({email : email}, function(err, docs){
  //   if(err) console.log(err);
  //   else{
  //     if(docs.userId==id){
  //         sendUser(res, email);
  //     }
  //     else{
  //       sendNothing(res);
  //     }
  //   }
  // });
});
app.post("/mails",function(req,res){
    newEmail = req.body.email;
    newPassword = req.body.password;
    newRecipient = req.body.recipient;
    // newCc = req.body.cc;
    newSubject = req.body.subject;
    newBody = req.body.body;
    newTime = toMili(req.body.date, req.body.time);
    schedule = req.body.schedule;
    newName = req.body.name;
    let yearly = false, monthly = false, weekly = false, daily = false, repeat = true;
    if(schedule=="yearly") yearly = true;
    else if(schedule=="monthly") monthly = true;
    else if(schedule=="weekly") weekly = true;
    else if(schedule=="daily") daily = true;
    else repeat = false;
    var schedule = {time : newTime, repeat : repeat, weekly : weekly, monthly: monthly , yearly: yearly};
    newId = makeid();
    addListener(newId, schedule);
    var data = {name: req.body.name, recipient : req.body.recipient, subject : req.body.subject, schedule : req.body.schedule, body : req.body.body, date : req.body.date, time : req.body.time, id : newId};
    Email.findOne({email : newEmail}, function(err, docs){
      if(err) console.log(err);
      else{
        let newUserId="default";
        if(docs){
          newUserId = docs.userId;
        }
        else{
          newUserId = makeid();
        }
        Email.insertMany([{email : newEmail, password : newPassword, id: newId, userId : newUserId, data : data, schedule : schedule}]).then(function(){
          res.send({id: newUserId});
        }).catch(function(err){
          console.log(err);
        });
      }
    });
    // //insert in the database

  // res.sendStatus(200);
});

app.post("/delete", function(req, res){
  let form = new multiparty.Form();
  form.parse(req, function(err,fields,files){
    currId = req.body.id;
    Email.deleteOne({id: currId}).then(function(){
      Email.countDocuments({}).exec(function(err, c){
        if(err) console.log(err);
        else{
          stopInterval(id);
          listeners.delete(id);
        }
      });
    }).catch(function(err){
      console.log(err);

    });
    res.end();
  });
  res.sendStatus(200);
});

/* <---------------Functions----------------> */

function makeid() {
    let length = 10;
    var result   = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
 charactersLength)));
   }
   return result.join('');
}

function addListener(id, schedule){
  let delay = Infinity;
  var endTime = schedule.time;
  var startDate = new Date();
  delay = endTime-startDate.getTime();
  if(delay<0) delay = 0;
  delay = 1000; //testing. Original delay is overflowing(above2^31-1(max 24 days))
  listeners.set(id, setTimeout(startInterval, delay, id, schedule));
}

function startInterval(id1, schedule){
  let interval = Infinity; //calculate
  if(schedule.repeat==false){
    interval = Infinity;
    send(id1);
  }
  else{
    if(schedule.daily==true){
      interval=24*60*60*1000;
    }
    else if(schedule.weekly==true){
      interval = 7*24*60*60*1000;
    }
    else if(schedule.monthly==true){
      interval = 28*24*60*60*1000;
    }
    else{
      interval = 365*24*60*60*1000;
    }
    interval = 10000; // testing Original interval is overflowing(above2^31-1 (max 24 days))
    var id = setInterval(send, interval, id1);
    intervalId.set(id1, id);
    send(id1);
  }
}


function toMili(date, time){
  var d = new Date(date + "T" + time + ":00");
  return d.getTime();
}

function send(id){
  Email.find({id : id}, function(err, docs){
    console.log("(not)sending mail from id " + id);
//     var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: docs.email,
//     pass: docs.password
//   }
//   });
//   var mailOptions = {
//   from: docs.email,
//   to: docs.recipient,
//   subject: docs.subject,
//   html: docs.body
// };
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
  });

}
function stopInterval(id){
  clearInterval(intervalId.get(id));
}

function setAll(){ //if server restarts, this function resets all intervals
  Email.find({}, function(err, docs){
    if(err) console.log(err);
    else{
      for(let i = 0; i < docs.length; ++i){
        let currId = docs[i].id, currSchedule = docs[i].schedule;
        addListener(currId, currSchedule);
      }
    }
  });
};



function sendUser(res, email){ //sends all the emails of the current user in the front end.
  Email.find({email : email}, function(err, docs){
    if(err) console.log(err);
    else{
      res.send(docs);
    }
  })
};
function sendNothing(res){
  res.send(null);
}

http.listen(process.env.PORT || 8000, function() {
  console.log("Server started...");
})
