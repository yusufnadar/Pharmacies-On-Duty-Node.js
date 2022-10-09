const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const token = bearerHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if(decodedToken.admin == true){
            next();
        }else{
            return res.status(404).json({ message: 'Token unavailable' });
        }
    } catch (e) {
        return res.status(401).json({ message: String(e) });
    }
}