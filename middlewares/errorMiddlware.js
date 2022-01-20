const notFound = (req, res, next) => {
    const err = new Error(`404 not found - ${req.originalUrl}`)
    res.status(404)
    next(err)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode === 200 ? 500 : req.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    notFound, 
    errorHandler
}