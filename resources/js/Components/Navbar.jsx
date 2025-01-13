import { Link } from "@inertiajs/react";
import { useState } from "react";
import NavLink from "./NavLink";

const Navbar = ({ canLogin, canRegister, isLoggedIn = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: new URL(route("home-page")).pathname, link: 'home-page' },
        { name: "Car For Sale", href: new URL(route("for-sale-page")).pathname, link: 'for-sale-page' },
        { name: "Car Listings", href: new URL(route("car-listing-page")).pathname, link: 'car-listing-page' },
        { name: "About Us", href: new URL(route("about-us-page")).pathname, link: 'about-us-page' },
        { name: "Contact Us", href: new URL(route("contact-us-page")).pathname, link: 'contact-us-page' },
    ];

    const authItems = [
        { name: "Log In", href: new URL(route("login")).pathname, link: 'login' },
        { name: "Register", href: new URL(route("register")).pathname, link: 'register' },
    ]
    const allItems = [...menuItems, ...authItems];

    return (
        <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-background">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-medium rubik flex justify-center items-center gap-2">
                    <img
                        src={'/assets/carlogo.png'}
                        alt="CarLink Logo"
                        height={30}
                        width={30}
                        className="size-10"
                    />
                    <span>CarLink</span>
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 rubik">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                href={item.href}
                                active={route().current(item.link)}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="hidden md:flex space-x-8 rubik">
                    {/* Auth Links */}
                    {!isLoggedIn && canLogin && canRegister && authItems.map((authItem) => (
                        <li key={authItem.name} className="flex space-x-4">
                            <NavLink
                                href={authItem.href}
                                active={route().current(authItem.link)}
                            >
                                {authItem.name}
                            </NavLink>
                        </li>
                    ))}
                    {isLoggedIn && (
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={`hover:underline hover:underline-offset-4`}
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>

            </div>

            {/* Mobile Menu with Blur Effect */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white/50 backdrop-blur-xl">
                    <div className="p-4 absolute top-0 right-0">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col items-center justify-center h-full space-y-6 rubik">
                        {allItems.map((item) => (
                            <li key={item.name} className="text-center">
                                <NavLink
                                    href={item.href}
                                    active={route().current(item.link)}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );

};

export default Navbar;
