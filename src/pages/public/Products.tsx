import React, { useState, useEffect } from "react";
import { clientApi } from "../../services/api";
import { useGetCategories } from "../../hooks/useCategoryService";
import { OrbitProgress } from "react-loading-indicators";
import ProductCard from "../../components/product/ProductCard";
import FiltersSection from "../../components/product/FilterSection";
import Pagination from "../../components/product/Pagination";
import { Input } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

const Products: React.FC = () => {
    const [filterOptions, setFilterOptions] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [filters, setFilters] = useState({
        color: [] as string[],
        size: [] as string[],
        priceRange: { minPrice: 0, maxPrice: 0 },
    });
    const [open, setOpen] = useState(0);
    const [sortOrder, setSortOrder] = useState("price-asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const resetFilters = () => {
        setSortOrder("price-asc");
        setCurrentPage(1);
        setFilters({
            color: [] as string[],
            size: [] as string[],
            priceRange: { minPrice: 0, maxPrice: 0 },
        });
        setSelectedCategory("all");
        setSearchTerm("");
    };

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    const { data: categories } = useGetCategories();

    const fetchFilterOptions = async () => {
        try {
            const response = await clientApi.get("/products/filter-options");
            setFilterOptions(response.data);
        } catch (err: any) {
            setError("Error fetching filter options");
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const fetchFilteredProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const params: any = {
                page: currentPage,
                limit: 12,
                sortOrder,
                search: searchTerm,
            };
            if (selectedCategory !== "all") params.category = selectedCategory;
            if (filters.color.length > 0) params.color = filters.color;
            if (filters.size.length > 0) params.size = filters.size;
            if (filters.priceRange.minPrice || filters.priceRange.maxPrice) {
                params.minPrice = filters.priceRange.minPrice;
                params.maxPrice = filters.priceRange.maxPrice;
            }

            const response = await clientApi.get("/products/filter", {
                params,
            });
            const { products, totalPages } = response.data;

            setProducts(products);
            setTotalPages(totalPages);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSetOrder = (value: string) => {
        setSortOrder(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        fetchFilteredProducts();
    }, [selectedCategory, filters, sortOrder, currentPage, searchTerm]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 max-w-[100rem] mx-auto flex flex-col lg:flex-row gap-6 relative">
            <FiltersSection
                filterOptions={filterOptions}
                filters={filters}
                handleCheckboxChange={(e, type) => {
                    const { checked, value } = e.target;
                    setFilters((prev) => ({
                        ...prev,
                        [type]: checked
                            ? [...prev[type], value]
                            : prev[type].filter((item) => item !== value),
                    }));
                }}
                handleOpen={handleOpen}
                open={open}
                handlePriceRangeChange={(e) => {
                    const [minPrice, maxPrice] = e.target.value
                        .split("-")
                        .map(Number);
                    setFilters((prev) => ({
                        ...prev,
                        priceRange: { minPrice, maxPrice },
                    }));
                }}
            />

            <div className="lg:w-4/5 ">
                <div className="w-full">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<IoSearch className="h-5 w-5" />}
                        label="Buscar por Nombre"
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-4 gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Categorias</h2>
                        <div className="flex flex-wrap mt-2 gap-2">
                            <button
                                onClick={() => handleCategoryChange("all")}
                                className={`px-4 py-2 border rounded-lg ${
                                    selectedCategory === "all"
                                        ? "bg-primary-500 text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                Todos
                            </button>
                            {categories?.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() =>
                                        handleCategoryChange(category._id!)
                                    }
                                    className={`px-4 py-2 border rounded-lg ${
                                        selectedCategory === category._id
                                            ? "bg-primary-500 text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="min-w-[200px]">
                        <h3 className="text-xl font-semibold">Ordenar por</h3>
                        <select
                            value={sortOrder}
                            onChange={(e) => handleSetOrder(e.target.value)}
                            className="border p-2 mt-2 rounded-lg w-full"
                        >
                            <option value="price-asc">
                                Precio: Menor a Mayor
                            </option>
                            <option value="price-desc">
                                Precio: Mayor a Menor
                            </option>
                            <option value="name-asc">Nombre: A-Z</option>
                            <option value="name-desc">Nombre: Z-A</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-4">
                        <OrbitProgress size={"large"} />
                    </div>
                ) : products && products.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                        {products.length > 1 && (
                            <Pagination
                                className="mt-4"
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-8">
                        <p className="text-gray-600 text-center mt-4">
                            No encontramos productos que coincidan con tus
                            filtros.
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                            onClick={resetFilters}
                        >
                            Restablecer filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
