const validator = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
                error:"Validation Error"
            });
        }
        next();
    };
};

module.exports = validator;