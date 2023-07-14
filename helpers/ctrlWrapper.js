const ctrlWrapper = (control) => {
    const func = async (res, req, next) => {
        try {
            await control(res, req, next);
        } catch (error) {
            next(error);
        }
    };
    return func;
};

module.exports = ctrlWrapper;
