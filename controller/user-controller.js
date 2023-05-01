
import User from '../model/user-schema.js';


export const userSignup = async (req, res) => {
       try{

       const exist =  await User.findOne({username: req.body.username});
       if(exist) {
        return res.status(401).json({message: 'username already exist'})
       }

          const user = req.body;
          const newUser = new User(user);
          await newUser.save();

          res.status(200).json({message: user});
       } catch(error) {
           res.status(500).json({message: error.message});
           console.log(error);
       }
}

export const userLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const passward = req.body.passward;
       
       let user =  await User.findOne({username: username, passward: passward});
       if (user) {
        return res.status(200).json({data : user});
       } else {
        return res.status(401).json("Invalid login");
       }

    } catch (error) {
       res.status(500).json('error', error.message);
    }
}