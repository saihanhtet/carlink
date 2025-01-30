import React from 'react';
import { CircleDollarSign, UsersRound, ZoomIn } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            title: 'Place Your Bid',
            description: 'Once you’ve found a car that catches your eye, submit your bid and start the conversation with the seller to agree on the best price.',
            icon: <CircleDollarSign className="w-8 h-8 text-black" />,
        },
        {
            title: 'Browse Cars',
            description: 'Take your time exploring various options in our vast collection of well-maintained, pre-owned cars that cater to all preferences and budgets.',
            icon: <ZoomIn className="w-8 h-8 text-black" />,
        },
        {
            title: 'Connect with Seller',
            description: 'Once you’ve placed your bid, reach out directly to the seller to discuss details, negotiate, and seal the deal on your next car.',
            icon: <UsersRound className="w-8 h-8 text-black" />,
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 poppins">
                    <header className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 rubik">How It Works</h2>
                        <p className="mt-4 text-lg text-gray-600">Effortless steps to help you find and own your dream car</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
