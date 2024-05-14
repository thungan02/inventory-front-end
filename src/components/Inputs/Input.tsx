import React from 'react';

interface InputProps {
    label: string;
    feedback: string;
    placeholder: string;
    type: "text" | "number" | "password" | "email";
    id: string;
    name: string;
    error?: boolean;
    min?: number;
    max?: number;
    required?: boolean;

}
const Input = ({label, feedback, placeholder, type, id, name, error = false, min, max, required=true}:InputProps) => {
    return (
        <div className="w-full mb-6">
            <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2"
                   htmlFor={id}>
                {label}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded text-xs py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name={name} id={id} type={type} placeholder={placeholder} min={min} max={max} required={required}/>
            <p className={`text-red-500 text-xs italic text-danger ${error ? "block" : "hidden"}`}>{feedback}</p>
        </div>
    );
};

export default Input;