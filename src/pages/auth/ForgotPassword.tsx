import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../components/common/InputField";
import { useRequestChangePassword } from "../../hooks/useAuthService";
import { Link, useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

interface FormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const { mutate, isPending } = useRequestChangePassword();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { email } = data;
        mutate(email, {
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-primary-600">
                    Restablecer Contraseña
                </h2>
                <p className="text-sm text-gray-600 text-center">
                    Ingresa tu correo electrónico y te enviaremos un enlace para
                    restablecer tu contraseña.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-2 rounded-lg font-semibold transition ${
                            isPending
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary-600 text-white hover:bg-primary-700"
                        }`}
                    >
                        {isPending ? "Enviando..." : "Enviar"}
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

                <Link
                    to="/auth/sign-in"
                    className="text-primary-500 text-center w-full flex justify-center p-0 font-semibold hover:underline"
                >
                    Inicia sesión aquí
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
