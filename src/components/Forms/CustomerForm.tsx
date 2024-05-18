"use client";
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import TextArea from "@/components/Inputs/TextArea";
import Radio from "@/components/Inputs/Radio";
import Alert from "@/components/Alert";
import Link from "next/link";
import {Customer, GroupCustomer} from "@/models/Model";
import {useRouter} from "next/navigation";

interface Props {
    customer?: Customer;
}

const CustomerForm = ({customer}: Props) => {
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const [groups, setGroups] = useState<GroupCustomer[]>();
    const getAllGroupCustomers = async () => {
        await fetch(`http://localhost:8000/api/v1/group-customers`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setGroups(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const onSubmitCustomerForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name: string = formData.get('name') as string;
        const email: string = formData.get('email') as string;
        const phone: string = formData.get('phone') as string;
        const address: string = formData.get('address') as string;

        if (name.trim() === '') {
            setError('Tên khách hàng là bắt buộc');
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
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        const method = (customer ? "PUT" : "POST");

        const response = await fetch(`http://localhost:8000/api/v1/customers${customer ? "/" + customer.id : ''} `,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                }
            }
        );


        if (response.ok) {
            router.push('/customers');
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

    useEffect(() => {
        getAllGroupCustomers();
    }, []);

    return (
        <form onSubmit={onSubmitCustomerForm}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Tên khách hàng" feedback="Tên khách hàng là bắt buộc"
                           placeholder="Nhập tên khách hàng"
                           defaultValue={customer?.name}
                           type="text" name="name"/>

                    <Input label="Sinh nhật" feedback="Sinh nhật"
                           placeholder="Nhập sinh nhật"
                           type="date" name="birthday"
                           defaultValue={customer?.birthday && new Date(customer.birthday).toISOString().split('T')[0]}/>

                    <Input label="Email" feedback="Email là bắt buộc"
                           placeholder="Nhập email"
                           defaultValue={customer?.email}
                           type="email"
                           name="email"/>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập Số điện thoại"
                               defaultValue={customer?.phone}
                               type="text"
                               name="phone"/>

                        <Select label="Nhóm khách hàng" name="group_customer_id" defaultValue="Khách hàng thân thiết">
                            {
                                groups?.map((group: GroupCustomer) => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))
                            }
                        </Select>
                    </div>

                    <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                           placeholder="Nhập địa chỉ cụ thể"
                           type="text"
                           defaultValue={customer?.address}
                           name="address"/>

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

                    <div>
                        <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Giới tính</div>
                        <Radio label="Nam" name="gender" value={1} defaultChecked={customer ? Boolean(customer?.gender) : true}/>
                        <Radio label="Nữ" name="gender" value={0} defaultChecked={customer ? !Boolean(customer?.gender) : false}/>
                    </div>

                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback=""
                                  defaultValue={customer?.note}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/customers"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button type="submit" className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">{customer ? "Cập nhật" : "Lưu"}</span>
                </button>
            </div>
        </form>
    );
};

export default CustomerForm;