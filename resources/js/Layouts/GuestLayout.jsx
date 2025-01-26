import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function GuestLayout({ children, showHeaderFooter = true, canLogin, canRegister, isLoggedIn }) {
    const isHomePage = route().current("home-page"); // Check if the current route is the homepage

    return (
        <>
            {showHeaderFooter && <Navbar canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn} />}

            {/* Apply mt-[72px] to all pages except the homepage */}
            <div className={!isHomePage && showHeaderFooter ? "mt-[72px]" : ""}>
                {children}
            </div>

            {showHeaderFooter && <Footer />}
        </>
    );
}
