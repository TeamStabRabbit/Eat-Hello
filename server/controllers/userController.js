const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {};


userController.readParams = (req, res, next) => {
  const { username, password } = req.body;
  res.locals = { username, password };
  // console.log('locals in readParams are un,pw', res.locals.username , res.locals.password);
  return next();
};

userController.addDataBaseEntry = async (req, res, next) => {
  //grab un and pw from locals 
  const { username, password } = res.locals;
  await User.create({ username, password }, (err, user) => {
    //if err do something
    if(err){
      console.log('error in AddDataBase Entry', err);
      return next(err);
      // res.render('/', {error: err});
    }
    else {
      //console.log('user: ', user);
      // MongoDB ID
      res.locals.id = user._id;
      return next();
    }
  });



};
/** ssid? */

userController.getUser = async (req,res,next) =>{
  const username = res.locals.username;
  const result = await User.findOne({ username: username }, (err, data) => {
    if (data === null || err) {
      console.log('user not found'); 
      return next('err',err); 
    }else{
      // console.log('result', data);
      res.locals.dbPassword = data.password;
      res.locals.id = data._id;
      return next();
    }
  });
  
};

userController.getFoodHistory = async (req,res,next) =>{
  const { username } = req.params;
  console.log('username is the following in user controller', username)
  const result = await User.findOne({ username: username }, (err, data) => {
    if (!data || err) {
      console.log('user not found');
      res.redirect('/api/signup');  
    }
  });
  res.locals.history = result.history;
  return next();
};

// userController.updatePizzaHistory = async (req, res, next) => {
//   const pizza = 'Pizza';
//   const { username } = res.locals;
//   await User.findOneAndUpdate({ username }, { $push: { history : pizza }}, (err, data) => {
//     if (err) {
//       console.log('err: ', err);
//       return next(err);
//     }
//     else {
//       return next();
//     }
//   });
// };

userController.pushFoodHistory = async (req, res, next) => {
  const {username, foodItem} = req.body;
  const ressoltio = await User.update({username}, {$addToSet: {history: foodItem}}, (err, result)=>{
    if (err){
      console.log('err: ', err);
      return next(err); 
    }
    else{
      return next();
    }
  });
};


userController.passwordCompare = async (req,res,next) =>{
  //res.locals.password = req.query.password
  const { password, dbPassword } = res.locals;
  if(password && dbPassword){
    const passwordCompare = await bcrypt.compare(password, dbPassword);
    res.locals.pwResult = passwordCompare;
    return next();
  }else{
    return next('fuck');
  }
};



/**
 * to access the user's data after the user logs in and in order to acess the user's location,
 * prefer cousine and food/ answer the user got from the past
*/
userController.profileData = (req, res, next) => {
  // write code here
};

module.exports = userController;