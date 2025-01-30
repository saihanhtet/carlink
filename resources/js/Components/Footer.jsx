import React from 'react';
import { Link } from '@inertiajs/react';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import NavLink from './NavLink';

const Footer = () => {
    const socialIcons = [
        { href: '#', icon: <FaFacebook />, color: 'hover:text-red-500' },
        { href: '#', icon: <FaInstagram />, color: 'hover:text-red-500' },
        { href: '#', icon: <FaYoutube />, color: 'hover:text-red-500' },
    ];

    const footerLinks = [
        { name: 'Home', route: 'home-page' },
        { name: 'About', route: 'about-us-page' },
        { name: 'Contact', route: 'contact-us-page' },
        { name: 'Register', route: 'register' },
        { name: 'Login', route: 'login' },
    ];

    return (
        <footer className="mt-32 bg-background shadow-md shadow-black text-center py-6">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 rubik text-primary-foreground">CarLink</h3>
                <p className="mb-4 poppins">
                    CarLink is your ultimate destination for buying and selling cars. Whether you're looking for a brand-new model or a pre-owned vehicle, we offer a wide selection of cars for all types of customers. Find detailed information, photos, and reviews on the cars you're interested in and make an informed decision.
                </p>
                <div className="flex justify-center gap-4 my-4">
                    {socialIcons.map((icon, index) => (
                        <Link key={index} href={icon.href} className={`text-xl transition ${icon.color}`}>
                            {icon.icon}
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center gap-4 my-6">
                    {footerLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            href={route(link.route)}
                            active={route().current(link.route)}
                            className={'text-sm hover:text-red-500 transition'}
                        >
                            {link.name}
                        </NavLink>
                    ))}

                </div>
                <Link className="text-sm text-green-500 hover:text-green-600 transition">
                    &copy; 2025 CarLink. All rights reserved.
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
