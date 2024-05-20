"use client"
import React, {useState} from 'react';

const Page = () => {
    const [count, setCount] = useState<number>(1);
    const [show, setShow] = useState<boolean>(false);
    const handleClick = (value: number) => {
        setCount(count + value);
    }

    return (
        <div>
            <div>{show ? "MO" : "dong"}</div>
            <button type="button" onClick={() => setShow(!show)}>Count Plus</button>
        </div>
    );
};

export default Page;