import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { router, useForm } from '@inertiajs/react';
import { handleFormSubmit } from '@/lib/utils';
import { Alert } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CarForm({ brands, fuels, engines, car = null, className = '', otherCars = [], user }) {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        brand_id: car?.brand_id || '',
        fuel_id: car?.fuel_id || '',
        engine_id: car?.engine_id || '',
        model: car?.model || '',
        registration_year: car?.registration_year || '',
        price: car?.price || '',
        mileage: car?.mileage || '',
        image: car?.image || '',
        seats: car?.seats || '',
        transmission: car?.transmission || '',
        description: car?.description || '',
        dealer_name: car?.dealer_name || user?.name || '',
        dealer_location: car?.dealer_location || user?.profile.address || '',
        price_category: '',
    });
    const [alert, setAlert] = useState(null);

    console.log(car);

    const handleSubmit = () => {
        handleFormSubmit({
            data,
            model: car ? 'car' : 'cars',
            instance: car,
            actions: { post, patch },
            reset,
            clearErrors,
            setAlert: (newAlert) => {
                setAlert(newAlert);
                setTimeout(() => setAlert(null), 5000);
            },
        });
    };


    useEffect(() => {
        const calculateFairDeal = () => {
            const sameModelCars = otherCars.filter(
                (otherCar) =>
                    otherCar.model === data.model && otherCar.brand_id === data.brand_id
            );
            if (sameModelCars.length === 0) return 'Not Available';

            const avgPrice = sameModelCars.reduce((sum, car) => sum + car.price, 0) / sameModelCars.length;

            if (data.price) {
                const priceDiff = data.price - avgPrice;
                if (Math.abs(priceDiff) <= avgPrice * 0.1) {
                    return 'Fair Deal';
                } else if (priceDiff < 0) {
                    return 'Underpriced';
                } else {
                    return 'Overpriced';
                }
            }
            return 'Not Available';
        };

        const price_category = calculateFairDeal();
        setData('price_category', price_category);
    }, [data.model, data.brand_id, data.price]);

    return (
        <section className={`space-y-6 ${className}`}>
            {alert && (
                <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            )}
            <header>
                <h2 className="text-xl font-bold rubik text-primary">

                    {car ? (
                        <div className='flex gap-5 items-center'>
                            <Button variant="link" className="text-primary" onClick={() => router.visit(route('car-list-dashboard'))}>
                                <MoveLeft /> Go Back
                            </Button>
                            <div>Edit Car</div>
                        </div>
                    ) : 'Add New Car'}
                </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" role="form">
                <div>
                    <InputLabel htmlFor="model" value="Car Model" />
                    <TextInput
                        id="model"
                        type="text"
                        value={data.model}
                        onChange={(e) => setData('model', e.target.value)}
                        placeholder="Enter car model"
                        className='focus:ring-0 bg-white'
                    />
                    <InputError message={errors.model} />
                </div>

                <div>
                    <InputLabel htmlFor="registration_year" value="Registration Year" />
                    <TextInput
                        id="registration_year"
                        type="number"
                        value={data.registration_year}
                        onChange={(e) =>
                            setData('registration_year', e.target.value)
                        }
                        placeholder="Enter registration year"
                        className='focus:ring-0 bg-white'
                    />
                    <InputError message={errors.registration_year} />
                </div>

                <div>
                    <InputLabel htmlFor="price" value="Price ($)" />
                    <TextInput
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', parseFloat(e.target.value))}
                        placeholder="Enter price"
                        className='focus:ring-0 bg-white'
                    />
                    <InputError message={errors.price} />
                </div>

                <div>
                    <InputLabel htmlFor="mileage" value="Mileage" />
                    <TextInput
                        id="mileage"
                        type="number"
                        value={data.mileage}
                        onChange={(e) => setData('mileage', e.target.value)}
                        placeholder="Enter mileage"
                        className='focus:ring-0 bg-white'
                    />
                    <InputError message={errors.mileage} />
                </div>

                <div>
                    <InputLabel htmlFor="seats" value="Car Seats Amount" />
                    <TextInput
                        id="seats"
                        type="number"
                        value={data.seats}
                        onChange={(e) =>
                            setData('seats', e.target.value)
                        }
                        placeholder="Enter seats amount of your car"
                        className='focus:ring-0 bg-white'
                    />
                    <InputError message={errors.seats} />
                </div>

                <div>
                    <InputLabel htmlFor="transmission" value="Transmission" />
                    <Select
                        onValueChange={(value) => setData('transmission', value)}
                        value={data.transmission}
                    >
                        <SelectTrigger className="w-full border bg-white border-gray-300 shadow-sm focus:ring-0">
                            <SelectValue placeholder="Select a Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={1} value={'Automatic'}>Automatic</SelectItem>
                            <SelectItem key={2} value={'Manual'}>Manual</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.transmission} />
                </div>

                <div>
                    <InputLabel htmlFor="brand_id" value="Brand" />
                    <Select
                        onValueChange={(value) => setData('brand_id', value)}
                        value={data.brand_id}
                    >
                        <SelectTrigger className="w-full border bg-white border-gray-300 shadow-sm focus:ring-0">
                            <SelectValue placeholder="Select a Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            {brands.map((brand) => (
                                <SelectItem key={brand.id} value={brand.id}>
                                    {brand.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.brand_id} />
                </div>

                <div>
                    <InputLabel htmlFor="fuel_id" value="Fuel Type" />
                    <Select
                        onValueChange={(value) => setData('fuel_id', value)}
                        value={data.fuel_id}
                    >
                        <SelectTrigger className="w-full border bg-white border-gray-300 shadow-sm focus:ring-0">
                            <SelectValue placeholder="Select a Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {fuels.map((fuel) => (
                                <SelectItem key={fuel.id} value={fuel.id}>
                                    {fuel.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.fuel_id} />
                </div>

                <div>
                    <InputLabel htmlFor="engine_id" value="Engine Type" />
                    <Select
                        onValueChange={(value) => setData('engine_id', value)}
                        value={data.engine_id}
                    >
                        <SelectTrigger className="w-full border bg-white border-gray-300 shadow-sm focus:ring-0">
                            <SelectValue placeholder="Select a Engine Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {engines.map((engine) => (
                                <SelectItem key={engine.id} value={engine.id}>
                                    {engine.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.engine} />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="image" value="Car Image Upload" />
                <TextInput
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => setData('image', e.target.files[0])}
                    className="focus:ring-0 bg-white"
                />
                <InputError message={errors.image} />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Car Description" />
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Write the information of car"
                    className="focus:ring-0 h-48 w-full border-gray-300 rounded-md shadow-sm"
                />
                <InputError message={errors.description} />
            </div>

            <Separator />

            <div>
                <InputLabel htmlFor="dealer_name" value="Dealer Name" />
                <TextInput
                    id="dealer_name"
                    type="text"
                    value={data.dealer_name}
                    onChange={(e) => setData('dealer_name', e.target.value)}
                    placeholder="Enter dealer name"
                    className='focus:ring-0 bg-white'
                />
                <InputError message={errors.dealer_name} />
            </div>

            <div>
                <InputLabel htmlFor="dealer_location" value="Dealer Location" />
                <TextInput
                    id="dealer_location"
                    type="text"
                    value={data.dealer_location}
                    onChange={(e) => setData('dealer_location', e.target.value)}
                    placeholder="Enter dealer location"
                    className='focus:ring-0 focus:border-none bg-white'
                />
                <InputError message={errors.dealer_location} />
            </div>

            <div className="mt-4">
                <p className="text-primary">
                    Deal Status: <span className="font-bold">{data.price_category || 'Not Available'}</span>
                </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => reset()}>
                    Reset
                </Button>
                <Button
                    variant="default"
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    {car ? 'Update Car' : 'Add Car'}
                </Button>
            </div>
        </section>
    );
}
