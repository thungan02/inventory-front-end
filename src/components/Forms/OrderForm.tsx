"use client";
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";
import TextArea from "@/components/Inputs/TextArea";
import Radio from "@/components/Inputs/Radio";
import Alert from "@/components/Alert";
import {useRouter} from "next/navigation";
import SeachInput from "@/components/Inputs/SeachInput";
import Link from "next/link";
import {Order} from "@/models/Model";

interface Props {
    order?: Order;
}

const ProductForm = ({order} : Props) => {
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const onSubmitCreateOrder = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('name') as string;
        const phone : string = formData.get('phone') as string;
        const address : string = formData.get('address') as string;


        if (name.trim() === '') {
            setError('Tên khách hàng là bắt buộc');
            return;
        }
        if (phone.trim() === '') {
            setError('Số điện thoại là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }

        const method = (order ? "PUT" : "POST");
        const response = await fetch('http://localhost:8000/api/v1/orders',
            {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        if (response.ok) {
            router.push('/orders');
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
        <form onSubmit={onSubmitCreateOrder}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>
                <div className="py-2">
                    <Select label="Tên khách hàng" name="name" defaultValue="Nguyễn Thị A">
                        <option value="Nguyễn Thị A" selected={true}>Nguyễn Thị A</option>
                        <option value="Trần Thị Thu">Trần Thị Thu</option>
                        <option value="Nguyễn Hoàng Ân">Nguyễn Hoàng Ân</option>
                    </Select>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                               placeholder="Nhập địa chỉ"
                               defaultValue={order?.address}
                               type="text"
                               name="address"/>

                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập Số điện thoại"
                               type="text"
                               defaultValue={order?.phone}
                               name="phone"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Select label="Tên sản phẩm" name="name" defaultValue="Macca">
                            <option value="Macca" selected={true}>Macca</option>
                            <option value="Nho khô">Nho khô</option>
                            <option value="Táo đỏ">Táo đỏ</option>
                        </Select>

                        <Input label="Quy cách đóng gói" feedback="Quy cách đóng gói là bắt buộc"
                               placeholder="Nhập quy cách đóng gói"
                               defaultValue={order?.packing}
                               type="text"
                               name="address"/>

                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Số lượng" feedback="Số lượng là bắt buộc"
                               placeholder="Nhập số lượng sản phẩm"
                               value=""
                               type="number" name="order_product_quantity" min={0}/>
                        <Select label="Khuyến mãi" name="status" defaultValue="true">
                            <option value="IN_STOCK" selected={true}>Đang bán</option>
                            <option value="TEMPORARILY_SUSPENDED">Tạm ngưng</option>
                            <option value="OUT_OF_STOCK">Hết hàng</option>
                        </Select>
                    </div>

                </div>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white mt-5 px-5 pb-5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thanh toán</span>
                </div>
                <div className="py-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức nhận hàng
                                </div>
                                <Radio label="Trực tiếp tại cửa hàng" name="shipping"/>
                                <Radio label="Giao hàng" name="shipping"/>
                            </div>
                            <div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức thanh toán
                                </div>
                                <Radio label="Tiền mặt" name="payment"/>
                                <Radio label="Chuyển khoản" name="payment"/>
                                <Radio label="Momo" name="payment"/>
                            </div>
                            <div className="col-span-2">
                                <TextArea label="Ghi chú" placeholder="Nhập ghi chú cho đơn hàng" name="note" feedback=""/>
                            </div>
                        </div>
                        <div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Đơn giá</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Số lượng</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Tổng tiền</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Giảm giá</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Phí vận chuyển</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Thành tiền</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/orders"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2" type="submit">
                    <span className="hidden xl:block">{order ? "Đã thanh toán" : "Lưu"}</span>
                </button>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2" type="submit">
                    <span className="hidden xl:block">{order ? "Thanh toán sau" : "Lưu"}</span>
                </button>
            </div>
        </form>
    );
};

export default ProductForm;