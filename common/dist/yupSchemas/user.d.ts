import * as Yup from "yup";
export declare const SignupSchema: Yup.ObjectSchema<Yup.Shape<object, {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
}>>;
