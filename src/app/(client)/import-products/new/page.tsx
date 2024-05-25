import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ImportMaterialReceiptForm from "@/components/Forms/ImportMaterialForm";
import ImportProductReceiptForm from "@/components/Forms/ImportProductForm";

const CreateImportProductPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Nhập kho thành phẩm"></Breadcrumb>
            <ImportProductReceiptForm></ImportProductReceiptForm>
        </DefaultLayout>
    );
};

export default CreateImportProductPage;