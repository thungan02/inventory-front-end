import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FolderUp from "@/components/Icons/FolderUp";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableInventoryProduct from "@/components/Tables/TableInventoryProduct";

const InventoryProductPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách tồn kho sản phẩm">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                </div>
            </Breadcrumb>
            <TableInventoryProduct/>
        </DefaultLayout>
    );
};

export default InventoryProductPage;