import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../hooks/useUserContext";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
    useChangeCurrentPassword,
    useUpdateProfile,
} from "../../../hooks/useAuthService";
import { toast } from "react-toastify";
import { AccountFormData, SecurityFormData } from "../../../types";

const InformationPersonal: React.FC = () => {
    const { user, setUser } = useUserContext();
    const [activeTab, setActiveTab] = useState("account");

    const {
        register: registerAccount,
        reset: resetAccountForm,
        handleSubmit: handleSubmitAccount,
        formState: { errors: accountErrors },
    } = useForm<AccountFormData>({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            street: user?.address?.street || "",
            city: user?.address?.city || "",
        },
    });

    const {
        register: registerSecurity,
        reset: resetSecurityForm,
        handleSubmit: handleSubmitSecurity,
        formState: { errors: securityErrors },
    } = useForm<SecurityFormData>();

    const { mutate: changePassword, isPending: isPendingChangePassword } =
        useChangeCurrentPassword();
    const { mutate: updateProfile, isPending: isPendingUpdate } =
        useUpdateProfile();

    useEffect(() => {
        if (user) {
            resetAccountForm({
                name: user.name,
                email: user.email,
                street: user.address?.street || "",
                city: user.address?.city || "",
            });
        }
    }, [user, resetAccountForm]);

    const onSubmitAccount = (data: AccountFormData) => {
        updateProfile(data, {
            onSuccess: (res) => {
                toast.success(res.message);
                const updatedUser = {
                    ...user!,
                    name: data.name,
                    email: data.email,
                    address: {
                        street: data.street,
                        city: data.city,
                    },
                };
                setUser(updatedUser);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    const onSubmitSecurity = (data: SecurityFormData) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        changePassword(
            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    resetSecurityForm();
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">
                Configurar Cuenta
            </h2>

            <div className="mt-4 text-gray-600 flex max-w-64 border text-center">
                <button
                    className={`flex items-center gap-2 justify-center p-3 py-2 w-full transition-colors ${
                        activeTab === "account"
                            ? "bg-gray-800 text-white"
                            : "text-black hover:bg-primary-500 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("account")}
                >
                    <FaUser />
                    <span>Cuenta</span>
                </button>
                <button
                    className={`flex items-center gap-2 justify-center p-3 py-2 w-full transition-colors ${
                        activeTab === "security"
                            ? "bg-gray-800 text-white"
                            : "text-black hover:bg-primary-500 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("security")}
                >
                    <FaLock />
                    <span>Seguridad</span>
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "account" && (
                    <form
                        onSubmit={handleSubmitAccount(onSubmitAccount)}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="name" className="block font-medium">
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...registerAccount("name", {
                                    required: "El nombre es obligatorio",
                                })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {accountErrors.name && (
                                <p className="text-red-500">
                                    {accountErrors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...registerAccount("email", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Correo inválido",
                                    },
                                })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {accountErrors.email && (
                                <p className="text-red-500">
                                    {accountErrors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="street"
                                className="block font-medium"
                            >
                                Dirección
                            </label>
                            <input
                                id="street"
                                type="text"
                                {...registerAccount("street")}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block font-medium">
                                Ciudad
                            </label>
                            <input
                                id="city"
                                type="text"
                                {...registerAccount("city")}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPendingUpdate}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex justify-center items-center"
                        >
                            {isPendingUpdate ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                "Actualizar Información"
                            )}
                        </button>
                    </form>
                )}

                {activeTab === "security" && (
                    <form
                        onSubmit={handleSubmitSecurity(onSubmitSecurity)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block font-medium"
                            >
                                Contraseña Actual
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                {...registerSecurity("currentPassword", {
                                    required:
                                        "La contraseña actual es obligatoria",
                                })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {securityErrors.currentPassword && (
                                <p className="text-red-500">
                                    {securityErrors.currentPassword.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block font-medium"
                            >
                                Nueva Contraseña
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                {...registerSecurity("newPassword", {
                                    required:
                                        "La nueva contraseña es obligatoria",
                                })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {securityErrors.newPassword && (
                                <p className="text-red-500">
                                    {securityErrors.newPassword.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block font-medium"
                            >
                                Confirmar Nueva Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...registerSecurity("confirmPassword", {
                                    required:
                                        "Debe confirmar la nueva contraseña",
                                })}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            {securityErrors.confirmPassword && (
                                <p className="text-red-500">
                                    {securityErrors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isPendingChangePassword}
                            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex justify-center items-center"
                        >
                            {isPendingChangePassword ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                "Cambiar Contraseña"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default InformationPersonal;
