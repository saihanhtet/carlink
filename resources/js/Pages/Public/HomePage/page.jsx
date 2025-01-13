
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import PopularCategories from './PopularCategories';
import SearchSection from './SearchSection';

export default function Welcome({ canLogin, canRegister, isLoggedIn }) {
    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <Head title="Welcome" />
            {/* Search Section */}
            <SearchSection />
            {/* Popular Categories */}
            <PopularCategories />
        </GuestLayout>
    );
}
