import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks/useProductService";
import { Button } from "@material-tailwind/react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import AddCartModal from "../../components/product/AddCartModal";
import { OrbitProgress } from "react-loading-indicators";

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product } = useGetProductById(id!);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [showModal, setShowModal] = useState(false);
    const handleAddToCart = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (product?.images && id) {
            console.log()
            setMainImage(product.images[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="flex justify-center mt-4">
                <OrbitProgress
                    size={"medium"}
                    color="#2460E2"
                    text=""
                    textColor=""
                />
            </div>
        );
    }
    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2 max-h-96 overflow-y-auto justify-start scroll-thin">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Producto ${index}`}
                                className={`${
                                    mainImage == image
                                        ? "border-black"
                                        : " border-gray-300 "
                                } w-full h-20 object-contain rounded-md border cursor-pointer hover:opacity-75`}
                                onMouseEnter={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                    <div className="mb-4">
                        <img
                            src={mainImage}
                            alt="Producto principal"
                            className="w-full h-96 object-contain rounded-md border border-gray-300"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    <h2 className="text-xl font-semibold mb-2">
                        Especificaciones:
                    </h2>
                    <ul className="list-disc list-inside mb-4">
                        {product.specifications.map((spec) => (
                            <li key={spec._id}>
                                <span className="font-medium">{spec.key}:</span>{" "}
                                {spec.value}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold mb-2">Materiales:</h2>
                    <p className="mb-4">{product.materials.join(", ")}</p>

                    <h2 className="text-xl font-semibold mb-2">Variaciones:</h2>
                    <ul className="list-disc list-inside mb-4">
                        {product.variations.map((variation) => (
                            <li key={variation._id}>
                                <span className="font-medium">Color:</span>{" "}
                                {variation.color},
                                <span className="font-medium"> Tamaño:</span>{" "}
                                {variation.size},
                                <span className="font-medium"> Precio:</span> $
                                {variation.price},
                                <span className="font-medium"> Stock:</span>{" "}
                                {variation.stock}
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 mt-6">
                        <Button
                            className="flex items-center gap-2"
                            color="blue"
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart /> Agregar al carrito
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            color="red"
                            onClick={() => console.log("Agregado a favoritos")}
                        >
                            <FaHeart /> Agregar a favoritos
                        </Button>
                    </div>
                </div>
            </div>

            <Button className="mt-6" color="gray" onClick={() => navigate(-1)}>
                Volver
            </Button>
            {showModal && (
                <AddCartModal
                    product={product}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ProductDetails;
