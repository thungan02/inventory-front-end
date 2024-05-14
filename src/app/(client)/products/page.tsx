import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TableProduct} from "@/components/Tables";
import TableProviders from "@/components/Tables/TableProvider";
import {CirclePlus} from "@/components/Icons";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";

const ProductPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách sản phẩm">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
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