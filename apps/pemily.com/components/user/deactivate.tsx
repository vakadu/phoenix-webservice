"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useState } from 'react';

import { Button, InputNormal } from "@webservices/ui";

const schema = yup.object().shape({
    mobileNumber: yup.string()
                .required()
                .matches(/^[6-9]\d{9}$/, 'please enter a valid mobile number')
                .max(10),
    reason: yup.string().required(),
});

const Deactivate = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });  
    const [loading, setLoading] = useState(false);  

    const submit = async (values: { mobileNumber: string, reason: string }) => {
        const data = {
            mobile: values.mobileNumber,
            deactivateReason: values.reason
        };
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PEMILY_BASE_PATH}/user/deactivate`, data);
        console.log(response);
        
    };

    return (
        <form
            className="max-w-md mx-auto px-16 py-24 pt-[120px]"
            onSubmit={handleSubmit(submit)}
        >
            <section className="grid gap-42">
                <InputNormal
                    label="Mobile Number"
                    placeholder="EX: 9972360987"
                    type="text"
                    inputMode="numeric"
                    errorMessage={errors["mobileNumber"]?.message as string}
                    {...register("mobileNumber")}
                />
                <InputNormal
                    label="Enter the Reason to deactivate"
                    placeholder="EX: Not usefull.."
                    type="text"
                    inputMode="text"
                    errorMessage={errors["reason"]?.message as string}
                    {...register("reason")}
                />
            </section>
            <section className="flex justify-center items-center mt-32">
                <Button
                    uppercase
                    className="min-w-[250px]"
                    shape="circle"
                >
                    submit
                </Button>
            </section>
        </form>
    )
};

export default Deactivate;
