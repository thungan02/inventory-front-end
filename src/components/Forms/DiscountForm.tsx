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
import {Discount} from "@/models/Model";
import {useRouter} from "next/navigation";
interface Props {
    discount?: Discount;
}

const ProductForm = ({discount} : Props) => {
    console.log(discount)
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const onSubmitDiscountForm = async (event: FormEvent<HTMLFormElement>) => {
        console.log("flag")
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('coupon_code') as string;
        const unit : string = formData.get('unit') as string;
        const value : string = formData.get('discount_value') as string;
        const minimum_order_value : string = formData.get('minimum_order_value') as string;
        const maximum_discount_value : string = formData.get('maximum_discount_value') as string;
        const valid_start : string = formData.get('valid_start') as string;
        const valid_until : string = formData.get('valid_until') as string;

        if (name.trim() === '') {
            setError('Mã giảm giá là bắt buộc');
            return;
        }
        if (value.trim() === '') {
            setError('Giá trị giảm giá là bắt buộc');
            return;
        }
        if (unit.trim() === '') {
            setError('Đơn vị là bắt buộc');
            return;
        }
        if (minimum_order_value.trim() === '') {
            setError('Giá trị tối thiểu là bắt buộc');
            return;
        }
        if (maximum_discount_value.trim() === '') {
            setError('Giá trị giảm giá tối đa là bắt buộc');
            return;
        }
        if (valid_start.trim() === '') {
            setError('Ngày bắt đầu là bắt buộc');
            return;
        }
        if (valid_until.trim() === '') {
            setError('Ngày kết thúc là bắt buộc');
            return;
        }
        const method = (discount ? "PUT" : "POST");
        const response = await fetch(`http://localhost:8000/api/v1/discounts${discount?.id ? "/" + discount.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                },
            }
        );


        if (response.ok) {
            router.push('/discounts');
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
        <form onSubmit={onSubmitDiscountForm}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Mã giảm giá" feedback="Mã giảm giá là bắt buộc"
                           placeholder="Nhập mã giảm giá"
                           defaultValue={discount?.coupon_code}
                           type="text" name="coupon_code"/>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Giá trị giảm giá" feedback="Giá trị là bắt buộc"
                               placeholder="Nhập giá trị giảm giá"
                               type="text"
                               defaultValue={discount?.discount_value}
                               name="discount_value"/>
                        <Select label="Đơn vị" name="unit" defaultValue="%">
                            <option value="%">%</option>
                            <option value="vnd">vnd</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Đơn hàng tối thiểu" feedback="Đơn hàng tối thiểu là bắt buộc"
                               placeholder="Nhập giá trị đơn hàng đạt tối thiểu"
                               type="number"
                               defaultValue={discount?.minimum_order_value}
                               name="minimum_order_value"/>
                        <Input label="Giảm giá tối đa" feedback="Giảm giá tối đa là bắt buộc"
                               placeholder="Nhập giá trị giảm giá tối đa"
                               type="number"
                               defaultValue={discount?.maximum_discount_value}
                               name="maximum_discount_value"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Ngày bắt đầu" feedback="Ngày bắt đầu là bắt buộc"
                               placeholder="Nhập ngày bắt đầu"
                               defaultValue={new Date().toISOString().split('T')[0]}
                               type="date" name="valid_start"/>
                        <Input label="Ngày kết thúc" feedback="Ngày kết thúc là bắt buộc"
                               placeholder="Ngày kết thúc"
                               defaultValue={discount?.valid_until && new Date().toISOString().split('T')[0]}
                               type="date" name="valid_until"/>
                    </div>

                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback="" defaultValue={discount?.note}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/discounts"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button type="submit" className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">{discount ? "Cập nhật" : "Lưu"}</span>
                </button>
            </div>
        </form>
    );
};

export default ProductForm;