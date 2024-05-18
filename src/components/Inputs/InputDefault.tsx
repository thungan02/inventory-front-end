import React, {useId} from 'react';

interface Props {
    placeholder: string;
    type: "text" | "number" | "password" | "email" | "date";
    name: string;
    min?: number;
    max?: number;
    required?: boolean;
    value?: string | number | readonly string[] | undefined;
    onChange?: () => void;
    defaultValue?: string | number | readonly string[] | undefined;
}

const InputDefault = ({
                          placeholder,
                          type,
                          name,
                          min,
                          max,
                          required = true,
                          value,
                          onChange,
                          defaultValue
                      }: Props) => {
    const id = useId();
    return (
        <input onChange={onChange}
               defaultValue={defaultValue}
               value={value}
               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded text-xs py-2 px-4 leading-tight focus:outline-none focus:bg-white"
               name={name} id={id} type={type} placeholder={placeholder} min={min} max={max} required={required}/>
    );
};

export default InputDefault;