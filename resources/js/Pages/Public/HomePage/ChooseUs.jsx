import React from 'react';
import { CheckCircle, Star, ShieldCheck, Car } from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        {
            title: 'Extensive Car Collection',
            description: 'We offer a wide range of high-quality, inspected, and pre-owned vehicles to choose from, ensuring you find the perfect match for your needs.',
            icon: <Car className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Transparent Pricing',
            description: 'No hidden fees! We provide clear, upfront pricing on every vehicle, so you can be sure you’re getting the best deal.',
            icon: <CheckCircle className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Trusted by Thousands',
            description: 'With thousands of satisfied customers, we’ve earned our reputation for offering reliable cars and exceptional customer service.',
            icon: <Star className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Easy Financing Options',
            description: 'Whether you have good or bad credit, our flexible financing options help you get the car you want with affordable payment plans.',
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                        <p className="mt-4 text-lg text-gray-600">Here’s why thousands of car buyers trust us to help them find their dream cars</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {reasons.map((reason, index) => (
                            <div key={index} className="text-center p-6 bg-white shadow-lg rounded-lg">
                                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{reason.title}</h3>
                                <p className="text-gray-600">{reason.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href={route('car-listing-page')}
                            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Start Browsing Our Cars
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
