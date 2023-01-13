'use strict';

module.exports = (action) => {
    // 'update'
    return (req, res, next) => {
        try {
            // user can do action
            if (req.user.actions.includes(action)) {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}