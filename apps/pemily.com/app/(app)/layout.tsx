import { PropsWithChildren } from "react";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

const RootLayout = ({ children }: PropsWithChildren) => {
    return(
        <main className="max-w-[1400px] mx-auto">
            <Header/>
            <section className="relative min-h-[100vh]">
            </section>
            <Footer/> 
        </main>
    )
};

export default RootLayout;
