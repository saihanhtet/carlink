import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';


export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </>
    );
}
