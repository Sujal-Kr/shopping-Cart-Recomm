const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError("Please provide email and password", 400);
        }
        const user=await User.findOne({email});
        cn
    } catch (err) {

    }
})