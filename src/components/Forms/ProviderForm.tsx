"use client";
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import TextArea from "@/components/Inputs/TextArea";
import Alert from "@/components/Alert";
import Link from "next/link";
import {Provider} from "@/models/Model";
import {useRouter} from "next/navigation";
interface Props {
    provider?: Provider;
}


const ProviderForm = ({provider}:Props) => {
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const onSubmitCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('name') as string;
        const phone : string = formData.get('phone') as string;
        const address : string = formData.get('address') as string;
        const email : string = formData.get('email') as string;

        if (name.trim() === '') {
            setError('Mã giảm giá là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        if (phone.trim() === '') {
            setError('Số điện thoại là bắt buộc');
            return;
        }
        if (email.trim() === '') {
            setError('Email là bắt buộc');
            return;
        }
        const method = (provider ? "PUT" : "POST");

        const response = await fetch(`http://localhost:8000/api/v1/providers${provider?.id ? "/" + provider.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                },
            }
        );


        if (response.ok) {
            router.push('/providers');
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
        <form onSubmit={onSubmitCreateProduct}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Tên nhà cung cấp" feedback="Tên nhà cung cấp là bắt buộc"
                           placeholder="Nhập tên nhà cung cấp"
                           defaultValue={provider?.name}
                           type="text" name="name"/>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập số điện thoại"
                               defaultValue={provider?.phone}
                               type="text" name="phone"/>
                        <Input label="Email" feedback="Email là bắt buộc"
                               placeholder="Nhập email nhà cung cấp"
                               defaultValue={provider?.email}
                               type="text" name="email"/>
                    </div>

                    <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                           placeholder="Nhập địa chỉ cụ thể"
                           defaultValue={provider?.address}
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

                    <Select label="Trạng thái" name="status" defaultValue="ACTIVE">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="TEMPORARILY_SUSPENDED">TEMPORARILY_SUSPENDED</option>
                        <option value="DELETED">DELETED</option>
                    </Select>


                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback="" defaultValue={provider?.note}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/providers"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button type="submit" className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">{provider ? "Cập nhật" : "Lưu"}</span>
                </button>
            </div>
        </form>
    );
};

export default ProviderForm;