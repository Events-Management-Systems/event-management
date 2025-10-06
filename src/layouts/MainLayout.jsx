import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Use semantic header for crawlers */}
            <header>
                <Navbar />
            </header>

            {/* Main content area (important for SEO crawlers) */}
            <main id="main-content" className="flex-grow pt-6">
                <Outlet /> {/* Route-level pages will render here */}
            </main>

            {/* Semantic footer */}
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
}