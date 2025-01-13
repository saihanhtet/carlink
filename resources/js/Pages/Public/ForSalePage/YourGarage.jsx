import React from "react";
import { Link } from "@inertiajs/react";

const YourGarageSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-betwee py-10 px-6 md:px-16 border border-muted rounded-md poppins">
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-bold rubik text-primary mb-4">Your Garage</h2>
                <p className="text-lg text-white-600 mb-6">
                    Add your car. Track its value.
                </p>
                <p className="text-white-600 mb-4">
                    Add your car to Your Garage to track its market value and cash in
                    when the time is right to sell.{" "}
                    <Link href="#" className="text-primary hover:underline font-semibold text-md capitalize">
                        Learn more
                    </Link>
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition" href={route('register')}>
                        Get started
                    </Link>
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link href={route('login')} className="text-primary font-semibold text-md capitalize hover:underline">
                            Sign in.
                        </Link>
                    </p>
                </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                    <img
                        src="/assets/Garage-Hero.webp"
                        alt="Car"
                        className="w-80 h-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default YourGarageSection;
