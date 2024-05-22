'use client'
import React, {useEffect, useState} from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {ExportMaterialReceipt, ExportProductReceipt} from "@/models/Model";

const EditExportProductReceiptPage = ({params} : {params: {id: string}}) => {
    const [receipt, setReceipt] = useState<ExportProductReceipt>();
    const getData = async () => {
        await fetch(`http://localhost:8000/api/v1/export-products/${params.id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setReceipt(data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        getData();
    }, []);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cập nhật xuất kho thành phẩm"/>
            {/*<MaterialForm material={material}/>*/}
        </DefaultLayout>
    );
};

export default EditExportProductReceiptPage;