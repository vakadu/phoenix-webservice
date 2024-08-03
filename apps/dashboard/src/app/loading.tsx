"use client"

import { Spinner } from "@webservices/ui";

const Loading = () => {
    return (
        <Spinner
            container='min-h-screen flex-col'
            text='Fetching details...'
            textClasses='text-14 mt-12'
        />
    );
};

export default Loading;