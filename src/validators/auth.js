import {
    userSignupSchema,
    userSigninSchema,
    emailSchema
} from './schema/user';

const errorCheck = (obj) => {
    if(obj.error){
        return {
            error: obj.error.details[0].message,
            path: obj.error.details[0].path[0]
        }
    } 
    return false;
}

export const emailCheck = (data) => {
    const result = emailSchema.validate(data);

    const isError = errorCheck(result);

    return isError ? isError : result
}

export const userSignupValidator = (data) => {
    const result = userSignupSchema.validate(data);

    const isError = errorCheck(result);

    return isError ? isError : result;
}

export const userSigninValidator = (data) => {
    const result = userSigninSchema.validate(data);

    const isError = errorCheck(result);

    return isError ? isError : result;
}