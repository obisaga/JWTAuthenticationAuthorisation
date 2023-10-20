import express from 'express';
import 'dotenv/config';
import client from './db/db.js';
import appUserRouter from './routes/appUser.js';






const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/users', appUserRouter);






const port = process.env.PORT || 3000;

client.on('connected', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})

