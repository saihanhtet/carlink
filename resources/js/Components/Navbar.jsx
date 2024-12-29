import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";



const Navbar = ({ defaultActivePage = "Home" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: new URL(route("home-page")).pathname },
        { name: "Car For Sale", href: new URL(route("for-sale-page")).pathname },
        { name: "Sell Your Car", href: "/sell" },
        { name: "Car Listings", href: "/listings" },
    ];

    const [activeMenu, setActiveMenu] = useState(() => {
        const currentPath = window.location.pathname; // Always returns a relative path
        const menuMaps = Object.fromEntries(menuItems.map((item) => [item.href, item.name]));
        return menuMaps[currentPath] || localStorage.getItem("activeMenu") || defaultActivePage;
    });

    // Update localStorage whenever activeMenu changes
    useEffect(() => {
        localStorage.setItem("activeMenu", activeMenu);
    }, [activeMenu]);

    const handleLinkClick = (name) => {
        setActiveMenu(name);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        // Check the current URL whenever the component mounts or the URL changes
        const currentPath = window.location.pathname;
        const matchingMenuItem = menuItems.find((item) => item.href === currentPath);
        if (matchingMenuItem) {
            setActiveMenu(matchingMenuItem.name);
        }
    }, [menuItems]);

    return (
        <nav className="bg-white text-gray-800 shadow-md relative">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-medium text-purple-600 rubik">
                    Used Cars Portal
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-800 focus:outline-none"
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
                            <Link
                                href={item.href}
                                onClick={() => handleLinkClick(item.name)}
                                className={`hover:underline hover:underline-offset-4 ${activeMenu === item.name
                                    ? "text-purple-600 font-medium"
                                    : "text-gray-800"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu with Blur Effect */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md">
                    <div className="p-4 absolute top-0 right-0">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl text-gray-800 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <ul className="flex flex-col items-center justify-center h-full space-y-6 rubik">
                        {menuItems.map((item) => (
                            <li key={item.name} className="text-center">
                                <Link
                                    href={item.href}
                                    onClick={() => handleLinkClick(item.name)}
                                    className={`hover:underline hover:underline-offset-4 ${activeMenu === item.name
                                        ? "text-purple-600 font-medium"
                                        : "text-gray-800"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
