import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useChangePassword } from "../../hooks/useAuthService";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/common/InputField";
import { OrbitProgress } from "react-loading-indicators";

interface FormData {
    password: string;
    confirmPassword: string;
}

const NewPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [tokenValido, setTokenValido] = useState<boolean>(true);
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();
    const { mutate, isPending } = useChangePassword();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (token) {
            mutate(
                { token, password: data.password },
                {
                    onSuccess: () => {
                        toast.success("Contraseña restablecida exitosamente.");
                        reset();
                        navigate("/auth/sign-in");
                    },
                    onError: (error) => {
                        setTokenValido(false);
                        toast.error(error.message);
                    },
                }
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-primary-600">
                    Restablecer Contraseña
                </h2>
                <p className="text-sm text-gray-600 text-center">
                    Ingresa tu nueva contraseña para restablecer tu cuenta.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        id="password"
                        label="Nueva Contraseña"
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
                    <InputField
                        id="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="********"
                        autocomplete="new-password"
                        register={register("confirmPassword", {
                            required: "Debes confirmar tu contraseña",
                            minLength: {
                                value: 6,
                                message: "Debe tener al menos 6 caracteres",
                            },
                        })}
                        error={errors.confirmPassword?.message}
                    />
                    {password && confirmPassword && password !== confirmPassword && (
                        <p className="text-red-500 text-sm">
                            Las contraseñas no coinciden.
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending || password !== confirmPassword}
                        className={`w-full py-2 rounded-lg font-semibold transition ${
                            isPending || password !== confirmPassword
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary-600 text-white hover:bg-primary-700"
                        }`}
                    >
                        {isPending ? "Restableciendo..." : "Restablecer Contraseña"}
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
                {!tokenValido && (
                    <Link
                        to="/auth/forgot-password"
                        className="text-primary-500 text-center w-full flex justify-center p-0 font-semibold hover:underline"
                    >
                        Solicitar un nuevo token
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NewPassword;
