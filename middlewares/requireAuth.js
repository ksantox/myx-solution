const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in." });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
        if (error) {
            return res.status(401).send({ error: "You must be logged in." });
        }

        req.user = payload.user;
        next();
    });
};
