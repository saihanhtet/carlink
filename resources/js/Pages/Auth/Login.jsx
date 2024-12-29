import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';



export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Panel */}
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 font-medium"
                        >
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
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className='flex flex-col gap-6'>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Login to your account</h1>
                                    <p className="text-balance text-sm text-muted-foreground">
                                        Enter your email below to login to your account
                                    </p>
                                </div>
                                <div className="grid gap-6">
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

                                    {/* Password Field */}
                                    <div className="grid gap-2">
                                        <div className="flex justify-between items-center">
                                            <InputLabel htmlFor="password" value="Password" />
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}
                                        </div>
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            error="Password is required"
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Remember Me Checkbox */}
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <Link
                                        href={route('register')}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        New User?
                                    </Link>

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Panel with Advanced Wallpaper */}
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
                            Welcome to CarLink
                        </h1>
                        <p className="mt-2 max-w-md text-center text-lg drop-shadow">
                            Experience the future of connected vehicles and smart mobility.
                        </p>
                    </div>
                </div>
            </div>


        </GuestLayout>
    );
}
