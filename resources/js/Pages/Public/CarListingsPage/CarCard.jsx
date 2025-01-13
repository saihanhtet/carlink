import { ImageWithFallback } from "@/components/FallbackImage";
import React from "react";

const CarCard = ({ car }) => {
    return (
        <div className="w-full h-full mx-auto shadow-sm shadow-black rounded-lg flex flex-col md:flex-row relative overflow-hidden">
            <div className="relative w-full h-full flex justify-center items-center max-w-[450px] max-h-[350px]  bg-gray-100">
                <ImageWithFallback
                    src={car.image}
                    alt={car.model}
                    className="w-3/4 h-full object-contain"
                />
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1">
                    Sponsored
                </div>
            </div>
            <div className="p-4 poppins">
                <h2 className="text-2xl font-bold rubik">
                    {car.model}
                </h2>
                <p className="text-sm ">{car.mileage}</p>
                <p className="mt-2 text-xl font-bold ">{car.price}</p>
                <span className="inline-block bg-green-400 text-xs font-semibold px-2 py-1 rounded">
                    Good Deal
                </span>
                <div className="mt-4">
                    <h3 className="text-sm font-semibold">
                        The Autobarn Volkswagen of Countryside
                    </h3>
                    <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.157 3.564a1 1 0 00.95.69h3.917c.969 0 1.371 1.24.588 1.81l-3.172 2.304a1 1 0 00-.364 1.118l1.216 3.75c.3.923-.755 1.688-1.54 1.118l-3.185-2.31a1 1 0 00-1.175 0l-3.185 2.31c-.785.57-1.84-.195-1.54-1.118l1.216-3.75a1 1 0 00-.364-1.118L2.453 9.07c-.783-.57-.38-1.81.588-1.81h3.917a1 1 0 00.95-.69l1.157-3.564z" />
                                    </svg>
                                ))}
                        </div>
                        <p className="ml-2 text-sm">(1,411 reviews)</p>
                    </div>
                    <p className="text-sm mt-2">{car.location}</p>
                    <a
                        href="#"
                        className="mt-4 block text-red-400 text-sm font-semibold"
                    >
                        View on dealer's site →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
