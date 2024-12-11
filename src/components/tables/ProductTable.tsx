import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { FaBan, FaCheckCircle, FaSearch } from "react-icons/fa";
import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import ArrowIcon from "../common/ArrowIcon";

type ProductTableProps = {
    data: Product[];
};
import { MdEdit, MdDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeAvailability } from "../../hooks/useProductService";
import { toast } from "react-toastify";

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterProducts, setFilterProducts] = useState<Product[]>(data);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");
    const [openMenu, setOpenMenu] = useState(false);
    const [openMenu2, setOpenMenu2] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    product.category.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (activeFilter !== "all") {
            const isActive = activeFilter === "active";
            filtered = filtered.filter(
                (product) => product.isActive === isActive
            );
        }

        if (categoryFilter !== "all") {
            filtered = filtered.filter(
                (product) => product.category.name === categoryFilter
            );
        }

        if (sortBy === "name") {
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "stock") {
            filtered = filtered.sort(
                (a, b) =>
                    a.variations.reduce((acc, v) => acc + v.stock, 0) -
                    b.variations.reduce((acc, v) => acc + v.stock, 0)
            );
        }

        setFilterProducts(filtered);
    }, [searchTerm, activeFilter, categoryFilter, sortBy, data]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleActiveChange = (value: string) => {
        setActiveFilter(value);
    };

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const { mutate: changeAvailability } = useChangeAvailability();
    const handleToggleStatus = (product: Product) => {
        changeAvailability(
            { id: product._id, isActive: !product.isActive },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                    toast.success("Cambio de estado.");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center flex-wrap mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2 border w-full lg:w-auto rounded-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre"
                        className="px-4 py-2 w-full lg:min-w-[20rem] outline-none text-black rounded-lg"
                    />
                    <FaSearch className="text-gray-600 w-10 flex justify-center items-center" />
                </div>

                <div className="flex gap-4">
                    <Menu>
                        <MenuHandler>
                            <Button className="bg-primary-500">Filtros</Button>
                        </MenuHandler>
                        <MenuList>
                            <Menu
                                placement="right-start"
                                open={openMenu}
                                handler={setOpenMenu}
                                allowHover
                                offset={15}
                            >
                                <MenuHandler className="flex items-center justify-between">
                                    <MenuItem>
                                        Categoria
                                        <ArrowIcon
                                            id={1}
                                            open={openMenu ? 1 : 0}
                                        />
                                    </MenuItem>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem
                                        value="all"
                                        onClick={() =>
                                            handleCategoryChange("all")
                                        }
                                    >
                                        Todas las categorías
                                    </MenuItem>
                                    {[
                                        ...new Set(
                                            data.map(
                                                (product) =>
                                                    product.category.name
                                            )
                                        ),
                                    ].map((category) => (
                                        <MenuItem
                                            key={category}
                                            value={category}
                                            onClick={() =>
                                                handleCategoryChange(category)
                                            }
                                        >
                                            {category}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>

                            <Menu
                                placement="right-start"
                                open={openMenu2}
                                handler={setOpenMenu2}
                                allowHover
                                offset={15}
                            >
                                <MenuHandler className="flex items-center justify-between">
                                    <MenuItem>
                                        Estado
                                        <ArrowIcon
                                            id={2}
                                            open={openMenu2 ? 2 : 0}
                                        />
                                    </MenuItem>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem
                                        onClick={() =>
                                            handleActiveChange("all")
                                        }
                                    >
                                        Todos
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleActiveChange("active")
                                        }
                                    >
                                        Activos
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleActiveChange("inactive")
                                        }
                                    >
                                        Inactivos
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuHandler>
                            <Button className="bg-primary-500">
                                Ordenar Por
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => handleSortChange("name")}>
                                Nombre
                            </MenuItem>
                            <MenuItem onClick={() => handleSortChange("stock")}>
                                Stock
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>

            <div className="max-h-[600px] overflow-auto y-scroll  border border-gray-300">
                <table className="bg-white w-full min-w-[600px] border-collapse shadow-md rounded-lg">
                    <thead className="bg-primary-600 text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">
                                Categoría
                            </th>
                            <th className="px-6 py-3 text-sm text-center font-semibold">
                                Precio Mínimo
                            </th>
                            <th className="px-6 py-3 text-sm text-center font-semibold">
                                Stock Total
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">
                                Estado
                            </th>
                            <th className="w-auto">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProducts.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No se encontraron productos que coincidan
                                    con los criterios de búsqueda.
                                </td>
                            </tr>
                        ) : (
                            filterProducts.map((product) => {
                                const minPrice = Math.min(
                                    ...product.variations.map((v) => v.price)
                                );
                                const totalStock = product.variations.reduce(
                                    (acc, v) => acc + v.stock,
                                    0
                                );

                                return (
                                    <tr
                                        key={product._id}
                                        className="border-b hover:bg-gray-50 transition-all"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            <Link
                                                to={`/protected/products/${product._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-600">
                                            {product.category.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-800">
                                            S/{minPrice.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-800">
                                            {totalStock}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white ${
                                                    product.isActive
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {product.isActive
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </td>
                                        <td className="w-auto text-sm">
                                            <div className="flex items-center justify-center w-full gap-2">
                                                <Link
                                                    to={`edit/${product._id}`}
                                                    className="px-0.5  py-1 text-xl"
                                                >
                                                    <MdEdit />
                                                </Link>
                                                <Link
                                                    to={`edit/${product._id}`}
                                                    className="px-0.5  py-1 text-xl"
                                                >
                                                    <MdDelete />
                                                </Link>
                                                <button
                                                    className={`px-0.5  p-1 text-xl`}
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            product
                                                        )
                                                    }
                                                >
                                                    {product.isActive ? (
                                                        <FaBan />
                                                    ) : (
                                                        <FaCheckCircle />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
