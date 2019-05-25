const Joi = require('joi')

var LoginUser = Joi.object().keys({
    email: Joi.string().min(3).max(64).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Email`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    password: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Password`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
})

module.exports = LoginUser;