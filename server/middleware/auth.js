module.exports = function (req,res,next) {
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        return next();   
    } else {
        // User is not authenticated, return an error response
        return res.status(401).json({ message: 'Unauthorized' });
    }
}