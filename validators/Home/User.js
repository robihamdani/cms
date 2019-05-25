const Joi = require('joi');

const UserValidator = Joi.object().keys({
    username: Joi.string().min(3).max(64).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Username`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 3 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum Username Please Try Again`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    email: Joi.string().min(3).max(64).required().email().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Email`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 3 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum Email Please Try Again`;
                    break;
                case "string.email":
                    err.message = `Please Write Email Correctly`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),


    password: Joi.string().min(5).max(64).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Password`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 5 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum Password Please Try Again`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Password`;
                    break;
                case "any.allowOnly":
                    err.message = `Password Not The Same`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

});


module.exports = UserValidator;