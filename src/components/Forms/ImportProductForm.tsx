"use client";
import React, {FormEvent, Fragment, useEffect, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {Trash} from "@/components/Icons";
import Image from "next/image";
import TextArea from "@/components/Inputs/TextArea";
import Alert from "@/components/Alert";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {ImportProductReceipt, ImportProductReceiptDetail, Warehouse} from "@/models/Model";
import SuccessModal from "@/components/Modal/SuccessModal";
import InputDefault from "@/components/Inputs/InputDefault";
import SearchProductModal from "@/components/Modal/SearchProductModal";
import {ProductCart} from "@/models/Product";
import {getData} from "@/services/APIService";
import {API_GET_ALL_WAREHOUSES} from "@/config/api";
import SelectDefault, {Option} from "@/components/Inputs/SelectDefault";

interface Props {
    receipt?: ImportProductReceipt;
    receiptDetails?: ImportProductReceiptDetail[];
}

const columns: string[] = ["Sản phẩm", "Quy cách đóng gói", "Số lượng đặt", "Tồn kho", "Đơn giá", "Thành tiền (đ)", ""];
const ImportProductReceiptForm = ({receipt, receiptDetails} : Props) => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [insertSuccess, setInsertSuccess] = useState<boolean>(false);
    const [showSearchProductModal, setShowSearchProductModal] = useState<boolean>(false);
    const [warehouseOptions, setWarehouseOptions] = useState<Option[]>([])
    const [warehouseSelected, setWarehouseSelected] = useState<string>("")

    // Danh sách nguyên liệu nhập
    const [products, setProducts] = useState<ProductCart[]>([])

    const handleChangeWarehouseOption = (warehouse: string) => {
        setWarehouseSelected(warehouse);
    }

    const handleRemoveProductFromCart = (index: number) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    }

    const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!showSearchProductModal) {
            setShowSearchProductModal(true);
        }
    }

    const handleChangeQuantity = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantityInCart = Number(e.target.value);
        setProducts(updatedProducts);
    }

    const onSubmitMaterialForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('name') as string;
        const provider : string = formData.get('provider') as string;

        if (name.trim() === '') {
            setError('Tên nguyên vật liệu là bắt buộc');
            return;
        }
        if (provider.trim() === '') {
            setError('Nhà cung cấp là bắt buộc');
            return;
        }

        const method = (receipt ? "PUT" : "POST");

        const response = await fetch(`http://localhost:8000/api/v1/products${receipt?.id ? "/" + receipt.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        if (response.ok) {
            setInsertSuccess(true);
        } else {
            console.log("that bai");
        }
    }

    const getAllWarehouses = async () => {
        const data : Warehouse[] = await getData(API_GET_ALL_WAREHOUSES);
        const options : Option[] = data.map(warehouse => ({
            key: warehouse.id.toString(),
            value: `${warehouse.id} - ${warehouse.name}`
        }));
        setWarehouseSelected(options[0].key);
        setWarehouseOptions(options);
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
        getAllWarehouses();
    }, []);

    return (
        <Fragment>
            {
                showSearchProductModal &&
                <SearchProductModal onClose={() => setShowSearchProductModal(false)} products={products} setProducts={setProducts}/>
            }
            {
                insertSuccess && <SuccessModal title="Thành công" message="Thêm nhập kho sản phẩm thành công" onClickLeft={() => {router.back()}} onClickRight={() => {}}/>
            }
            <form onSubmit={onSubmitMaterialForm}>
                {
                    error && <Alert message={error} type="error"/>
                }
                <div
                    className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                    </div>

                    <div className="py-2">
                        <div className="flex items-center"><label className="text-sm font-bold" htmlFor="warehouseId">Kho</label></div>
                        <div className="xsm:col-span-10 sm:col-span-5 flex flex-row items-center justify-center">
                            <SelectDefault onChange={handleChangeWarehouseOption} id="warehouseId" selectedValue={warehouseSelected}
                                           options={warehouseOptions}/>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <Input label="Ngày nhập" feedback="Ngày nhập"
                                   placeholder="Nhập ngày nhập"
                                   type="date" name="receipt_date"
                                   defaultValue={receipt?.receipt_date && new Date(receipt?.receipt_date).toISOString().split('T')[0]}/>

                            <Select label="Loại" name="" defaultValue="NORMAL">
                                <option value="NORMAL">Thông thường</option>
                                <option value="RETURN">Hoàn trả</option>
                            </Select>
                        </div>

                        <div>
                            <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback=""
                                      defaultValue={''}/>
                        </div>
                    </div>

                </div>
                <div
                    className="rounded-sm border border-stroke bg-white mt-5 px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Sản phẩm</span>
                    </div>
                    <div className="flex flex-col gap-2 py-3">
                        <div className="flex flex-row justify-between gap-3 items-center">
                            <InputDefault placeholder="Nhập tên sản phẩm" type="text" name="" value=""
                                          onChange={handleChangeSearchInput}/>
                            <button className="appearance-none rounded px-10 py-1 btn-blue" type="button"
                                    onClick={() => setShowSearchProductModal(true)}>Tìm
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto min-h-50 min-w-[950px]">
                                <thead>
                                <tr className="bg-gray-2 text-left text-xs dark:bg-meta-4">
                                    {
                                        columns.map((column: string, index: number) => (
                                            <th key={"columns-" + index}
                                                className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white border border-[#eee] text-center">
                                                {column}
                                            </th>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody className="text-left">
                                {products.map((product: ProductCart, index: number) => (
                                    <tr key={index} className="text-xs border-b border-[#eee]">
                                        <td className="px-2 py-3 dark:border-strokedark border-[#eee] border">
                                            <div className="flex flex-row gap-2 ">
                                                <div>
                                                    <Image src={"/images/default/no-image.png"} alt="" width={50}
                                                           height={50}
                                                           className="rounded border border-opacity-30 aspect-square object-cover border-[#eee]"/>
                                                </div>
                                                <div>
                                                    <a href={`/products/${product.id}`} target="_blank"
                                                       className="font-bold text-sm text-blue-600 block mb-1">{product.name}</a>
                                                    <div>SKU: {product.sku}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            {product.packing}
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <input defaultValue={product.quantityInCart} min={1} max={product.quantity}
                                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeQuantity(index, event)}
                                                   type="number"
                                                   className="border border-t-body rounded focus:outline-blue-500 py-1 px-3 text-sm  w-full"/>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            {product.quantity}
                                        </td>

                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-end">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.price)}
                                            </h5>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-end">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.price * product.quantityInCart)}
                                            </h5>
                                        </td>

                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <div className="flex items-center space-x-3.5 justify-center">
                                                <button className="hover:text-primary" type="button"
                                                        onClick={() => handleRemoveProductFromCart(index)}><Trash/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <Link href={"/receipts/import-products"}
                          className="btn btn-danger text-sm inline-flex items-center gap-2">
                        <span className="hidden xl:block">Hủy</span>
                    </Link>

                    <button type="submit" className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <span className="hidden xl:block">{receipt ? "Cập nhật" : "Lưu"}</span>
                    </button>
                </div>
            </form>
        </Fragment>

    );
};

export default ImportProductReceiptForm;