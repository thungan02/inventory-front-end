import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TableProduct} from "@/components/Tables";
import TableMaterials from "@/components/Tables/TableMaterials";
import FolderUp from "@/components/Icons/FolderUp";
import Link from "next/link";
import {CirclePlus} from "@/components/Icons";

const MaterialPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách nguyên vật liệu">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/materials/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Thêm nguyên vật liệu</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableMaterials/>
        </DefaultLayout>
    );
};

export default MaterialPage;