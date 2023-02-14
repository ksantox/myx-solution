const bcrypt = require("bcrypt-nodejs");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

function comparePassword(candidatePassword, password) {
    const areEqual = bcrypt.compareSync(candidatePassword, password);
    return areEqual;
}

module.exports = {
    hashPassword,
    comparePassword
};