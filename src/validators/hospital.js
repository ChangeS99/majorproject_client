import {
    emailHospitalSchema,
    hospitalDetailSchema
} from './schema/hospital';

const errorCheck = (obj) => {
    if(obj.error){
        return {
            error: obj.error.details[0].message,
            path: obj.error.details[0].path[0]
        }
    } 
    return false;
}

export const hospitalRegisterValidator = (data) => {
    const result = emailHospitalSchema.validate(data);

    const isError = errorCheck(result);

    return isError ? isError : result;
}

export const hospitalConfigureValidator = (data) => {
    const result = hospitalDetailSchema.validate(data);

    const isError = errorCheck(result);

    return isError ? isError: result;
}