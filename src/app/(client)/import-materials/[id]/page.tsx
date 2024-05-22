'use client'
import React, {useEffect, useState} from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {ImportMaterialReceipt, Material} from "@/models/Model";

const EditImportMaterialReceiptPage = ({params} : {params: {id: string}}) => {
    const [receipt, setReceipt] = useState<ImportMaterialReceipt>();
    const getData = async () => {
        await fetch(`http://localhost:8000/api/v1/import-materials/${params.id}`)
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
            <Breadcrumb pageName="Cập nhật nhập kho nguyên vật liệu"/>
            {/*<MaterialForm material={material}/>*/}
        </DefaultLayout>
    );
};

export default EditImportMaterialReceiptPage;