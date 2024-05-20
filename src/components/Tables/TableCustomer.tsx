"use client"
import {ArrowDownToLine, Eye, Seach, Trash} from "@/components/Icons";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Product} from "@/models/Model";
import {deleteData} from "@/services/APIService";
import {API_DELETE_CUSTOMER} from "@/config/api";
import DeleteModal from "@/components/Modal/DeleteModal";
import DeleteSuccessModal from "@/components/Modal/DeleteSuccessModal";
interface Customer {
    id: number;
    group_customer_id: number;
    name: string;
    birthday: Date;
    gender: boolean;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    note: string;
    created_at: Date;
    updated_at: Date;
}
const TableCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

    const handleClickDeleteCustomer = (customer: Customer) => {
        setCustomer(customer);
        setIsOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setCustomer(null);
    }

    const handleDelete = async () => {
        await deleteData (API_DELETE_CUSTOMER + '/' + customer?.id)
        setIsOpenDeleteModal(false);
        setIsOpenSuccessModal(true);
        getData();
    }
    const getData = async () => {
        await fetch("http://localhost:8000/api/v1/customers")
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCustomers(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    const columns : string[] = ["ID", "Tên", "Sinh nhật", "Giới tính", "Địa chỉ", "Email", "Ghi chú", ""];
    return (
        <Fragment>
            {
                isOpenSuccessModal && <DeleteSuccessModal title="Thành công" message="Xóa khách hàng thành công" onClose={() => setIsOpenSuccessModal(false)}/>
            }
            {
                isOpenDeleteModal && <DeleteModal title={`Xóa khách hàng`} message={`Bạn chắc chắn muốn xóa khách hàng ${customer?.id} - ${customer?.name}. Hành động này sẽ không thể hoàn tác`} onDelete={handleDelete} onClose={handleCloseDeleteModal}/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex gap-3">
                    <div className="w-90 mb-4">
                        <div className="relative border rounded py-1 px-3">
                            <button className="absolute left-2.5 top-1/2 -translate-y-1/2">
                                <Seach/>
                            </button>

                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none text-xs"
                            />
                        </div>
                    </div>
                    <div className="w-40">
                        <select
                            className="rounded w-full bg-gray-50 text-xs py-2 px-2 font-bold focus:outline-none border border-gray-500 text-gray-600">
                            <option selected value={10}>Thêm bộ lọc</option>
                            <option value={20}>Lọc theo tên</option>
                            <option value={20}>Lọc theo số điện thoại</option>
                        </select>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-2 text-left text-xs dark:bg-meta-4">

                            {
                                columns.map((column: string, index: number) => (
                                    <th key={"columns-" + index}
                                        className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white">
                                        {column}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody className="text-left">
                        {customers.map((customer: Customer, key: number) => (
                            <tr key={key} className="text-xs">
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {customer.id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {customer.name}
                                    </h5>
                                    <p className="text-xs">{customer.phone}</p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {new Date(customer.birthday).toLocaleDateString()}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {customer.gender ? "Nam" : "Nữ"}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {customer.address}, {customer.ward}, {customer.district}, {customer.city}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {customer.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {customer.note}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link href={`/customers/${customer.id}`}
                                              className="hover:text-primary"><Eye/></Link>
                                        <button className="hover:text-primary" type="button"
                                                onClick={() => handleClickDeleteCustomer(customer)}><Trash/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-between mt-4 mb-3">
                    <div>
                        <select
                            className="rounded bg-gray-50 text-xs py-2 px-2 font-bold focus:outline-none border border-gray-500 text-gray-600">
                            <option selected value={10}>Hiển thị 10</option>
                            <option value={20}>Hiển thị 20</option>
                            <option value={50}>Hiển thị 50</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <span className="text-xs">Tổng 100</span>
                        </div>
                        <ul>
                            <li className="border-[1px] border-gray-500 rounded">
                                <Link href="/" className="px-3 py-2">1</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default TableCustomer;
