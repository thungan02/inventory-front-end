"use client";
import React, {useRef} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";
import TextArea from "@/components/Inputs/TextArea";
import FolderUp from "@/components/Icons/FolderUp";
import Radio from "@/components/Inputs/Radio";

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
                    <Input label="Tên khách hàng" feedback="Tên khách hàng là bắt buộc"
                           placeholder="Nhập tên khách hàng"
                           type="text" name="name"/>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập Số điện thoại"
                               type="text"
                               name="phone"/>

                        <Select label="Nhóm khách hàng" name="customes_group">
                            <option value="Khách hàng thân thiết" selected={true}>Khách hàng thân thiết</option>
                            <option value="Khách hàng tìm năng">Khách hàng tìm năng</option>
                            <option value="Khách hàng vãng lai">Khách hàng vãng lai</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                               placeholder="Nhập địa chỉ"
                               type="text"
                               name="address"/>

                        <Input label="Email" feedback="Email là bắt buộc"
                               placeholder="Nhập địa chỉ"
                               type="email"
                               name="email"/>
                    </div>

                    <div>
                        <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Giới tính</div>
                        <Radio label="Nam" name="gender"/>
                        <Radio label="Nữ" name="gender"/>
                    </div>

                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback=""/>
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