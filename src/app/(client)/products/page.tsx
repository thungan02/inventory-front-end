'use client'

import React, {useState} from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TableProduct} from "@/components/Tables";
import TableProviders from "@/components/Tables/TableProvider";
import {CirclePlus} from "@/components/Icons";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";
import Input from "@/components/Inputs/Input";
import Modal from "@/components/Modal/Modal";

const ProductPage = () => {
    const [isOpenExportModal, setIsOpenExportModal] = useState<boolean>(false);
    return (
        <DefaultLayout>
            <Modal isOpen={isOpenExportModal}  title="Xuất excel" onClose={() => setIsOpenExportModal(!isOpenExportModal)}>
                <Input label="Giá sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên sản phẩm"
                       type="number" name="price" min={0} value=""/>
            </Modal>
            <Breadcrumb pageName="Danh sách sản phẩm">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2" onClick={()=>setIsOpenExportModal(true)} >
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/products/new/combo"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Thêm combo</span>
                    </Link>
                    <Link href={"/products/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Thêm sản phẩm</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableProduct/>
        </DefaultLayout>
    );
};

export default ProductPage;