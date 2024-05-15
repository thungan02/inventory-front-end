"use client";
import React, {useRef} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";
import TextArea from "@/components/Inputs/TextArea";
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
                    <Input label="Tên khách hàng" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên khách hàng"
                           type="text" name="name"/>
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                               placeholder="Nhập địa chỉ"
                               type="text"
                               name="order_address"/>

                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập Số điện thoại"
                               type="text"
                              name="order_phone"/>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <Input label="Tên sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Chọn tên sản phẩm"
                               type="text" name="order_product_name"/>
                        <Input label="Khối lượng" feedback="Khối lượng là bắt buộc"
                               placeholder="Nhập khối lượng sản phẩm"
                               type="number"
                               name="weight" min={0}/>

                        <Select label="Quy cách đóng hàng" name="packing">
                            <option value="Hũ thủy tinh" selected={true}>Hũ thủy tinh</option>
                            <option value="Hũ nhựa">Hũ nhựa</option>
                            <option value="Túi zip">Túi zip</option>
                        </Select>

                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <Input label="Đơn giá" feedback="" placeholder=""
                               type="number"
                               name="order_product_price" min={0}/>
                        <Input label="Số lượng" feedback="Số lượng là bắt buộc"
                               placeholder="Nhập số lượng sản phẩm"
                               type="number" name="order_product_quantity" min={0}/>
                        <Select label="Khuyến mãi" name="status">
                            <option value="IN_STOCK" selected={true}>Đang bán</option>
                            <option value="TEMPORARILY_SUSPENDED">Tạm ngưng</option>
                            <option value="OUT_OF_STOCK">Hết hàng</option>
                        </Select>
                    </div>
                </div>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white mt-5 px-5 pb-5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thanh toán</span>
                </div>
                <div className="py-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức nhận hàng
                                </div>
                                <Radio label="Trực tiếp tại cửa hàng" name="shipping"/>
                                <Radio label="Giao hàng" name="shipping"/>
                            </div>
                            <div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức thanh toán
                                </div>
                                <Radio label="Tiền mặt" name="payment"/>
                                <Radio label="Chuyển khoản" name="payment"/>
                                <Radio label="Momo" name="payment"/>
                            </div>
                            <div className="col-span-2">
                                <TextArea label="Ghi chú" placeholder="Nhập ghi chú cho đơn hàng" name="note" feedback=""/>
                            </div>
                        </div>
                        <div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Tổng tiền</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Giảm giá</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Phí vận chuyển</div>
                            <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Thành tiền</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
                <button className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </button>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Đã thanh toán</span>
                </button>

                <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Thanh toán sau</span>
                </button>
            </div>
        </React.Fragment>
    );
};

export default ProductForm;