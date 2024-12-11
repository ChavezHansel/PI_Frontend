
import { IoMdClose } from "react-icons/io";
import React, { useState, useRef, useEffect } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
import ArrowIcon from "../common/ArrowIcon";
import { FaFilter } from "react-icons/fa6";

interface FiltersSectionProps {
    open: number;
    filterOptions: any;
    filters: {
        color: string[];
        size: string[];
        priceRange: { minPrice: number; maxPrice: number };
    };
    handleOpen: (value: number) => void;
    handleCheckboxChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "color" | "size"
    ) => void;
    handlePriceRangeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
    open,
    filterOptions,
    filters,
    handleOpen,
    handleCheckboxChange,
    handlePriceRangeChange,
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const filtersRef = useRef<HTMLDivElement>(null);

    const toggleMobileFilters = () => {
        setMobileFiltersOpen(!mobileFiltersOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filtersRef.current &&
                !filtersRef.current.contains(event.target as Node)
            ) {
                setMobileFiltersOpen(false); 
            }
        };

        if (mobileFiltersOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileFiltersOpen]);

    return (
        <>
            <button
                className="lg:hidden bg-primary-500/85 fixed right-2 top-20 max-w-32 flex items-center justify-center gap-2 text-white p-2 rounded-md z-50"
                onClick={toggleMobileFilters}
            >
                <FaFilter className="text-white" />
            </button>

            <div
                ref={filtersRef}
                className={`${
                    mobileFiltersOpen
                        ? "fixed top-0 right-0  h-full bg-white z-50 p-4 py-10"
                        : "hidden"
                } lg:block lg:static lg:w-1/5 flex-shrink-0 bg-gray-100 p-4 rounded-l-lg shadow-sm`}
            >
                <button
                    className="lg:hidden hover:text-black text-gray-600 transition-all duration-300 absolute right-2 top-2 text-2xl font-semibold mb-4"
                    onClick={toggleMobileFilters}
                >
                    <IoMdClose />
                </button>

                <h2 className="text-2xl font-semibold">Filtros</h2>
                {filterOptions?.colors && (
                    <Accordion
                        open={open === 1}
                        icon={<ArrowIcon id={1} open={open} />}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-none py-1 pl-2 text-lg font-medium "
                        >
                            Color
                        </AccordionHeader>
                        <AccordionBody>
                            <List className="p-0 -mt-4">
                                {filterOptions?.colors?.map((color: string) => (
                                    <ListItem key={color} className="p-0">
                                        <label
                                            htmlFor={`color-${color}`}
                                            className="flex w-full cursor-pointer items-center px-3 py-2"
                                        >
                                            <ListItemPrefix className="mr-3">
                                                <Checkbox
                                                    id={`color-${color}`}
                                                    ripple={false}
                                                    value={color}
                                                    checked={filters.color.includes(
                                                        color
                                                    )}
                                                    className="hover:before:opacity-0"
                                                    containerProps={{
                                                        className: "p-0",
                                                    }}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            "color"
                                                        )
                                                    }
                                                />
                                            </ListItemPrefix>
                                            <Typography
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {color}
                                            </Typography>
                                        </label>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionBody>
                    </Accordion>
                )}
                {filterOptions?.sizes && (
                    <Accordion
                        open={open === 2}
                        icon={<ArrowIcon id={2} open={open} />}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-none py-1 text-lg font-medium pl-2"
                        >
                            Tamaño
                        </AccordionHeader>
                        <AccordionBody className="p-0 -mt-4">
                            <List>
                                {filterOptions?.sizes?.map((size: string) => (
                                    <ListItem key={size} className="p-0">
                                        <label
                                            htmlFor={`size-${size}`}
                                            className="flex w-full cursor-pointer items-center px-3 py-2"
                                        >
                                            <ListItemPrefix className="mr-3">
                                                <Checkbox
                                                    id={`size-${size}`}
                                                    ripple={false}
                                                    value={size}
                                                    checked={filters.size.includes(
                                                        size
                                                    )}
                                                    className="hover:before:opacity-0"
                                                    containerProps={{
                                                        className: "p-0",
                                                    }}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            "size"
                                                        )
                                                    }
                                                />
                                            </ListItemPrefix>
                                            <Typography
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {size}
                                            </Typography>
                                        </label>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionBody>
                    </Accordion>
                )}
                {filters.priceRange && (
                    <Accordion
                        open={open === 3}
                        icon={<ArrowIcon id={3} open={open} />}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(3)}
                            className="border-none py-1 pl-2 text-lg font-medium "
                        >
                            Rango de Precios
                        </AccordionHeader>
                        <AccordionBody>
                            <select
                                onChange={handlePriceRangeChange}
                                className="border p-2 rounded-lg w-full -mt-4"
                                value={`${filters.priceRange.minPrice}-${filters.priceRange.maxPrice}`}
                            >
                                <option value="-9999999-9999999">Todos</option>
                                {filterOptions?.priceRanges?.map(
                                    (range: any) => (
                                        <option
                                            key={`${range.minPrice}-${range.maxPrice}`}
                                            value={`${range.minPrice}-${range.maxPrice}`}
                                        >
                                            S/{range.minPrice} - S/
                                            {range.maxPrice}
                                        </option>
                                    )
                                )}
                            </select>
                        </AccordionBody>
                    </Accordion>
                )}
            </div>
        </>
    );
};

export default FiltersSection;
