import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    autocomplete?: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    autocomplete,
    register,
    error,
}) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            {type == "password" ? (
                <div className="relative">
                    <input
                        id={id}
                        type={passwordShown ? "text" : "password"}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
                        {...register}
                        className={`outline-none w-full mt-1 px-4 py-2 border ${
                            error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-primary-400"
                        } rounded-lg focus:outline-none focus:ring-1`}
                    />
                    <i onClick={togglePasswordVisiblity} className="absolute  top-3 right-2">
                        {passwordShown ? (
                            <FaEyeSlash className="h-5 w-5" />
                        ) : (
                            <FaEye className="h-5 w-5" />
                        )}
                    </i>
                </div>
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                    {...register}
                    className={`outline-none w-full mt-1 px-4 py-2 border ${
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-primary-400"
                    } rounded-lg focus:outline-none focus:ring-1`}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default InputField;
