"use client"
import {ArrowDownToLine, Eye, Seach, Trash} from "@/components/Icons";
import {useEffect, useState} from "react";
import Link from "next/link";

interface Order {
    id: number;
    customer_id: number;
    user_id: number;
    price: string;
    total_price: string;
    discount: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

const TableOrder = () => {

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "PROCESSING":
                return "bg-indigo-600 text-indigo-600";
            case "PENDING_PAYMENT":
                return "bg-amber-500 text-amber-500";
            case "PAID":
                return "bg-rose-500 text-rose-500";
            case "SHIPPING":
                return "bg-primary text-primary";
            case "COMPLETE":
                return "bg-success text-success";
            default:
                return "bg-danger text-danger";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "PROCESSING":
                return "Đang xử lý";
            case "PENDING_PAYMENT":
                return "Chờ thanh toán";
            case "PAID":
                return "Đã thanh toán";
            case "SHIPPING":
                return "Đang giao hàng";
            case "COMPLETE":
                return "Hoàn thành";
            default:
                return "Hủy";
        }
    };

    const [orders, setOrders] = useState<Order[]>([]);
    const getData = async () => {
        await fetch("http://localhost:8000/api/v1/orders")
            .then(res => {
                return res.json()
            })
            .then(data => {
                setOrders(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    const columns: string[] = ["ID", "Khách hàng", "Ngày tạo", "Thời gian cập nhật", "Trạng thái", "Ghi chú", ""];
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
                        <option value={20}>Lọc theo mã đơn hàng</option>
                        <option value={20}>Lọc theo tên khách hàng</option>
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
                    {orders.map((order: Order, key: number) => (
                        <tr key={key} className="text-xs">
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {order.id}
                                </p>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <h5 className="font-medium text-black dark:text-white">
                                    {order.customer_id}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </td>

                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                    {new Date(order.updated_at).toLocaleString()}
                                </p>
                            </td>

                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <p
                                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${getStatusStyles(order.status)}`}
                                >
                                    {
                                        getStatusText(order.status)
                                    }
                                </p>
                            </td>


                            <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button className="hover:text-primary"><Eye/></button>
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

export default TableOrder;
