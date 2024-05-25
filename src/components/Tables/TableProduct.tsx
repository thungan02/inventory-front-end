"use client"
import {Eye, Trash} from "@/components/Icons";
import React, {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Category, Product} from "@/models/Model";
import DeleteModal from "@/components/Modal/DeleteModal";
import {deleteData, getData} from "@/services/APIService";
import {API_DELETE_PRODUCT, API_GET_ALL_CATEGORIES, API_GET_ALL_PRODUCTS} from "@/config/api";
import DeleteSuccessModal from "@/components/Modal/DeleteSuccessModal";
import Image from "next/image";
import InputMoneyDefault from "@/components/Inputs/InputMoneyDefault";
import SelectDefault, {Option} from "@/components/Inputs/SelectDefault";
import DropdownInput from "@/components/Inputs/DropdownInput";

const statusOptions : Option[] = [
    {
        key: "",
        value: "Tất cả trạng thái"
    },
    {
        key: "IN_STOCK",
        value: "Đang bán"
    },
    {
        key: "OUT_OF_STOCK",
        value: "Hết hàng"
    },
    {
        key: "TEMPORARILY_SUSPENDED",
        value: "Tạm ngưng"
    },
]

const filteredOptions : Option[] = [
    {
        key: "name",
        value: "Tên sản phẩm"
    },
    {
        key: "sku",
        value: "Mã sản phẩm"
    },
]


const TableProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<Option[]>([{key: '', value: 'Tất cả danh mục'}]);
    const [productToDeleted, setProductToDeleted] = useState<Product | null>(null);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);
    const [statusOptionSelected, setStatusOptionSelected] = useState<string>('');
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<string>('');
    const [filteredOptionSelected, setFilteredOptionSelected] = useState<string>('name');

    const handleChangeStatusOption = (status: string) => {
        setStatusOptionSelected(status);
    }

    const handleChangeCategoryOption = (category: string) => {
        setCategoryOptionSelected(category);
    }

    const handleChangeFilteredOption = (type: string) => {
        setFilteredOptionSelected(type);
    }

    const handleClickDeleteProduct = (product: Product) => {
        setProductToDeleted(product);
        setIsOpenDeleteModal(true);
    }

    const handleDelete = async () => {
        await deleteData (API_DELETE_PRODUCT + '/' + productToDeleted?.id)
        setIsOpenDeleteModal(false);
        setIsOpenSuccessModal(true);
        getProducts(API_GET_ALL_PRODUCTS);
    }

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setProductToDeleted(null);
    }

    const getProducts = async (endpoint: string) => {
        const newProducts : Product[] = await getData(endpoint);
        setProducts(newProducts);
    }

    const getAllCategories = async () => {
        const newCategories : Category[] = await getData(API_GET_ALL_CATEGORIES + "?type=PRODUCT");
        setCategories(newCategories);
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
        getProducts(API_GET_ALL_PRODUCTS + params);
    }

    const categoryToOption = (category: Category) : Option => {
        return {
            key: category.id.toString(),
            value: category.id + ' - ' + category.name
        }
    }

    useEffect(() => {
        getProducts(API_GET_ALL_PRODUCTS);
        getAllCategories();
    }, []);

    useEffect(() => {
        const options = [{key: '', value: 'Tất cả danh mục'}, ...categories.map(categoryToOption)];
        setCategoryOptions(options);
    }, [categories]);

    const columns: string[] = ["Hình ảnh" ,"Mã sản phẩm", "Tên", "Giá", "Khối lượng tịnh", "Quy cách đóng gói", "Số lượng", "Trạng thái", "Thời gian cập nhật", ""];
    return (
        <Fragment>
            {
                isOpenSuccessModal && <DeleteSuccessModal title="Thành công" message="Xóa sản phẩm thành công" onClose={() => setIsOpenSuccessModal(false)}/>
            }
            {
                isOpenDeleteModal && <DeleteModal title={`Xóa sản phẩm`} message={`Bạn chắc chắn muốn xóa sản phẩm ${productToDeleted?.sku} - ${productToDeleted?.name}. Hành động này sẽ không thể hoàn tác`} onDelete={handleDelete} onClose={handleCloseDeleteModal}/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="grid sm:grid-cols-12 gap-3 mb-5">
                    <div className="flex items-center"><label className="text-sm font-bold" htmlFor="searchCategory">Danh mục</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <SelectDefault options={categoryOptions} id="searchCategory" onChange={handleChangeCategoryOption} selectedValue={categoryOptionSelected}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold">Lọc</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <DropdownInput options={filteredOptions} onChangeDropdown={handleChangeFilteredOption}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold" htmlFor="searchStatus">Trạng thái</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <SelectDefault options={statusOptions} id="searchStatus" onChange={handleChangeStatusOption} selectedValue={statusOptionSelected}/>
                    </div>

                    <div className="flex items-center"><label className="text-sm font-bold">Giá</label></div>
                    <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                        <InputMoneyDefault placeholder="Nhập giá thấp nhất" name="price"/>
                        <div className="text-2xl mx-3">-</div>
                        <InputMoneyDefault placeholder="Nhập giá cao nhất" name="price"/>
                    </div>

                    <div className="col-span-full flex flex-row gap-3">
                        <button className="rounded px-4 py-2 text-white text-sm btn-blue" type="button" onClick={handleSearch}>Tìm</button>
                        <button className="btn-cancel rounded px-4 py-2 text-sm" type="button" onClick={handleResetFilters}>Đặt lại</button>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full min-w-[950px] table-auto">
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
                                        className="min-w-[50px] px-2 py-2 text-black dark:text-white border-[#eee] border text-center font-bold">
                                        {column}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody className="text-left ">
                        {products.map((product: Product, key: number) => (
                            <tr key={key} className="text-xs">
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-x">
                                    <div className="flex justify-center">
                                        <input type="checkbox"/>
                                    </div>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <div className="flex justify-center">
                                        <Image src={"/images/default/no-image.png"} alt="" width={50}
                                               height={50}
                                               className="rounded border border-opacity-30 aspect-square object-cover"/>
                                    </div>
                                </td>
                                <td className="w-fit border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {product.sku}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {product.name}
                                    </h5>
                                </td>

                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <h5 className="font-medium text-black dark:text-white text-end">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(product.price)}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <p className="text-black dark:text-white text-end">
                                        {product.weight} g
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <p className="text-black dark:text-white">
                                        {product.packing}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <p className="text-black dark:text-white text-center">
                                        {product.quantity}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l text-xs">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 font-medium ${
                                            product.status === "IN_STOCK"
                                                ? "bg-success text-success"
                                                : product.status === "TEMPORARILY_SUSPENDED"
                                                    ? "bg-danger text-danger"
                                                    : "bg-warning text-warning"
                                        }`}
                                    >
                                        {
                                            product.status === "IN_STOCK" ? "Đang bán" : product.status === "TEMPORARILY_SUSPENDED" ? "Tạm ngưng" : "Hết hàng"
                                        }
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-l">
                                    <p className="text-black dark:text-white">
                                        {new Date(product.updated_at).toLocaleString()}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark border-x">
                                    <div className="flex justify-center items-center space-x-3.5">
                                        <Link href={`/products/${product.id}`}
                                              className="hover:text-primary"><Eye/></Link>
                                        <button className="hover:text-primary" type="button"
                                                onClick={() => handleClickDeleteProduct(product)}><Trash/></button>
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

export default TableProduct;
