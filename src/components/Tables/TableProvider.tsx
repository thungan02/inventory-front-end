"use client"
import {ArrowDownToLine, Eye, Seach, Trash} from "@/components/Icons";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {
    API_DELETE_PRODUCT, API_GET_ALL_MATERIALS,
    API_GET_ALL_PRODUCTS,
    API_GET_ALL_PROVIDERS
} from "@/config/api";
import {deleteData, getData} from "@/services/APIService";
import {Category, Product, Provider} from "@/models/Model";
import DeleteModal from "@/components/Modal/DeleteModal";
import DeleteSuccessModal from "@/components/Modal/DeleteSuccessModal";
import SelectDefault, {Option} from "@/components/Inputs/SelectDefault";
import DropdownInput from "@/components/Inputs/DropdownInput";

const statusOptions : Option[] = [
    {
        key: "",
        value: "Tất cả trạng thái"
    },
    {
        key: "ACTIVE",
        value: "Đang hoạt động"
    },
    {
        key: "DELETED",
        value: "Không hoạt động"
    },
    {
        key: "TEMPORARILY_SUSPENDED",
        value: "Tạm ngưng"
    },
]

const filteredOptions : Option[] = [
    {
        key: "name",
        value: "Tên nhà cung cấp"
    },
    {
        key: "sku",
        value: "Mã nhà cung cấp"
    },
]

const TableProvider = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [provider, setProvider] = useState<Provider | null>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
    const [productToDeleted, setProductToDeleted] = useState<Provider | null>(null);
    const [statusOptionSelected, setStatusOptionSelected] = useState<string>('');
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<string>('');
    const [filteredOptionSelected, setFilteredOptionSelected] = useState<string>('name');
    const [phoneFilter, setPhoneFilter] = useState<string>('');

    const handleChangeStatusOption = (status: string) => {
        setStatusOptionSelected(status);
    }

    const handleChangeCategoryOption = (category: string) => {
        setCategoryOptionSelected(category);
    }

    const handleChangeFilteredOption = (type: string) => {
        setFilteredOptionSelected(type);
    }

    const handleClickDeleteProduct = (provider: Provider) => {
        setProductToDeleted(provider);
        setIsOpenDeleteModal(true);
    }

    const handleDelete = async () => {
        await deleteData (API_DELETE_PRODUCT + '/' + productToDeleted?.id)
        setIsOpenDeleteModal(false);
        setIsOpenSuccessModal(true);
        getProviders(API_GET_ALL_PRODUCTS);
    }

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setProductToDeleted(null);
    }

    const handleClickDeleteProvider = (provider: Provider) => {
        setProductToDeleted(provider);
        setIsOpenDeleteModal(true);
    }

    const getProviders = async (endpoint: string) => {
        const newProviders : Provider[] = await getData(endpoint);
        setProviders(newProviders);
    }


    const handleResetFilters = () => {
        setCategoryOptionSelected('');
        setStatusOptionSelected('');
    }

    const handleSearch = () => {
        let params : string = '';
        if (statusOptionSelected !== '') {
            params += '?status=' + statusOptionSelected;
        }
        getProviders(API_GET_ALL_PROVIDERS + params);
    }
    useEffect(() => {
        getProviders(API_GET_ALL_PROVIDERS)
    }, []);


    const columns : string[] = ["ID", "Tên", "Số điện thoại", "Địa chỉ", "Email", "Ghi chú", "Trạng thái", ""];
    return (
        <Fragment>
            {
                isOpenSuccessModal && <DeleteSuccessModal title="Thành công" message="Xóa sản phẩm thành công" onClose={() => setIsOpenSuccessModal(false)}/>
            }
            {
                isOpenDeleteModal && <DeleteModal title={`Xóa sản phẩm`} message={`Bạn chắc chắn muốn xóa sản phẩm ${provider?.id} - ${provider?.name}. Hành động này sẽ không thể hoàn tác`} onDelete={handleDelete} onClose={handleCloseDeleteModal}/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="grid sm:grid-cols-12 gap-3 mb-5">
                    <div className="flex items-center"><label className="text-sm font-bold" htmlFor="searchStatus">Trạng
                        thái</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <SelectDefault options={statusOptions} id="searchStatus" onChange={handleChangeStatusOption}
                                       selectedValue={statusOptionSelected}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold" htmlFor="searchStatus">Số
                        điện thoại</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <SelectDefault options={statusOptions} id="searchStatus" onChange={handleSearch}
                                       selectedValue={statusOptionSelected}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold">Lọc</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <DropdownInput options={filteredOptions} onChangeDropdown={handleChangeFilteredOption}/>
                    </div>

                    <div className="col-span-full flex flex-row gap-3">
                        <button className="rounded px-4 py-2 text-white text-sm btn-blue" type="button"
                                onClick={handleSearch}>Tìm
                        </button>
                        <button className="btn-cancel rounded px-4 py-2 text-sm" type="button"
                                onClick={handleResetFilters}>Đặt lại
                        </button>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-2 text-left text-xs dark:bg-meta-4">
                            <th className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white border-[#eee] border">
                                <div className="flex justify-center">
                                    <input type="checkbox"/>
                                </div>
                            </th>
                            {
                                columns.map((column: string, index: number) => (
                                    <th key={"columns-" + index}
                                        className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white border-[#eee] border text-center">
                                        {column}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody className="text-left">
                        {providers.map((providers: Provider, key: number) => (
                            <tr key={key} className="text-xs">
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-x">
                                    <div className="flex justify-center">
                                        <input type="checkbox"/>
                                    </div>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white text-center">
                                        {providers.id}
                                    </p>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {providers.name}
                                    </h5>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {providers.phone}
                                    </h5>
                                </td>

                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {providers.address}, {providers.ward}, {providers.district}, {providers.city}
                                    </p>
                                </td>

                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {providers.email}
                                    </p>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {providers.note}
                                    </p>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 font-medium text-xs ${
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
                                    <div className="flex justify-center items-center space-x-3.5">
                                        <Link href={`/providers/${providers.id}`} className="hover:text-primary"><Eye/></Link>
                                        <button className="hover:text-primary" type="button"
                                                onClick={() => handleClickDeleteProvider(providers)}><Trash/></button>
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

export default TableProvider;
