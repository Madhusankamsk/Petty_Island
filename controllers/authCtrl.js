const Users =  require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async (req,res)=>{
        try {
            const { fullname,username,email,password,gender} = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')
            //console.log(newUserName)
            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg:"This user already exists"})
            
            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg:"This email already exists"})

            if(password.length < 5) return res.status(400).json({msg:"Password must be at least 5 characters"})

            const passwordHash = await bcrypt.hash(password,12)

            const newUser = new Users({
                fullname,
                username: newUserName,
                email,
                password: passwordHash,
                gender,
            })

            //console.log(newUser)

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            //console.log({access_token, refresh_token})

            res.cookie('refreshtoken',refresh_token,{
                httpOnly : true,
                path : '/api/refresh_token',
                maxAge : 1000 * 60 * 60 * 24 * 30,
            })

            await newUser.save()

            res.json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }

            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    login: async (req,res)=>{
        try {
            const { username, password } = req.body

            const user = await Users.findOne({username}).populate("followers following","-password")
            if(!user) return res.status(400).json({msg:"User not found"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"Password is not match"})

            //res.json({user})
            //console.log(newUser)

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})

            //console.log({access_token, refresh_token})

            res.cookie('refreshtoken',refresh_token,{
                httpOnly : true,
                path : '/api/refresh_token',
                maxAge : 1000 * 60 * 60 * 24 * 30,
            })

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }

            })
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req,res)=>{
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: "Please login now."})
            jwt.verify(rf_token,process.env.REFRESH_TOKEN,async(err,result)=>{
                if (err) return res.status(400).json({msg:"Please login now."})
                const user = await Users.findById(result.id).select("-password").populate('following followers','-password')

                if(!user) return res.status(400).json({msg:"This user does not exist"})

                const access_token = createAccessToken({id: result.id})
                res.json({
                    access_token,
                    user
                })
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '1d'})
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: '1d'})
}

module.exports = authCtrl