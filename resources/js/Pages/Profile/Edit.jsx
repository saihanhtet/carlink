import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, profile, status }) {
    const breadcrumbs = [
        { name: 'Account', link: '' },
        { name: 'Edit Profile', link: new URL(route("profile.edit")).pathname },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className=" p-4 sm:rounded-lg sm:p-8 border border-muted shadow-md">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            profile={profile}
                            className="max-w-xl"
                        />
                    </div>

                    <div className=" p-4 sm:rounded-lg sm:p-8 border border-muted shadow-md">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className=" p-4 sm:rounded-lg sm:p-8 border border-muted shadow-md">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
