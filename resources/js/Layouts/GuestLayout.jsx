import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function GuestLayout({ children, showHeaderFooter = true, canLogin, canRegister, isLoggedIn }) {
    return (
        <>
            {showHeaderFooter && <Navbar canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn} />}
            <div className={showHeaderFooter ? "mt-[72px]" : ""}>
                {children}
            </div>
            {showHeaderFooter && <Footer />}
        </>
    );
}
