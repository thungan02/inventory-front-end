import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";
import {CirclePlus} from "@/components/Icons";
import TableImportMaterial from "@/components/Tables/TableImportMaterial";

const ImportMaterialPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách nhập kho nguyên vật liệu">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/import-materials/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Nhập kho</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableImportMaterial/>
        </DefaultLayout>
    );
};

export default ImportMaterialPage;