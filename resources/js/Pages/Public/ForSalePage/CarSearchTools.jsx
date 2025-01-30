import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { router } from "@inertiajs/react";
import { useState } from "react";

const CarSearchTools = ({ brands, fuels, cars }) => {
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [zipCode, setZipCode] = useState("");
  const [rangeValues, setRangeValues] = useState({
    price: { min: "", max: "" },
    year: { start: "", end: "" },
    zip: { zip: "" },
  });

  const modelsByBrand = cars.reduce((acc, car) => {
    const brand = car.brand.name;
    const model = car.model;

    if (!acc[brand]) {
      acc[brand] = [];
    }

    if (!acc[brand].includes(model)) {
      acc[brand].push(model);
    }

    return acc;
  }, {});

  const MenuItems = {
    Make: ["All makes", ...brands.map((brand) => brand.name)],
    Model: {
      "All makes": ["All"],
      ...modelsByBrand,
    },
    FuelType: ["All", ...fuels.map((fuel) => fuel.name)],
  };

  const handleRangeChange = (field, value, category) => {
    setRangeValues((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const rangeFields = [
    { category: "price", label: "Price Range", fields: ["min", "max"], placeholder: "Price" },
    { category: "year", label: "Year Range", fields: ["start", "end"], placeholder: "Year" },
  ];

  const handleSubmit = () => {
    console.log("Form submitted with the following values:");
    console.log("Make:", selectedMake);
    console.log("Model:", selectedModel);
    console.log("Zip Code:", zipCode);
    console.log("Price Range:", rangeValues.price);
    console.log("Year Range:", rangeValues.year);
    console.log("Zip:", rangeValues.zip);

    const filterQuery = {
      brands: selectedMake,
      fuels: selectedFuel,
      priceMin: rangeValues.price.min,
      priceMax: rangeValues.price.max,
      yearStart: rangeValues.year.start,
      yearEnd: rangeValues.year.end
    };

    router.visit(route('car-listing-page'), {
      method: 'get',
      data: filterQuery,
      preserveState: true
    });
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      {/* Make Dropdown */}
      <div className="col-span-2 lg:col-span-2">
        <Select onValueChange={(value) => setSelectedMake(value)}>
          <SelectTrigger className="w-full h-[42px] border border-gray-400 rounded-md focus:outline-none focus:ring-0">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Make</SelectLabel>
              {MenuItems.Make.map((make, idx) => (
                <SelectItem key={idx} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Model Dropdown */}
      <div className="col-span-2 lg:col-span-2">
        <Select onValueChange={(value) => setSelectedModel(value)}>
          <SelectTrigger className="w-full h-[42px] border border-gray-400 rounded-md focus:outline-none focus:ring-0">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Model</SelectLabel>
              {(MenuItems.Model[selectedMake] || []).map((model, idx) => (
                <SelectItem key={idx} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type Dropdown */}
      <div className="col-span-2 lg:col-span-2">
        <Select onValueChange={(value) => setSelectedFuel(value)}>
          <SelectTrigger className="w-full h-[42px] border border-gray-400 rounded-md focus:outline-none focus:ring-0">
            <SelectValue placeholder="Select Fuel Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fuel Type</SelectLabel>
              {MenuItems.FuelType.map((fuel, idx) => (
                <SelectItem key={idx} value={fuel}>
                  {fuel}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Range Inputs (Price, Year) */}
      {rangeFields.map((range) => (
        <div key={range.category} className="col-span-2 lg:col-span-2">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {range.fields.map((field) => (
                <div key={field} className="w-full">
                  <label className="text-sm block capitalize">
                    {range.label} {field}
                  </label>
                  <TextInput
                    id={`${range.category}-${field}`}
                    type="number"
                    value={rangeValues[range.category][field]}
                    onChange={(e) =>
                      handleRangeChange(field, e.target.value, range.category)
                    }
                    className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-0"
                    placeholder={range.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Zip Code Input */}
      <div className="col-span-2 lg:col-span-2">
        <label className="text-sm block">Zip Code</label>
        <TextInput
          id="zipCode"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-0"
          placeholder="Enter Zip Code"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-2 lg:col-span-2 lg:col-end-7">
        <Button className="w-full" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default CarSearchTools;
