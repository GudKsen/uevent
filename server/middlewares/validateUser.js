import Validator from 'validatorjs'

const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export const validationRegister = async (req, res, next) => {
    const validationRules = {
        "phone_number": "string|max:240",
        "email": "required|email",
        "password": "required|min:8",
        "full_name": "required|string|min:3|max:240",
        "birthdate": "required|before:date"
    }
    
    await validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            console.log(err)
            res.status(412)
                .json({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


