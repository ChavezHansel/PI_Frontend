import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../../components/common/InputField";
import Divider from "../../components/common/Divider";
import { useAuthenticationUser } from "../../hooks/useAuthService";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";
import { useUserContext } from "../../hooks/useUserContext";
import { getUser } from "../../services/authService";

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const { login } = useUserContext();
    const { mutate, isPending } = useAuthenticationUser();
    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate(data, {
            onSuccess: (user) => {
                reset();
                login(user);
                navigate("/");
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
    const getUserWithToken = async (token: string) => {
        const data = await getUser();
        login({ ...data, token });
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("Nova_Token", token);
            getUserWithToken(token);
        }
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-primary-600">
                    Iniciar Sesión
                </h2>
                {isPending ? (
                    <div className="flex justify-center mt-4">
                        <OrbitProgress
                            size={"medium"}
                            color="#2460E2"
                            text=""
                            textColor=""
                        />
                    </div>
                ) : (
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                            autocomplete="current-password"
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
                            "Iniciar Sesión"
                        </button>
                    </form>
                )}

                <Divider />

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FcGoogle className="text-xl mr-2" />
                    Iniciar sesión con Google
                </button>

                <div className="text-center space-y-2">
                    <Link
                        to="/auth/forgot-password"
                        className="text-sm text-primary-500 hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/auth/sign-up"
                            className="text-primary-500 font-semibold hover:underline"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
