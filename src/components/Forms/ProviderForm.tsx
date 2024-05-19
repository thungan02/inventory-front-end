"use client";
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import TextArea from "@/components/Inputs/TextArea";
import Alert from "@/components/Alert";
import Link from "next/link";
import {Provider} from "@/models/Model";
import {useRouter} from "next/navigation";
import {getData} from "@/services/APIService";
import {District, DistrictResponse, Province, ProvinceResponse, Ward, WardResponse} from "@/models/ProvinceModel";
import {API_GET_ALL_DISTRICTS, API_GET_ALL_PROVINCES, API_GET_ALL_WARDS} from "@/config/api";

interface Props {
    provider?: Provider;
}


const ProviderForm = ({provider}: Props) => {
    const router = useRouter();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvinceName, setSelectedProvinceName] = useState<string>('');
    const [selectedDistrictName, setSelectedDistrictName] = useState<string>('');
    const [selectedWardName, setSelectedWardName] = useState<string>('');

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

    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const onSubmitCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name: string = formData.get('name') as string;
        const phone: string = formData.get('phone') as string;
        const address: string = formData.get('address') as string;
        const email: string = formData.get('email') as string;

        if (name.trim() === '') {
            setError('Mã giảm giá là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        if (phone.trim() === '') {
            setError('Số điện thoại là bắt buộc');
            return;
        }
        if (email.trim() === '') {
            setError('Email là bắt buộc');
            return;
        }
        const method = (provider ? "PUT" : "POST");

        const response = await fetch(`http://localhost:8000/api/v1/providers${provider?.id ? "/" + provider.id : ''}`,
            {
                method: method,
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                },
            }
        );


        if (response.ok) {
            router.push('/providers');
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
        <form onSubmit={onSubmitCreateProduct}>
            {
                error && <Alert message={error} type="error"/>
            }
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="border-b border-opacity-30">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                </div>

                <div className="py-2">
                    <Input label="Tên nhà cung cấp" feedback="Tên nhà cung cấp là bắt buộc"
                           placeholder="Nhập tên nhà cung cấp"
                           defaultValue={provider?.name}
                           type="text" name="name"/>

                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                               placeholder="Nhập số điện thoại"
                               defaultValue={provider?.phone}
                               type="text" name="phone"/>
                        <Input label="Email" feedback="Email là bắt buộc"
                               placeholder="Nhập email nhà cung cấp"
                               defaultValue={provider?.email}
                               type="text" name="email"/>
                    </div>

                    <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                           placeholder="Nhập địa chỉ cụ thể"
                           defaultValue={provider?.address}
                           type="text" name="address"/>

                    <div className="grid grid-cols-3 gap-3">
                        <Select label="Thành phố/Tỉnh" name="city" defaultValue="" onChange={handleChangeProvince}>
                            {
                                provinces.map((province: Province) => (
                                    <option key={province.province_id} value={province.province_id}>{province.province_name}</option>
                                ))
                            }
                        </Select>

                        <Select label="Quận/Huyện" name="district" defaultValue="" onChange={handleChangeDistrict}>
                            <option>Chọn quận/huyện</option>
                            {
                                districts.map((district: District) => (
                                    <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
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

                    <Select label="Trạng thái" name="status" defaultValue="ACTIVE">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="TEMPORARILY_SUSPENDED">TEMPORARILY_SUSPENDED</option>
                        <option value="DELETED">DELETED</option>
                    </Select>


                    <div>
                        <TextArea label="Ghi chú" placeholder="Nhập ghi chú" name="note" feedback=""
                                  defaultValue={provider?.note}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
                <Link href={"/providers"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">Hủy</span>
                </Link>

                <button type="submit" className="btn btn-blue text-sm inline-flex items-center gap-2">
                    <span className="hidden xl:block">{provider ? "Cập nhật" : "Lưu"}</span>
                </button>
            </div>
        </form>
    );
};

export default ProviderForm;