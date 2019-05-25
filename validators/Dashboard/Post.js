const Joi = require('joi');

const PostValidator = Joi.object().keys({
    title: Joi.string().min(3).max(64).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Title`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 3 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum Title Please Try Again`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    body: Joi.string().min(3).max(3000).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Article`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 3 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum body Please Try Again`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
})

module.exports = PostValidator;