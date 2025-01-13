
import { ImageWithFallback } from "@/components/FallbackImage";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const PopularCategories = () => {
    const categories = ["Electric", "SUV", "Sedan", "Luxury"];

    return (
        <section className="px-4 mx-auto flex justify-between items-center py-12 md:py-32">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-11 rubik text-primary text-center">Popular Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Card key={category} className="shadow-sm p-0">
                            <CardHeader className="py-4">
                                <CardTitle className="font-xl rubik">{category}</CardTitle>
                                <CardDescription>
                                    Explore the latest {category} cars
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="m-0 p-0">
                                <ImageWithFallback
                                    src={`https://via.placeholder.com/150?text=${category}`}
                                    alt={category}
                                    className="w-full h-[250px]"
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end items-center py-4">
                                <Button
                                    variant="link"
                                    className="font-semibold text-primary"
                                >
                                    Shop Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
