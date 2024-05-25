import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ImportMaterialReceiptForm from "@/components/Forms/ImportMaterialForm";
import ImportProductReceiptForm from "@/components/Forms/ImportProductForm";
import ExportProductReceiptForm from "@/components/Forms/ExportProductForm";

const CreateExportProductPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Xuất kho thành phẩm"></Breadcrumb>
            <ExportProductReceiptForm></ExportProductReceiptForm>
        </DefaultLayout>
    );
};

export default CreateExportProductPage;