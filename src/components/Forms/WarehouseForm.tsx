"use client";
import React, {FormEvent, Fragment, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {ImageUp} from "@/components/Icons";
import TextArea from "@/components/Inputs/TextArea";
import FolderUp from "@/components/Icons/FolderUp";
import Radio from "@/components/Inputs/Radio";
import Alert from "@/components/Alert";
import Link from "next/link";
import {Warehouse} from "@/models/Model";
import {usePathname, useRouter} from "next/navigation";
import {District, DistrictResponse, Province, ProvinceResponse, Ward, WardResponse} from "@/models/ProvinceModel";
import {getData} from "@/services/APIService";
import {API_GET_ALL_DISTRICTS, API_GET_ALL_PROVINCES, API_GET_ALL_WARDS} from "@/config/api";
import SuccessModal from "@/components/Modal/SuccessModal";

interface Props {
    warehouse?: Warehouse;
}
const WarehouseForm = ({warehouse} : Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvinceName, setSelectedProvinceName] = useState<string>('');
    const [selectedDistrictName, setSelectedDistrictName] = useState<string>('');
    const [selectedWardName, setSelectedWardName] = useState<string>('');
    const [insertSuccess, setInsertSuccess] = useState<boolean>(false);

    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const handleChangeProvince = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = provinces.find(province => province.province_id === selectedId)?.province_name || '';
        setSelectedProvinceName(selectedName);

        if (selectedId) {
            try {
                const districtsResult : DistrictResponse = await getData(API_GET_ALL_DISTRICTS + '/' + selectedId);
                setDistricts(districtsResult.results);
                setWards([])
            } catch (err) {
                console.log(err);
            }
        } else {
            setDistricts([]);
            setWards([])
        }
    }

    const handleChangeDistrict = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = districts.find(district => district.district_id === selectedId)?.district_name || '';
        setSelectedDistrictName(selectedName);

        if (selectedId) {
            try {
                const wardsResult : WardResponse = await getData(API_GET_ALL_WARDS + '/' + selectedId);
                setWards(wardsResult.results);
            } catch (err) {
                console.log(err);
            }
        } else {
            setWards([])
        }
    }
    const onSubmitWarehouseForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name : string = formData.get('name') as string;
        const address : string = formData.get('address') as string;
        if (name.trim() === '') {
            setError('Mã giảm giá là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        formData.set('city', selectedProvinceName);
        formData.set('district', selectedDistrictName);

        const wardId = formData.get('ward') as string;
        const selectedWardName = wards.find(ward => ward.ward_id === wardId)?.ward_name || '';
        formData.set('ward', selectedWardName);

        console.log(JSON.stringify(Object.fromEntries(formData)));


        const method = (warehouse ? "PUT" : "POST");
        const response = await fetch(`http://localhost:8000/api/v1/warehouses${warehouse?.id ? "/" + warehouse.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                },
            }
        );


        if (response.ok) {
            setInsertSuccess(true);
        } else {
            console.log("that bai");
        }

    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        const getAllProvinces = async () => {
            const result: ProvinceResponse = await getData(API_GET_ALL_PROVINCES);
            setProvinces(result.results);
            console.log(result.results);
        }

        getAllProvinces();
    }, []);
    return (
        <Fragment>
            {
                insertSuccess && (
                    pathname.toString().includes('new') ?
                        <SuccessModal title="Thành công" message="Thêm nhà kho thành công" onClickLeft={() => {router.back()}} onClickRight={() => {}}/> :
                        <SuccessModal title="Thành công" message="Cập nhật nhà kho thành công" onClickLeft={() => {router.back()}} onClickRight={() => {}}/>
                )
            }
            <form onSubmit={onSubmitWarehouseForm}>
                {
                    error && <Alert message={error} type="error"/>
                }
                <div
                    className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                    </div>

                    <div className="py-2">
                        <Input label="Tên kho" feedback="Tên kho là bắt buộc"
                               placeholder="Nhập tên kho"
                               defaultValue={warehouse?.name}
                               type="text" name="name"/>
                        <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                               placeholder="Nhập địa chỉ cụ thể"
                               defaultValue={warehouse?.address}
                               type="text" name="address"/>

                        <div className="grid grid-cols-3 gap-3">
                            <Select label="Thành phố/Tỉnh" name="city" defaultValue="" onChange={handleChangeProvince}>
                                <option>Chọn thành phố/tỉnh</option>
                                {
                                    provinces.map((province: Province) => (
                                        <option key={province.province_id}
                                                value={province.province_id}>{province.province_name}</option>
                                    ))
                                }
                            </Select>

                            <Select label="Quận/Huyện" name="district" defaultValue="" onChange={handleChangeDistrict}>
                                <option>Chọn quận/huyện</option>
                                {
                                    districts.map((district: District) => (
                                        <option key={district.district_id}
                                                value={district.district_id}>{district.district_name}</option>
                                    ))
                                }
                            </Select>

                            <Select label="Phường/xã" name="ward" defaultValue="Phường 1">
                                <option>Chọn xã/phường</option>
                                {
                                    wards.map((ward: Ward) => (
                                        <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                                    ))
                                }
                            </Select>
                        </div>

                        <Select label="Trạng thái" name="status" defaultValue="ENABLE">
                            <option value="ENABLE">Đang hoạt động</option>
                            <option value="DISABLE">Ngưng hoạt động</option>
                        </Select>

                        <div>
                            <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback=""
                                      defaultValue={warehouse?.note}/>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-end gap-3">
                    <Link href={"/warehouses"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                        <span className="hidden xl:block">Hủy</span>
                    </Link>

                    <button className="btn btn-blue text-sm inline-flex items-center gap-2">
                        <span className="hidden xl:block">Lưu</span>
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default WarehouseForm;