const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = "sr24ngdadv8g";
const api_secret = "mkz8tbuwhh9895k7bevccdtsm6cgeazqy9fgre6j746yvjz3575dzsjzdd8s8mgq";
const app_id = 1255909;

const signup = async(req, res) => {
    try {
        const {fullName, username, email, password, phoneNumber} = req.body;

        if (!email.endsWith("@viit.ac.in")) {
            return res.status(401).json({message: "Invalid email"});
        }

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({token, fullName, username, email, userId, password, hashedPassword, phoneNumber });

    } catch (error) {
        console.log(error);

        res.status(500).json({message: error});
    }
};

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
        
        if (!email.endsWith("@viit.ac.in")) {
            return res.status(401).json({message: "Invalid email"});
        }
        const { users } = await client.queryUsers({email});

        if(!users.length) return res.status(400).json({ message : "User not found"});


        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({token, fullName: users[0].fullName, username : users[0].username, email, userId : users[0].id});
        }
        else{
            res.status(500).json({message: 'Incorrect Password'});
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({message: error});
    }
}

module.exports = {signup, login};