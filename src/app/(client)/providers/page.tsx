import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TableProduct} from "@/components/Tables";
import TableProvider from "@/components/Tables/TableProvider";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";
import {CirclePlus} from "@/components/Icons";

const ProvidersPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách sản phẩm">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/providers/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Thêm nhà cung cấp</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableProvider/>
        </DefaultLayout>
    );
};

export default ProvidersPage;