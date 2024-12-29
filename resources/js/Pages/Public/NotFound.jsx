import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from '@inertiajs/react';

const NotFound = () => {
    return (
        <GuestLayout>
            <Head title="Page Not Found" />
            <div className="px-4 flex h-[600px] w-screen justify-center items-center">
                <Card className='w-full max-w-[600px] mx-auto shadow-md text-center space-y-4'>
                    <CardHeader>
                        <CardTitle className="text-purple-600 font-3xl font-mono">404 Page Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='rubik'>Oops! The page you're looking for doesn't exist.</p>
                    </CardContent>
                    <CardFooter className='flex justify-center items-center'>
                        <Link href={route('home-page')}>
                            <Button className="w-full">Go Back to Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </GuestLayout>
    );
};

export default NotFound;
