import React from 'react'
import GuestLayout from '@/Layouts/GuestLayout'


const CarDetailPage = ({ canLogin, canRegister, isLoggedIn }) => {
    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <div>CarDetailPage</div>
        </GuestLayout>

    )
}

export default CarDetailPage
