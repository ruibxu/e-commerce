const auth = require('../auth/authManager')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')


registerUser = async (req, res) => {

    //console.log("REGISTERING USER IN BACKEND");
    try {
        const { username, email, password, passwordVerify, secretKey } = req.body;
        //console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify);
        let isAdmin = false;
        if (secretKey && secretKey === process.env.SECRET_KEY) {
            isAdmin = true;
        }
        else{
            return res
            .status(400)
            .json({
                success: false,
                errorMessage: "Invalid secret key."
            })
        }
        if (!username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        //console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        //console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        //console.log("password and password verify match");
        const existingUser = await User.findOne({
            where: {
              email: email
            }
          });
        
        //console.log("existingUser:", existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        //console.log("passwordHash: " + passwordHash);
        let savedUser;
        if(!isAdmin){
            savedUser = await User.create({
                username: username, 
                email: email, 
                password: passwordHash});
        }
        else{
            savedUser = await User.create({
                username: username, 
                email: email, 
                password: passwordHash,
                isAdmin: true});
        }

        //console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        const token = auth.signToken(savedUser.id);
        //console.log("token:" + token);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                id: savedUser.id,
                username: savedUser.username,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin              
            }
        })

        //console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


loginUser = async (req, res) => {
    //console.log("loginUser");
    try {
        const { email, password } = req.body;
        //console.log("email: " + email + " password: " + password);

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({
            where: {
              email: email
            }
          });

          
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        //console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            //console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser.id);
        //console.log(token);



        const expirationDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
        //console.log("expirationDate: " + expirationDate);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            expires: expirationDate,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin                      
            }
        })

    } catch (err) {
        //console.error(err);
        res.status(500).send();
    }
}


logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

getLoggedIn = async (req, res) => {
    try {
        console.log(req);
        let userId = auth.verifyUser(req);

        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ where: { id: userId } });
        //console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email
            }
        })
    } catch (err) {
        //console.log("err: " + err);
        res.json(false);
    }
}

//delete user
deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        }
        await user.destroy();
        res.status(200).json({ message: `User with the id has been deleted` });
    }
    catch (err) {
        res.status(500).send();
    }
};
  
//update user
updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: `User with the id not found` });
        }
        const {password, passwordVerify } = req.body;
        if (!password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const passwordSame = await bcrypt.compare(password, user.password);
        if (passwordSame) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a new password."
                })
        }
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const new_password = await bcrypt.hash(password, salt);

        await user.update({ password: new_password });
        res.status(200).json({ message: `User with the id has been updated` });
    }
    catch (err) {
        res.status(500).send();
    }
}


getAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ message: `User with id not found` });
        }
        if (!user.isAdmin) {
            res.status(401).json({ message: `You don't have access to this page` });
        }
        else{
            res.status(200).json({ message: `You now have the access to this page` });
        }
    }
    catch (err) {
        res.status(500).send();
    }
};


        




module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    updateUser,
    getAdmin
}