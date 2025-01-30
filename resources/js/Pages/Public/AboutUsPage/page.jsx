import GuestLayout from "@/Layouts/GuestLayout";

const AboutUs = ({ canLogin, canRegister, isLoggedIn }) => {
    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <div className="min-h-screen flex flex-col justify-start items-center py-12 px-4">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <section className="mb-12">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold rubik mb-6">
                                About Us
                            </h1>
                            <p className="text-lg leading-relaxed">
                                Welcome to the <span className="font-semibold rubik">CarLink</span>,
                                your trusted destination for buying and selling cars seamlessly.
                            </p>
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center mb-12 place-items-center shadow-lg rounded-md p-3">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <span className="font-semibold">Comprehensive Listings:</span> Explore a wide range of cars from trusted sellers.
                                </li>
                                <li>
                                    <span className="font-semibold">User-Friendly Interface:</span> Our platform is intuitive and easy to use.
                                </li>
                                <li>
                                    <span className="font-semibold">Secure Transactions:</span> We prioritize your safety and data privacy.
                                </li>
                                <li>
                                    <span className="font-semibold">Dedicated Support:</span> Our team is ready to assist you at every step.
                                </li>
                            </ul>
                        </div>
                        <div className="h-full w-full relative">
                            <img
                                src="/assets/Why-Choose-Us-Instagram-Post.png"
                                alt="Why Choose Us Instagram Post"
                                className="rounded-lg shadow-lg w-full h-full object-cover"
                            />
                        </div>
                    </section>

                    {/* Our Vision Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="h-full w-full relative">
                            <img
                                src="/assets/our-vision.png"
                                alt="Our Vision"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Our Vision</h2>
                            <p className="leading-relaxed">
                                To be the leading online platform for used car transactions by delivering exceptional service and building trust within the automotive community.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </GuestLayout>
    );
};

export default AboutUs;
