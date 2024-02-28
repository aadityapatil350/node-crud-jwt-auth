import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
    
});

const user = mongoose.model('user', userSchema);

export default user; 