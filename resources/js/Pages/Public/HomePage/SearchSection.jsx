
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SearchSection = () => {
    return (
        <section className="px-4 w-full px-auto m-0 flex justify-between items-cente py-12 md:py-32 relative">
            {/* Video Background */}
            <video
                src={"/assets/Ferrari-F40-Forza-Horizon-4-Wallpaper.mp4"}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-black-500/0 to-yellow-500/30 backdrop-blur-0"></div>
            {/* Hero Section Overlay */}
            <div className="container mx-auto text-center z-20">
                <h2 className="text-3xl font-semibold mb-12 poppins text-white [text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)] drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
                    Shop cars for sale
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <Select>
                        <SelectTrigger
                            className="w-full border border-gray-50 rounded-lg bg-transparent text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
                            <SelectValue placeholder="Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="both">New & Used</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger
                            className="w-full border border-gray-50 rounded-lg bg-transparent text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
                            <SelectValue placeholder="Makes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="makes">All Makes</SelectItem>
                            <SelectItem value="tesla">Tesla</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger
                            className="w-full border border-gray-50 rounded-lg bg-transparent text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
                            <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 miles</SelectItem>
                            <SelectItem value="30">30 miles</SelectItem>
                            <SelectItem value="50">50 miles</SelectItem>
                            <SelectItem value="70">70 miles</SelectItem>
                            <SelectItem value="all">All miles</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>Show Results</Button>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
