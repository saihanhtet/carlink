
import { Button } from '@/Components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SearchSection = () => {
    return (
        <section className="px-4 w-full px-auto m-0 flex justify-between items-center  bg-gray-50 py-12 md:py-32">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 poppins">Shop cars for sale</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <Select>
                        <SelectTrigger className="w-full border border-gray-400 rounded-lg">
                            <SelectValue placeholder="Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="both">New & Used</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full border border-gray-400 rounded-lg">
                            <SelectValue placeholder="Makes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="makes">All Makes</SelectItem>
                            <SelectItem value="tesla">Tesla</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full border border-gray-400 rounded-lg">
                            <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 miles</SelectItem>
                            <SelectItem value="30">30 miles</SelectItem>
                            <SelectItem value="50">50 miles</SelectItem>
                            <SelectItem value="70">70 miles</SelectItem>
                            <SelectItem value="all">All miles</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>Show Results</Button>
                </div>
            </div>
        </section>
    )
}

export default SearchSection
