const pool = require('../config/db');

/**
 * Middleware to check permission from `pagegroup` table
 * based on current user's `idGroup`, page URL, and action
 * (like CanView, CanAdd, etc.).
 *
 * @param {string} action - One of: 'CanView', 'CanAdd', 'CanEdit', 'CanDelete', 'CanViewAllDetail'
 */

module.exports = function hasPermission(action) {
    return async function (req,res,next) {
        const user = req.session.user
        if(!user){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const pageUrl = req.route.path
        const normalizedUrl = pageUrl.replace(/^\/$/, ''); // Remove trailing slash if exists

        try {
            const result = await pool.request()
            .input('idGroup', user.idGroup)
            .input('pageUrl', normalizedUrl)
            .query(`SELECT pg.${action} FROM pagegroup pg JOIN page p ON pg.idPages = p.idPages WHERE pg.idGroup = @idGroup AND p.pageUrl = @pageUrl AND ISNULL(pg.isActive, 1) = 1`);

            const permission = result.recordset[0]

            if (!permission || !permission[action]) {
                return res.status(403).json({ message: `Access denied: Missing ${action} permission` });
            }
            
        } catch (error) {
            console.error('Error checking permissions:', error);
            return res.status(500).json({ message: 'Internal server error during permission check' });
        }
    }
};