import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FolderUp from "@/components/Icons/FolderUp";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableInventoryMaterial from "@/components/Tables/TableInventoryMaterial";

const InventoryMaterialPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách tồn kho nguyên vật liệu">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                </div>
            </Breadcrumb>
            <TableInventoryMaterial/>
        </DefaultLayout>
    );
};

export default InventoryMaterialPage;