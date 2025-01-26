import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { handleFormSubmit } from '@/lib/utils';
import { Alert } from '@/components/ui/alert';

export default function CarForm({ brands, fuels, car = null, className = '', otherCars = [], user }) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        brand_id: car?.brand_id || '',
        fuel_id: car?.fuel_id || '',
        model: car?.model || '',
        registration_year: car?.registration_year || '',
        price: car?.price || '',
        mileage: car?.mileage || '',
        dealer_name: car?.dealer_name || user?.name || '',
        dealer_location: car?.dealer_location || user?.profile.address || '',
    });
    const [alert, setAlert] = useState(null); // Manage alert state

    // Handle the form submission (either update or create)
    const handleSubmit = () => {
        handleFormSubmit({
            data,
            model: 'cars',
            instance: car,
            actions: { post, put },
            reset,
            clearErrors,
            setAlert, // Pass setAlert to handle alert messages
        });
    };


    // Calculate the fair deal status based on the average price of same model cars
    const calculateFairDeal = () => {
        const sameModelCars = otherCars.filter(
            (otherCar) =>
                otherCar.model === data.model && otherCar.brand_id === data.brand_id
        );
        if (sameModelCars.length === 0) return null;

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
        return null;
    };

    // Get the fair deal status
    const fairDealStatus = calculateFairDeal();

    return (
        <section className={`space-y-6 ${className}`}>
            {alert && <Alert variant={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
            <header>
                <h2 className="text-xl font-bold rubik text-primary-foreground">
                    {car ? 'Edit Car' : 'Add New Car'}
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
                        className='focus:ring-0'
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
                        className='focus:ring-0'
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
                        className='focus:ring-0'
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
                        className='focus:ring-0'
                    />
                    <InputError message={errors.mileage} />
                </div>

                <div>
                    <InputLabel htmlFor="brand_id" value="Brand" />
                    <Select
                        onValueChange={(value) => setData('brand_id', value)}
                        value={data.brand_id}
                    >
                        <SelectTrigger className="w-full border border-gray-300 shadow-sm focus:ring-0">
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
                        <SelectTrigger className="w-full border border-gray-300 shadow-sm focus:ring-0">
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
            </div>

            <div>
                <InputLabel htmlFor="dealer_name" value="Dealer Name" />
                <TextInput
                    id="dealer_name"
                    type="text"
                    value={data.dealer_name}
                    onChange={(e) => setData('dealer_name', e.target.value)}
                    placeholder="Enter dealer name"
                    className='focus:ring-0'
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
                    className='focus:ring-0 focus:border-none'
                />
                <InputError message={errors.dealer_location} />
            </div>

            <div className="mt-4">
                <p className="text-primary-foreground">
                    Deal Status: <span className="font-bold">{fairDealStatus || 'N/A'}</span>
                </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => reset()}>
                    Reset
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    {car ? 'Update Car' : 'Add Car'}
                </Button>
            </div>
        </section>
    );
}
