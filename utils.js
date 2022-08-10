const validateToken = (req, res, next) => {
    req.headers.validate == 'mariana23' ? next() : res.json({error_message: "Invalid API token"})
}

module.exports = validateToken;