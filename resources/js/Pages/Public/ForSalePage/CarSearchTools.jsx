import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const CarSearchTools = (brands) => {
  const [selectedMake, setSelectedMake] = useState("All makes");
  const [zipCode, setZipCode] = useState("");
  const [rangeValues, setRangeValues] = useState({
    price: { min: "", max: "" },
    year: { start: "", end: "" },
    zip: { zip: "" },
  });

  const MenuItems = {
    Make: ['All makes', 'Audi', 'BMW'],
    Model: {
      'All makes': ['All models'],
      Audi: ['A3', 'A4', 'Q7', 'R8'],
      BMW: ['X1', 'X3', 'X5', 'M3'],
    },
    FuelType: ["Petrol", "Diesel", "Electric", "Hybrid"],
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
    { category: "price", label: "Price Range", fields: ["Price Min", "Price Max"], placeholder: "Price" },
    { category: "year", label: "Year Range", fields: ["Year Start", "Year End"], placeholder: "Year" },
    { category: "zip", label: "Zip", fields: ["Zip"], placeholder: "Zip" },
  ];

  const renderSelect = (key, label, items, value, onChange) => (
    <div className={`col-span-2 lg:col-span-2`}>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full h-[42px] border border-gray-400 rounded-md focus:outline-none focus:ring-0">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item, idx) => (
              <SelectItem key={idx} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  const handleSubmit = () => {
    console.log("Form submitted with the following values:");
    console.log("Make:", selectedMake);
    console.log("Zip Code:", zipCode);
    console.log("Price Range:", rangeValues.price);
    console.log("Year Range:", rangeValues.year);
    console.log("Zip:", rangeValues.zip);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      {/* Loop through the MenuItems for Make, Model, Distance, and FuelType */}
      {Object.entries(MenuItems).map(([key, items]) => {
        if (key === "Model") {
          return renderSelect(key, "Model", items[selectedMake] || [], selectedMake, setSelectedMake);
        }
        return renderSelect(key, key, items, selectedMake, setSelectedMake);
      })}

      {/* Dynamic Range Inputs (Price, Year) */}
      {rangeFields.map((range, index) => (
        <div key={range.category} className="col-span-2 md:col-span-2 lg:col-span-2">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {range.fields.map((field) => (
                <div key={field} className={`w-full ${index === rangeFields.length - 1 ? 'col-span-2' : ''}`}>
                  <label className="text-sm block">{field}</label>
                  <input
                    id={`${range.category}-${field}`}
                    type="number"
                    value={rangeValues[range.category][field]}
                    onChange={(e) => handleRangeChange(field, e.target.value, range.category)}
                    className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-0"
                    placeholder={range.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="col-span-2 md:col-span-2 md:col-end-7">
        <Button className="w-full" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default CarSearchTools;
