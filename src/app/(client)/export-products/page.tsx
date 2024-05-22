import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";
import {CirclePlus} from "@/components/Icons";
import TableExportProduct from "@/components/Tables/TableExportProduct";

const ExportMaterialPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách xuất kho thành phẩm">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/export-products/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Xuất kho</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableExportProduct/>
        </DefaultLayout>
    );
};

export default ExportMaterialPage;