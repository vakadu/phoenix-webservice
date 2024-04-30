"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, InputNormal } from "@webservices/ui";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
});

const Form = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    return(
        <form>
            <section className="grid md:grid-cols-2 gap-42">
                <InputNormal
                    label="Name"
                    placeholder="EX: Vinod"
                    type="text"
                    inputMode="text"
                    errorMessage="Name is required"
                />
                <InputNormal
                    label="Mobile Number"
                    placeholder="EX: 9972360987"
                    type="text"
                    inputMode="text"
                    errorMessage="Name is required"
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

export default Form;
