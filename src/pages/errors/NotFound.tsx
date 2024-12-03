import React from "react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
    resource: string;
}
const NotFound: React.FC<NotFoundProps> = ({ resource }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <h2 className="text-3xl mb-4">Recurso no encontrado</h2>
            <p className="text-lg ">
                No hemos podido encontrar el {resource} que buscas.
            </p>
            <div className="flex justify-center gap-4">
                <button onClick={handleGoBack}>
                    Volver a la página anterior
                </button>
                <a href="/">Volver al inicio</a>
            </div>
        </div>
    );
};

export default NotFound;
