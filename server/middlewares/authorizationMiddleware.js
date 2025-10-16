const authorizeRole = () => {
    return (req,res,next) => {
        if(!req.user.role){
            return res.status(403).json({message:"Access Denied"})
        }
        next()
    }
}
module.exports = authorizeRole