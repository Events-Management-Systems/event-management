import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

export default function MainLayout(){
    return(
    <>
        {/* Use semantic header for crawlers */}
        <header>
            <Navbar/>
        </header>

        {/* Main content area (important for SEO crawlers) */}
        <main id="main-content" className="flex-grow p-6">
            <Outlet/>  {/* Route-level pages will render here */}
        </main>

        {/* Semantic footer */}
        <footer>
            <Footer/>
        </footer>
    </>
    )
}