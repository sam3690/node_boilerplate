module.exports = function hasPermissionSession(pageUrl, action) {
    return function (req, res, next) {
        const user = req.session.user
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const permissions = user.permissions || {};
        const pagePermissions = permissions[pageUrl] 

        if (!pagePermissions || pagePermissions[action] !== true) {
            return res.status(403).json({ message: `Access denied: Missing ${action} permission for ${pageUrl}` });            
        }
        next(); // User has the required permission, proceed to the next middleware or route handler
    }
}