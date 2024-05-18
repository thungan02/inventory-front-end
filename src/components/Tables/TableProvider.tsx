"use client"
import {ArrowDownToLine, Eye, Seach, Trash} from "@/components/Icons";
import {useEffect, useState} from "react";
import Link from "next/link";
interface Provider {
    id: number;
    name: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    phone: string;
    email: string;
    note: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
const TableProduct = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const getData = async () => {
        await fetch("http://localhost:8000/api/v1/providers")
            .then(res => {
                return res.json()
            })
            .then(data => {
                setProviders(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    const columns : string[] = ["ID", "Tên", "Số điện thoại", "Địa chỉ", "Email", "Ghi chú", "Trạng thái", ""];
    return (
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
                    {providers.map((providers: Provider, key: number) => (
                        <tr key={key} className="text-xs">
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {providers.id}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <h5 className="font-medium text-black dark:text-white">
                                    {providers.name}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <h5 className="font-medium text-black dark:text-white">
                                    {providers.phone}
                                </h5>
                            </td>

                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {providers.address} {providers.ward} {providers.district} {providers.city}
                                </p>
                            </td>

                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {providers.email}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {providers.note}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                        providers.status === "ACTIVE"
                                            ? "bg-success text-success"
                                            : providers.status === "TEMPORARILY_SUSPENDED"
                                                ? "bg-danger text-danger"
                                                : "bg-warning text-warning"
                                    }`}
                                >
                                    {
                                        providers.status === "ACTIVE" ? "Đang hoạt động" : providers.status === "TEMPORARILY_SUSPENDED" ? "Tạm ngưng" : "Không hoạt động"
                                    }
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <Link href={`/providers/${providers.id}`} className="hover:text-primary"><Eye/></Link>
                                    <button className="hover:text-primary"><Trash/></button>
                                    {/*<button className="hover:text-primary"><ArrowDownToLine/></button>*/}
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
    );
};

export default TableProduct;
