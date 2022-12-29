const { AppError } = require("./error");

// Middleware kiêm tra quyền cần được gọi sau middleware authorization
const requireRole = (...roles) => {
    return (req, res, next) => {
        const { user } = res.roles;

        const isMatched =  roles.includes(user.role);
        if(!isMatched){
            next(new AppError(403, "no have permission"));
            return;
        }

        next();
    }
}

module.exports = requireRole;