import {
    employeeCreateSchema
} from './schema/employee';

const errorCheck = (obj) => {
    if(obj.error){
        return {
            error: obj.error.details[0].message,
            path: obj.error.details[0].path[0]
        }
    } 
    return false;
}

export const employeeCreateValidator = (data) => {
    const result = employeeCreateSchema.validate(data);
    console.log(result);

    const isError = errorCheck(result);

    return isError ? isError : result;
}