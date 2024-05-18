"use client";
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";
import TextArea from "@/components/Inputs/TextArea";
import FolderUp from "@/components/Icons/FolderUp";
import Radio from "@/components/Inputs/Radio";
import Alert from "@/components/Alert";
import Link from "next/link";
import {Warehouse} from "@/models/Model";
import {useRouter} from "next/navigation";

interface Props {
    warehouse?: Warehouse;
}
const WarehouseForm = ({warehouse} : Props) => {
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const onSubmitWarehouseForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('name') as string;
        const address : string = formData.get('address') as string;
        if (name.trim() === '') {
            setError('Mã giảm giá là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        const method = (warehouse ? "PUT" : "POST");
        const response = await fetch(`http://localhost:8000/api/v1/warehouses${warehouse?.id ? "/" + warehouse.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                },
            }
        );


        if (response.ok) {
            router.push('/warehouses');
        } else {
            console.log("that bai");
        }

    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [error]);
    return (
        <form onSubmit={onSubmitWarehouseForm}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Tên kho" feedback="Tên kho là bắt buộc"
                           placeholder="Nhập tên kho"
                           defaultValue={warehouse?.name}
                           type="text" name="name"/>
                    <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                           placeholder="Nhập địa chỉ cụ thể"
                           defaultValue={warehouse?.address}
                           type="text" name="address"/>

                    <div className="grid grid-cols-3 gap-3">
                        <Select label="Thành phố/Tỉnh" name="city" defaultValue="TP Hồ Chí Minh">
                            <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Bến Tre">Bến Tre</option>
                        </Select>

                        <Select label="Quận/Huyện" name="district" defaultValue="Gò Vấp">
                            <option value="Gò Vấp">Gò Vấp</option>
                            <option value="Tân Bình">Tân Bình</option>
                            <option value="Tân Phú">Tân Phú</option>
                        </Select>

                        <Select label="Phường/xã" name="ward" defaultValue="Phường 1">
                            <option value="Phường 1">Phường 1</option>
                            <option value="Phường 2">Phường 2</option>
                            <option value="Phường 3">Phường 3</option>
                        </Select>
                    </div>

                    <Select label="Trạng thái" name="status" defaultValue="ENABLE">
                        <option value="ENABLE">ENABLE</option>
                        <option value="DISABLE">DISABLE</option>
                    </Select>

                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback="" defaultValue={warehouse?.note}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/warehouses"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Lưu</span>
                </button>
            </div>
        </form>
    );
};

export default WarehouseForm;