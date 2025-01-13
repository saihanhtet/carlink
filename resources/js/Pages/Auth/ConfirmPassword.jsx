import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="px-4 flex h-[600px] w-screen justify-center items-center">
                <Card className='w-full max-w-[600px] mx-auto shadow-md text-center space-y-4'>
                    <CardHeader>
                        <CardTitle className="text-purple-300 font-3xl font-semibold rubik">Confirm Password</CardTitle>
                    </CardHeader>
                    <CardContent className='text-left'>
                        <p className='poppins text-center'> This is a secure area of the application. Please confirm your
                            password before continuing.</p>
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <Button className="ms-4" disabled={processing}>
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
