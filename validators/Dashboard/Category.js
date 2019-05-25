const Joi = require('joi');

const CategoryValidator = Joi.object().keys({
    name: Joi.string().min(3).max(64).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = `Please Fill Form Name Category`;
                    break;
                case "string.min":
                    err.message = `Minimum Characters Approve Minimal 3 Characters`;
                    break;
                case "string.max":
                    err.message = `Maximum Characters Please Try Again`;
                    break;
                default:
                    break;
            }
        });
        return errors
    }),
});

module.exports = CategoryValidator;