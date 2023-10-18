import express from 'express';
const appUserRouter = express.Router();
import cors from 'cors';
import AppUser from '../models/AppUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



appUserRouter.use(cors())

// appUserRouter.use(express.json());
appUserRouter.use(express.urlencoded({extended: true}));


const secret = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'})
  }


// const middlewareAuthorizationFunction = (req, res, next) => {
//     //Get token from header
//     const token = req.headers.authorization;
    
//     if(!token){
//         return res.sendStatus(401)
//     }

//     const tokenData = token.split(' ')[1];
//     console.log(tokenData)


//     //Verify token
//     jwt.verify(tokenData, secret, (err, user) => {
//         if(err){
//             return res.sendStatus(401)
//         }
//         req.user = user;
//         next();
//     })
// }





appUserRouter.get("/login", async (req, res) => {
    
    // res.header('Content-Type', 'application/json');
console.log(req.headers)
    
    try {
      

          res.send(`
    <form action="/api/users/connect" method="post">
    <label for="login">Login:</label><br>
    <input type="text" id="login" name="login" placeholder = "Your login"><br><br>
    <label for="password">Password:</label><br>
    <input type="text" id="password" name="password" placeholder = "Your password"><br><br>
    <input type="submit" value="Submit">
    </form> 
    `);


    } catch(err){
        res.status(500).json(err)
    }

}
)




appUserRouter.post('/connect', async (req, res) => {

    try {
        
        if (req.body.login != 'John' || req.body.password != 'Doe') {
            console.log('false')
            res.redirect('login')

        }
    else {
        console.log('true')
            const token = generateToken({login: req.body.login});
            console.log(res.set({token}))

            res.send(`
            <form action="/api/users/checkJWT" method="post">
            <label for="token">Check Your Token:</label><br>
            <input type="text" id="token" name="token" placeholder = "Token"><br><br>
            <input type="submit" value="Submit">
            </form> 
            `); 
        
    }
    }
                
                
            
            catch(err){
                return res.status(500).json(err)
            }
   
        })





export default appUserRouter;