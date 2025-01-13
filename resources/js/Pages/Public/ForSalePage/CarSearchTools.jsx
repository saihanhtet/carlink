
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const CarSearchTools = () => {
  const [selectedMake, setSelectedMake] = useState("All makes");
  const [zipCode, setZipCode] = useState("");
  const [isGeolocated, setIsGeolocated] = useState(false); // Track whether geolocation has been fetched

  const MenuItems = {
    Type: ['New', 'Used', 'New & Used'],
    Make: ['All makes', 'Audi', 'BMW'],
    Model: {
      'All makes': ['All models'],
      Audi: ['A3', 'A4', 'Q7', 'R8'],
      BMW: ['X1', 'X3', 'X5', 'M3'],
    },
    Price: [30000, 40000, 50000, 200000], // USD
    Distance: [10, 20, 30, 40, 50, 60], // miles
  };

  // Function to get the ZIP code based on the user's geolocation
  const getGeolocation = async (retries = 3) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 0
        });
      });
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      // Continue with your logic to fetch the ZIP code
    } catch (error) {
      console.log(error)
      if (retries > 0) {
        console.log(`Retrying geolocation... (${3 - retries + 1})`);
        getGeolocation(retries - 1); // Retry logic
      } else {
        console.error("Failed to fetch location after retries:", error);
      }
    }
  };

  // Trigger geolocation request on component mount or user action
  useEffect(() => {
    if (!isGeolocated) {
      getGeolocation();
    }
  }, [isGeolocated]);


  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 grid-rows-[auto_auto_auto_auto_auto_auto] lg:grid-rows-[auto_auto_auto] gap-2">
      {/* Type */}
      <div className="col-span-2 lg:col-span-2">
        <Select className="w-full">
          <SelectTrigger className="w-full border border-gray-400 rounded-none ring-offset-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-muted-foreground">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              {MenuItems["Type"].map((value, idx) => (
                <SelectItem key={idx} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Make */}
      <div className="col-span-2 lg:col-span-2">
        <Select className="w-full" onValueChange={(value) => setSelectedMake(value)}>
          <SelectTrigger className="w-full border border-gray-400 rounded-none ring-offset-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-muted-foreground">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Make</SelectLabel>
              {MenuItems["Make"].map((value, idx) => (
                <SelectItem key={idx} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Model */}
      <div className="col-span-2 lg:col-span-2">
        <Select className="w-full">
          <SelectTrigger className="w-full border border-gray-400 rounded-none ring-offset-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-muted-foreground">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Model</SelectLabel>
              {MenuItems["Model"][selectedMake]?.map((value, idx) => (
                <SelectItem key={idx} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Price */}
      <div className="col-span-2 lg:col-span-2">
        <Select className="w-full">
          <SelectTrigger className="w-full border border-gray-400 rounded-none ring-offset-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-muted-foreground">
            <SelectValue placeholder="Select Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price</SelectLabel>
              {MenuItems["Price"].map((value, idx) => (
                <SelectItem key={idx} value={value}>
                  ${value.toLocaleString()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Distance */}
      <div className="col-span-2 lg:col-span-1">
        <Select className="w-full">
          <SelectTrigger className="w-full border border-gray-400 rounded-none ring-offset-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 text-muted-foreground">
            <SelectValue placeholder="Select Distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Distance</SelectLabel>
              {MenuItems["Distance"].map((value, idx) => (
                <SelectItem key={idx} value={value}>
                  {value} miles
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ZIP Input */}
      <Input className="col-span-2 lg:col-span-1 border border-gray-400 rounded-none px-4 py-2 ring-offset-0 h-10 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0" placeholder={zipCode ? `ZIP: ${zipCode}` : "Enter ZIP"} value={zipCode || ""} type="text" />
      {/* Geo Get Button and Search Button */}
      <Button className="col-span-2 lg:col-span-1" onClick={() => getGeolocation()}>
        Get Location
      </Button>
      <Button className="col-span-2 lg:col-span-1">
        Search
      </Button>
    </div>
  );
};

export default CarSearchTools;
