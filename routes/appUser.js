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


const middlewareAuthorizationFunction = (req, res, next) => {
    //Get token from header
    const token = req.headers.authorization;
    
    if(!token){
        return res.sendStatus(401)
    }

    const tokenData = token.split(' ')[1];
    console.log(tokenData)


    //Verify token
    jwt.verify(tokenData, secret, (err, user) => {
        if(err){
            return res.sendStatus(401)
        }
        req.user = user;
        next();
    })
}





appUserRouter.get("/login", async (req, res) => {
    
    // res.header('Content-Type', 'application/json');
console.log(req.headers)
    
    try {
      

          res.send(`
    <form action="/api/users/connect" method="post">
    <label for="login">Login:</label><br>
    <input type="text" placeholder = "Your login"><br><br>
    <label for="password">Password:</label><br>
    <input type="text" placeholder = "Your password"><br><br>
    <input type="submit" value="Submit">
    </form> 
    `);


    } catch(err){
        res.status(500).json(err)
    }

}
)



// appUserRouter.post("/connect", async (req, res) => {
//     const { login, password} = req.body;
//     try {

//         const token = (data) => {
//             return jwt.sign(data, secret, {expiresIn: '1800s'})
//           }
//           res.header(authorization, [token])

//         const user = await AppUser.create({login, password, token});
      
  

//     } catch(err){
//         return res.status(500).json(err)
//     }
// })

appUserRouter.post('/connect', async (req, res) => {
console.log(req.headers)
console.log(req.body)

    // console.log(res.get('Content-Type'));
   

    try {
        

        res.send('welcome, ' + req.body.login)
            
                }
                // const token = generateToken({login: user.login});
                // res.json({token})
            
            catch(err){
                return res.status(500).json(err)
            }
   
        })

// appUserRouter.post("/connect", urlencodedParser, async (req, res) => {
//     const {login, password} = req.body;

   
//     try {

//         // if (login === 'john' && password ==='doe'){
//           console.log(req.body.login)
//         // }
//         // const token = generateToken({login: user.login});
//         // res.json({token})
    
//     } catch(err){
//         return res.status(500).json(err)
//     }
// })



export default appUserRouter;