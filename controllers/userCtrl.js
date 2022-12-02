const Users = require('../models/userModel')

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            console.log(req)            
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            //console.log(users)
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl