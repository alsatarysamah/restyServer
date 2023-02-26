'use strict';

module.exports = (role) => {

    return (req, res, next) => {
        try {
            // user can do action
            if (req.user.dataValues.role.includes(role)) {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}

