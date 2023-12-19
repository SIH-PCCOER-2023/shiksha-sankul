if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }