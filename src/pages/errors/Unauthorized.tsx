import { Link } from "react-router-dom";

const UnAuthorized = () => {
    return (
        <div>
            <h1>¡Acceso No Autorizado!</h1>
            <p>
                No tienes permiso para acceder a esta página. Por favor, regresa
                a una página válida.
            </p>
            <Link to={"/"}>Volver al Inicio</Link>
            <p>"Cuando intentas entrar donde no debes..."</p>
        </div>
    );
};

export default UnAuthorized;
