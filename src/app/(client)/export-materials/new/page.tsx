import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ImportMaterialReceiptForm from "@/components/Forms/ImportMaterialForm";
import ExportMaterialReceiptForm from "@/components/Forms/ExportMaterialForm";

const CreateExportMaterialPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Xuất kho nguyên vật liệu"></Breadcrumb>
            <ExportMaterialReceiptForm></ExportMaterialReceiptForm>
        </DefaultLayout>
    );
};

export default CreateExportMaterialPage;