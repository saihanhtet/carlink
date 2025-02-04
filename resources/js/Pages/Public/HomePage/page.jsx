
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CarSearchTools from '../ForSalePage/CarSearchTools';
import HeroSection from './HeroSection';
import HowItWorks from './HowWork';
import WhyChooseUs from './ChooseUs';

export default function Welcome({ canLogin, canRegister, isLoggedIn }) {
    const { cars, brands, fuels } = usePage().props;
    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <Head title="Welcome" />
            {/* Hero Section */}
            <HeroSection />

            {/* Search tool section */}
            <div className="container mx-auto py-10 space-y-8">
                <Card className='rounded-md bg-gray-100 border border-slate-400 shadow-md'>
                    <CardHeader>
                        <CardTitle className="rubik text-3xl font-bold text-center">Filter Cars</CardTitle>
                        <CardDescription className='text-center font-semibold text-muted-foreground'>
                            Customize your car by yourself.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CarSearchTools brands={brands} fuels={fuels} cars={cars} />
                    </CardContent>
                </Card>
            </div>

            {/* How it is works section */}
            <HowItWorks />
            {/* why choose us section */}
            <WhyChooseUs />
        </GuestLayout>
    );
}
