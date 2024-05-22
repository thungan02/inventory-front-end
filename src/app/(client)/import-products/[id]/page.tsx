'use client'
import React, {useEffect, useState} from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {ImportProductReceipt} from "@/models/Model";

const EditImportProductReceiptPage = ({params} : {params: {id: string}}) => {
    const [receipt, setReceipt] = useState<ImportProductReceipt>();
    const getData = async () => {
        await fetch(`http://localhost:8000/api/v1/import-products/${params.id}`)
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
            <Breadcrumb pageName="Cập nhật nhập kho thành phẩm"/>
            {/*<MaterialForm material={material}/>*/}
        </DefaultLayout>
    );
};

export default EditImportProductReceiptPage;