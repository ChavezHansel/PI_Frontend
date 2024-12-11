import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../../components/common/InputField";
import Divider from "../../components/common/Divider";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
import { useRegisterUser } from "../../hooks/useAuthService";
import { FcGoogle } from "react-icons/fc";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const { mutate, isPending } = useRegisterUser();
    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                reset();
                toast.success(res.message);
                navigate("/auth/sign-in");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };
    const handleGoogleSignIn = () => {
        const redirectUrl = window.location.pathname;
        window.location.href = `${
            import.meta.env.VITE_BACKEND_URL
        }/auth/google?state=${JSON.stringify({ redirectUrl })}`;
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-primary-600">
                    Regístrate
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        id="name"
                        label="Nombre Completo"
                        type="text"
                        placeholder="Tu nombre"
                        autocomplete="name"
                        register={register("name", {
                            required: "El nombre es obligatorio",
                            minLength: {
                                value: 3,
                                message: "Debe tener al menos 3 caracteres",
                            },
                        })}
                        error={errors.name?.message}
                    />
                    <InputField
                        id="email"
                        label="Correo Electrónico"
                        type="email"
                        placeholder="correo@example.com"
                        autocomplete="email"
                        register={register("email", {
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Correo no válido",
                            },
                        })}
                        error={errors.email?.message}
                    />
                    <InputField
                        id="password"
                        label="Contraseña"
                        type="password"
                        placeholder="********"
                        autocomplete="new-password"
                        register={register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "Debe tener al menos 6 caracteres",
                            },
                        })}
                        error={errors.password?.message}
                    />

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-2 rounded-lg font-semibold transition ${
                            isPending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary-600 text-white hover:bg-primary-700"
                        }`}
                    >
                        {isPending ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                {isPending && (
                    <div className="flex justify-center mt-4">
                        <OrbitProgress
                            size={"medium"}
                            color="#2460E2"
                            text=""
                            textColor=""
                        />
                    </div>
                )}

                <Divider />
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FcGoogle className="text-xl mr-2" />
                    Registrate con Google
                </button>

                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/auth/sign-in"
                            className="text-primary-500 font-semibold hover:underline"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
