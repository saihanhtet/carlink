
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
    return (
        <section className="px-4 w-full px-auto m-0 flex justify-between items-center relative">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-purple-900/30 backdrop-blur-0"></div>
            {/* Hero Section Overlay */}
            <div className="container mx-auto text-center z-20 flex flex-col items-start h-screen w-full justify-end">
                {/* [text-shadow:_0_4px_4px_rgb(99_102_241_/_1)] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] */}
                <h2 className="text-3xl font-black mb-1 text-white text-left" style={{ letterSpacing: '3px' }}>
                    <div className="p-3 flex flex-col items-center md:items-start">
                        <div className="text-3xl rubik inline-flex bg-black/10 p-3">Buy</div>
                        <div className="text-3xl rubik inline-flex bg-black/10 p-3 mt-1">Your Dream Car</div>
                        <p className="font-black text-left text-lg w-full md:w-3/6 mt-1 bg-black/10 p-3">
                            Experience the thrill of owning your dream car. Whether it's a high-performance supercar, a timeless classic, or a luxury ride, we bring you the finest selection at unbeatable deals. Start your journey today and drive home excellence.
                        </p>
                    </div>
                </h2>
            </div>
        </section>
    );
};

export default HeroSection;
