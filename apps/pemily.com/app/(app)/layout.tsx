import { PropsWithChildren } from "react";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

const RootLayout = ({ children }: PropsWithChildren) => {
    return(
        <main>
            <Header/>
            <section className="relative min-h-[100vh]">
                { children }
            </section>
            <Footer/>
        </main>
    )
};

export default RootLayout;
