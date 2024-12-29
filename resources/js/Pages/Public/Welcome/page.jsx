
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PopularCategories from './PopularCategories';
import SearchSection from './SearchSection';



export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Welcome" />
            {/* Search Section */}
            <SearchSection />
            {/* Popular Categories */}
            <PopularCategories />
        </GuestLayout>
    );
}
