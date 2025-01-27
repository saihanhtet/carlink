
import TextInput from './TextInput';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

const ReUsableTable = ({ caption, tableHeaders, tableData, className, filters, selectedFilter, onSearch, onFilter, ...props }) => {
    return (
        <div className="grid w-full">
            {/* Filters */}
            <div className="mb-4 flex w-full flex-wrap gap-2 justify-between">
                {filters && (
                    <Select
                        onValueChange={(value) => onFilter(value)}
                    >
                        <SelectTrigger className="w-full md:max-w-[200px] border-muted-foreground text-center border shadow-sm focus:ring-0">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            {filters.map((filter) => (
                                <SelectItem key={filter.value} value={filter.value}>{filter.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                <div className="w-full md:w-auto flex gap-2">
                    <TextInput
                        type="text"
                        onChange={(e) => onSearch(e.target.value)}
                        className="p-2 border border-muted-foreground rounded w-full focus:ring-0"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <Separator orientation="horizontal" className="my-3" />

            {/* Table */}
            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg border rounded-lg ${className}`} {...props}>
                <div className="overflow-y-auto max-h-[400px]">
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {caption && (
                            <caption className="p-5 text-lg font-bold text-left rtl:text-right text-muted-foreground capitalize">
                                {caption}
                                <p className="mt-1 text-sm font-seminormal text-muted-foreground">
                                    Browse your data in the table below.
                                </p>
                            </caption>
                        )}
                        <thead className="sticky top-0 bg-primary z-10">
                            <tr>
                                {tableHeaders.map((header, index) => (
                                    <th key={index} className={`px-6 py-3 text-xs uppercase text-white ${header.className || ''}`}>
                                        {header.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex} className={`bg-inherit border-b dark:bg-gray-800 dark:border-gray-700 ${rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className={`px-6 py-4 break-words ${cell.className || ''}`}>
                                            {cell.content}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReUsableTable
