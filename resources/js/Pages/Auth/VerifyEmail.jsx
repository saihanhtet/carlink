
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="px-4 flex h-[600px] w-screen justify-center items-center">
                <Card className='w-full max-w-[600px] mx-auto shadow-md text-center space-y-4'>
                    <CardHeader>
                        <CardTitle className="text-purple-300 font-3xl font-semibold rubik">Email Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='poppins'>Thanks for signing up! Before getting started, could you verify
                            your email address by clicking on the link we just emailed to
                            you? If you didn't receive the email, we will gladly send you
                            another.</p>
                        {status === 'verification-link-sent' && (
                            <div className="mb-4 text-sm font-medium text-green-300">
                                A new verification link has been sent to the email address
                                you provided during registration.
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className='flex justify-center'>
                        <form onSubmit={submit} className='flex items-center justify-between gap-3'>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm underline hover:text-blue-800"
                            >
                                Log Out
                            </Link>
                            <Button disabled={processing}>
                                Resend Email
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </GuestLayout>
    );
}
