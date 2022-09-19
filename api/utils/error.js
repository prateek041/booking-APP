// This is going to be used to create custom error objects.

export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}