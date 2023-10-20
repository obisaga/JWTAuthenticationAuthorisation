import express from 'express';
const appUserRouter = express.Router();
import AppUser from '../models/AppUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';





// appUserRouter.use(express.urlencoded({extended: true}));


const secret = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
  }




// no need for async await donw here, because we send static data
  appUserRouter.get("/login", (req, res) => {
    
        res.send(`
            <form action="/api/users/connect" method="post">
            <label for="login">Login:</label><br>
            <input type="text" id="login" name="login" placeholder = "Your login"><br><br>
            <label for="password">Password:</label><br>
            <input type="text" id="password" name="password" placeholder = "Your password"><br><br>
            <input type="submit" value="Submit">
            </form> 
        `);

})

// appUserRouter.get("/login", async (req, res) => {
    
//     try {
//         res.send(`
//             <form action="/api/users/connect" method="post">
//             <label for="login">Login:</label><br>
//             <input type="text" id="login" name="login" placeholder = "Your login"><br><br>
//             <label for="password">Password:</label><br>
//             <input type="text" id="password" name="password" placeholder = "Your password"><br><br>
//             <input type="submit" value="Submit">
//             </form> 
//         `);

//     } catch(err){
//         res.status(500).json(err)
//     }
// })



appUserRouter.post('/connect', async (req, res) => {

    try {
        
        if (req.body.login != 'John' || req.body.password != 'Doe') {
            console.log('false')
            res.redirect('login')
        } else {
            console.log('true')

            const token = generateToken({login: req.body.login});
            res.set({token});
            //below also correct (POSTMAN - Authorization Bearer), we can see it in devtools>network>connect>
            //res.header("Authorization", 'Bearer' + token)

            console.log(token);

            res.send(`
            <form action="/api/users/checkJWT" method="post">
            <label for="token">Check Your Token:</label><br>
            <input type="text" id="token" name="token" placeholder = "Token"><br><br>
            <input type="submit" value="Submit">
            </form> 
            `); 
    }}
                              
    catch(err){
        return res.status(500).json(err)
    }
    })


    const middlewareTokenAuthorization = (req, res, next) => {
    const usertoken = req.body.token;
    jwt.verify(usertoken, secret, (err, appUser) => {
        if(err){
        return res.redirect('login')
    }
    req.user = appUser;    
    next()
    
})   
 
    }
    
    appUserRouter.post('/checkJWT', middlewareTokenAuthorization, async (req, res) => {
        try {
            res.send('Admin Page')                    
          }
                                  
        catch(err){
            return res.status(500).json(err)
        }
        })


      




export default appUserRouter;