import React, {useId} from 'react';
interface RadioProps {
    label: string;
    name: string;
}
const Radio = ({label, name}: RadioProps) => {
    const id : string = useId();
    return (
        <div className="flex items-center mb-4">
            <input id={id} type="radio" value="" name={name}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    );
};

export default Radio;