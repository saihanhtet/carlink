import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left Panel with Advanced Wallpaper */}
                <div className="relative hidden lg:block">
                    <img
                        src={'/assets/loginWallpaper2.jpg'}
                        alt="Augmented reality of wireframe car concept on the road and futuristic city on the background."
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                    {/* Branding Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h1 className="text-4xl font-bold drop-shadow-lg">
                            Join CarLink
                        </h1>
                        <p className="mt-2 max-w-md text-center text-lg drop-shadow">
                            Sign up now to unlock the future of smart mobility and connected driving.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="/" className="flex items-center gap-2 font-medium">
                            <div className="flex">
                                <img
                                    src={'/assets/carlogo.png'}
                                    alt="CarLink Logo"
                                    height={30}
                                    width={30}
                                    className="size-10"
                                />
                            </div>
                            <span className="font-semibold font-sans">CarLink</span>
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <form onSubmit={submit} className='flex flex-col gap-6'>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Create Your Account</h1>
                                    <p className="text-balance text-sm text-muted-foreground">
                                        Enter your details below to get started
                                    </p>
                                </div>
                                <div className="grid gap-6">
                                    {/* Name Field */}
                                    <div className="grid gap-2">
                                        <InputLabel htmlFor="name" value="Full Name" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error="Name is required."
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    {/* Email Field */}
                                    <div className="grid gap-2">
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                            error="Please enter a valid email address."
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                </div>


                                {/* Password Field */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error="Password is required"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Confirmation Password Field */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error="Confirm Password is required"
                                    />
                                    {console.log(errors)}
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>


                                <div className="mt-4 flex items-center justify-end">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Already registered?
                                    </Link>

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </GuestLayout>
    );
}
