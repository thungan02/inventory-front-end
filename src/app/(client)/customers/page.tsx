import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TableCustomer} from "@/components/Tables";
import FolderUp from "@/components/Icons/FolderUp";
import {CirclePlus} from "@/components/Icons";
import Link from "next/link";

const CustomersPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Danh sách khách hàng">
                <div className="inline-flex gap-4">
                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <FolderUp/>
                        <span className="hidden xl:block">Xuất Excel</span>
                    </button>
                    <Link href={"/customers/new"} className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <CirclePlus/>
                        <span className="hidden xl:block">Thêm khách hàng</span>
                    </Link>
                </div>
            </Breadcrumb>
            <TableCustomer/>
        </DefaultLayout>
    );
};

export default CustomersPage;