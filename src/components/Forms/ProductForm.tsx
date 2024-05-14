"use client";
import React, {useRef} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";

const ProductForm = () => {
    const inputProductImage = useRef<HTMLInputElement>(null);
    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    return (
        <React.Fragment>
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Tên sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên sản phẩm"
                           type="text" id="product_name" name="name"/>
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Giá sản phẩm" feedback="Giá là bắt buộc" placeholder="Nhập giá sản phẩm"
                               type="number"
                               id="product_price" name="price" min={0}/>
                        <Input label="Số lượng" feedback="Số lượng hiện có là bắt buộc"
                               placeholder="Nhập số lượng sản phẩm"
                               type="number" id="product_quantity" name="quantity" min={0}/>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <Input label="Khối lượng" feedback="Khối lượng là bắt buộc"
                               placeholder="Nhập khối lượng sản phẩm"
                               type="number"
                               id="product_weight" name="weight" min={0}/>

                        <Select label="Quy cách đóng hàng" name="packing">
                            <option value="Hũ thủy tinh" selected={true}>Hũ thủy tinh</option>
                            <option value="Hũ nhựa">Hũ nhựa</option>
                            <option value="Túi zip">Túi zip</option>
                        </Select>

                        <Select label="Trạng thái" name="status">
                            <option value="IN_STOCK" selected={true}>Đang bán</option>
                            <option value="TEMPORARILY_SUSPENDED">Tạm ngưng</option>
                            <option value="OUT_OF_STOCK">Hết hàng</option>
                        </Select>
                    </div>
                </div>

            </div>
            <div
                className="rounded-sm border border-stroke bg-white mt-5 px-5 pb-5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <div className="border-b border-opacity-30 ">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Hình ảnh sản phẩm</span>
                </div>
                <div className="border border-dotted rounded mt-5 py-5">
                    <div className="flex flex-col items-center">
                        <input type="file" ref={inputProductImage} className="hidden" accept="image/*"/>
                        <ImageUp/>
                        <span className="text-blue-700 font-bold text-sm py-2 cursor-pointer" onClick={openInputImage}>Thêm ảnh</span>
                        <span className="text-blue-700 font-bold text-xs cursor-pointer">Thêm  từ URL <span
                            className="text-body">(Hình ảnh/Video)</span></span>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
                <button className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </button>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Lưu</span>
                </button>
            </div>
        </React.Fragment>
    );
};

export default ProductForm;