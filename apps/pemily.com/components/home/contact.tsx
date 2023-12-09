import Form from "./form";

const Contact = () => {
    return (
        <section className="pb-[80px] bg-transparent bg-[linear-gradient(0deg,_#FFFFFF_0%,_#F0EBE3_100%)] dark:bg-[linear-gradient(0deg,_#31363c_0%,_#222831_100%)]">
            <section className="max-w-[1300px] mx-auto px-16 md:px-24">
                <h2 className="text-[60px] font-semibold mb-64">Contact Us</h2>
                <Form/>
            </section>
        </section>
    )
};

export default Contact;
