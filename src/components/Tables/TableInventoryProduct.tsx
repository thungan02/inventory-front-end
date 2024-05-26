"use client"
import React, {forwardRef, Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {getData} from "@/services/APIService";
import {API_GET_ALL_INVENTORY_PRODUCTS,} from "@/config/api";
import DeleteSuccessModal from "@/components/Modal/DeleteSuccessModal";
import SelectDefault, {Option} from "@/components/Inputs/SelectDefault";
import DropdownInput from "@/components/Inputs/DropdownInput";
import {InventoryProduct} from "@/models/Product";
import Image from "next/image";


const roleOptions : Option[] = [
    {
        key: "",
        value: "Tất cả"
    },
    {
        key: "STOCKER",
        value: "Thủ kho"
    },
    {
        key: "ADMIN",
        value: "Quản lý"
    },
    {
        key: "SUPERADMIN",
        value: "Giám đốc"
    },
    {
        key: "SALES",
        value: "Nhân viên bán hàng"
    },
]

const filteredOptions : Option[] = [
    {
        key: "name",
        value: "Tên khách hàng"
    },
    {
        key: "phone",
        value: "Số điện thoại"
    },
    {
        key: "email",
        value: "Email"
    },
]

const TableInventoryProduct = forwardRef((props, ref) => {
    const [inventories, setInventories] = useState<InventoryProduct[]>([]);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

    const [roleOptionSelected, setRoleOptionSelected] = useState<string>('');
    const [filteredOptionSelected, setFilteredOptionSelected] = useState<string>('name');
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChangeRoleOption = (status: string) => {
        setRoleOptionSelected(status);
    }


    const handleChangeFilteredOption = (type: string) => {
        setFilteredOptionSelected(type);
    }

    const getInventories = async (endpoint: string) => {
        const newEmployees : InventoryProduct[] = await getData(endpoint);
        setInventories(newEmployees);
    }

    const handleResetFilters = () => {
        setRoleOptionSelected('');
        setFilteredOptionSelected('');
        setSearchValue('');
        getInventories(API_GET_ALL_INVENTORY_PRODUCTS)
    }

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (roleOptionSelected !== '') {
            params.append('role', roleOptionSelected);
        }
        if (filteredOptionSelected !== '' && searchValue !== '') {
            params.append(filteredOptionSelected, searchValue);
        }
        getInventories(`${API_GET_ALL_INVENTORY_PRODUCTS}?${params.toString()}`);
    }

    useEffect(() => {
        getInventories(API_GET_ALL_INVENTORY_PRODUCTS)
    }, []);

    const columns : string[] = ["ID", "Sản phẩm", "Kho", "Số lượng tồn kho", "Số lượng lưu kho tối thiểu"];
    return (
        <Fragment>
            {
                isOpenSuccessModal && <DeleteSuccessModal title="Thành công" message="Xóa nhân viên thành công" onClose={() => setIsOpenSuccessModal(false)}/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="grid sm:grid-cols-12 gap-3 mb-5">

                    <div className="flex items-center"><label className="text-sm font-bold">Lọc</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <DropdownInput options={filteredOptions} selectedValue={filteredOptionSelected} onChangeDropdown={handleChangeFilteredOption} inputSearchValue={searchValue} onChangeInputSearch={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold" htmlFor="searchStatus">Kho</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <SelectDefault options={roleOptions} id="searchStatus" onChange={handleChangeRoleOption}
                                       selectedValue={roleOptionSelected}/>
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
                            {
                                columns.map((column: string, index: number) => (
                                    <th key={"columns-" + index}
                                        className="min-w-[50px] px-2 py-2 font-bold text-black dark:text-white border border-[#eee] text-center">
                                        {column}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody className="text-left">
                        {inventories.map((inventory: InventoryProduct, key: number) => (
                            <tr key={key} className="text-xs">
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <p className="text-black dark:text-white text-center">
                                        {inventory.id}
                                    </p>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <div className="flex flex-row gap-2">
                                        <div>
                                            <Image src={"/images/default/no-image.png"} alt=""
                                                   width={50}
                                                   height={50}
                                                   className="rounded border border-opacity-30 aspect-square object-cover"/>
                                        </div>
                                        <div>
                                            <a href={`/products/${inventory.product.id}`} target="_blank"
                                               className="font-bold text-sm text-blue-600 block mb-1">{inventory.product.name}</a>
                                            <div>SKU: {inventory.product.sku}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {`${inventory.warehouse.id} - ${inventory.warehouse.name}`}
                                    </h5>
                                </td>
                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark text-end">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {inventory.quantity_available}
                                    </h5>
                                </td>

                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark text-end">
                                    <p className="text-black dark:text-white">
                                        {inventory.minimum_stock_level}
                                    </p>
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
});

TableInventoryProduct.displayName = 'TableInventoryProduct';

export default TableInventoryProduct;
