import mongoose from "mongoose"; 

const AppUserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true,
        unique: true
    },
    password: { 
        type: String,
        required: true      
    }
}, {timestamps: true});


const AppUser = mongoose.model('AppUser', AppUserSchema);

export default AppUser;