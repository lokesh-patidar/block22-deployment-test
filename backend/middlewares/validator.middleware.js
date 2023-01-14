const jwt = require("jsonwebtoken");
require('dotenv').config();

const validator = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.key);
        if (decoded) {
            console.log(decoded);
            const userId = decoded.userID;
            req.body.userID = userId;
            console.log(req.body.userID);
            next();
        } else {
            res.send({ msg: "please login first" });
        }
    } else {
        res.send("please login first");
    }
};

module.exports = { validator };
