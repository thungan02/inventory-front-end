"use client";
import React, {FormEvent, Fragment, useEffect, useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import TextArea from "@/components/Inputs/TextArea";
import Radio from "@/components/Inputs/Radio";
import Alert from "@/components/Alert";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {Order, Product} from "@/models/Model";
import InputDefault from "@/components/Inputs/InputDefault";
import {Trash} from "@/components/Icons";
import Image from "next/image";
import {District, DistrictResponse, Province, ProvinceResponse, Ward, WardResponse} from "@/models/ProvinceModel";
import {getData} from "@/services/APIService";
import {API_GET_ALL_DISTRICTS, API_GET_ALL_PRODUCTS, API_GET_ALL_PROVINCES, API_GET_ALL_WARDS} from "@/config/api";
import SuccessModal from "@/components/Modal/SuccessModal";
import ContainerModal from "@/components/Modal/ContainerModal";
import HeaderModal from "@/components/Modal/HeaderModal";
import BodyModal from "@/components/Modal/BodyModal";
import FooterModal from "@/components/Modal/FooterModal";

interface Props {
    order?: Order;
}

let productsExample: Product[] = [
    {
        id: 1,
        sku: "MK01",
        name: "Macca",
        packing: "Hũ thủy tinh",
        price: 159000,
        quantity: 15,
        weight: 10,
        description: "Sản phẩm được nhập từ Úc có giấy tờ công bố đầy đủ",
        status: "IN_STOCK",
        created_at: new Date("2024-05-15T22:33:25.000000Z"),
        updated_at: new Date("2024-05-15T22:33:25.000000Z")
    },
    {
        id: 2,
        sku: "MH02",
        name: "Hạnh nhân",
        packing: "Túi zip",
        price: 210000,
        quantity: 35,
        weight: 500,
        description: "Sản phẩm được nhập từ Úc",
        status: "IN_STOCK",
        created_at: new Date("2024-05-15T22:33:25.000000Z"),
        updated_at: new Date("2024-05-15T22:33:25.000000Z")
    },
    {
        id: 3,
        sku: "MH03",
        name: "Óc chó vàng",
        packing: "Hủ nhựa",
        price: 255000,
        quantity: 6,
        weight: 400,
        description: "Sản phẩm được nhập từ Úc",
        status: "IN_STOCK",
        created_at: new Date("2024-05-15T22:33:25.000000Z"),
        updated_at: new Date("2024-05-15T22:33:25.000000Z")
    },
];
const modalColumns: string[] = ["Sản phẩm", "Quy cách đóng gói", "Số lượng", "Sẵn có", "Giá (đ)", "Thành tiền (đ)"];
const columns: string[] = ["Sản phẩm", "Quy cách đóng gói", "Số lượng", "Sẵn có", "Giá (đ)", "Thành tiền (đ)", ""];

const OrderForm = ({order}: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const inputProductImage = useRef<HTMLInputElement>(null);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [selectedDistrict, setSelectedDistrict] = useState<District>();
    const [selectedWard, setSelectedWard] = useState<Ward>();

    const [showSearchProductModal, setShowSearchProductModal] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchInputInModal, setSearchInputInModal] = useState<string>('')
    const searchInputInModalRef = useRef<HTMLInputElement>(null);

    // Modal products
    const [productName, setProductName] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([])

    const handleSearchProductByProductName = async () => {
        if (productName !== '') {
            const data: Product[] = await getData(API_GET_ALL_PRODUCTS + "?name=" + productName);
            setProducts(data)
        }

    }


    useEffect(() => {
        const initialAddress = async () => {
            if (order) {
                const provinceResult: ProvinceResponse = await getData(API_GET_ALL_PROVINCES);
                setProvinces(provinceResult.results);

                const province = provinceResult.results.find(province => province.province_name === order.city);
                setSelectedProvince(province);

                const districtsResult: DistrictResponse = await getData(API_GET_ALL_DISTRICTS + '/' + province?.province_id);
                setDistricts(districtsResult.results);

                const district = districtsResult.results.find(district => district.district_name === order.district);
                setSelectedDistrict(district);

                const wardsResult: WardResponse = await getData(API_GET_ALL_WARDS + '/' + district?.district_id);
                setWards(wardsResult.results);

                const ward = wardsResult.results.find(ward => ward.ward_name === order.ward);
                setSelectedWard(ward);
            }
        }
        initialAddress();
    }, [order]);

    const handleChangeProvince = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selected = provinces.find(province => province.province_id === selectedId);
        setSelectedProvince(selected);

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
        const selected = districts.find(district => district.district_id === selectedId);
        setSelectedDistrict(selected);

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

    const handleChangeWard = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selected = wards.find(ward => ward.ward_id === selectedId);
        setSelectedWard(selected);
    }

    const handleChangeSearchInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (!showSearchProductModal && searchInputInModalRef.current) {
            setShowSearchProductModal(true);
            setSearchInputInModal(event.target.value);
            searchInputInModalRef.current.focus();
        }
    }
    const openInputImage = () => {
        inputProductImage.current?.click();
    }
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [insertSuccess, setInsertSuccess] = useState<boolean>(false);

    const onSubmitOrderForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name: string = formData.get('name') as string;
        const phone: string = formData.get('phone') as string;
        const address: string = formData.get('address') as string;


        if (name.trim() === '') {
            setError('Tên khách hàng là bắt buộc');
            return;
        }
        if (phone.trim() === '') {
            setError('Số điện thoại là bắt buộc');
            return;
        }
        if (address.trim() === '') {
            setError('Địa chỉ là bắt buộc');
            return;
        }
        if (selectedProvince) {
            formData.set('city', selectedProvince.province_name);
        }
        if (selectedDistrict) {
            formData.set('district', selectedDistrict.district_name);
        }
        if (selectedWard) {
            formData.set('ward', selectedWard.ward_name);
        }

        const method = (order ? "PUT" : "POST");
        const response = await fetch('http://localhost:8000/api/v1/orders',
            {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'content-type': 'application/json'
                }
            }
        );

        if (response.ok) {
            router.push('/orders');
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
                showSearchProductModal && (
                    <ContainerModal>
                        <HeaderModal title="Tìm kiếm sản phẩm" onClose={() => setShowSearchProductModal(false)}/>
                        <BodyModal>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-11">
                                    <InputDefault placeholder="Nhập tên" ref={searchInputInModalRef}
                                                  value={productName} type="text" name="search"
                                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                                                  />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearchProductByProductName}
                                        className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-1 px-4 rounded">Tìm
                                    </button>
                                </div>
                            </div>
                            <div className="pt-5">
                            <div className="overflow-x-auto min-w-[900px]">
                                    <table className="w-full table-auto">
                                        <thead>
                                        <tr className="bg-gray-2 text-left text-xs dark:bg-meta-4">
                                            <th className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white border-[#eee] border">
                                                <div className="flex justify-center">
                                                    <input type="checkbox"/>
                                                </div>
                                            </th>
                                            {
                                                modalColumns.map((modalColumns: string, index: number) => (
                                                    <th key={"columns-" + index}
                                                        className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white  border-[#eee] border text-center">
                                                        {modalColumns}
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                        </thead>
                                        <tbody className="text-left">
                                        {products.map((product: Product, key: number) => (
                                            <tr key={key} className="text-xs border border-[#eee]">
                                            <td className="border border-[#eee] px-2 py-3 dark:border-strokedark border-x">
                                                    <div className="flex justify-center">
                                                        <input type="checkbox"/>
                                                    </div>
                                                </td>
                                                <td className="border border-[#eee] px-2 py-3 dark:border-strokedark">
                                                    <div className="flex flex-row gap-2">
                                                        <div>
                                                            <Image src={"/images/default/no-image.png"} alt=""
                                                                   width={50}
                                                                   height={50}
                                                                   className="rounded border border-opacity-30 aspect-square object-cover"/>
                                                        </div>
                                                        <div>
                                                            <a href={`/products/${product.id}`} target="_blank"
                                                               className="font-bold text-sm text-blue-600 block mb-1">{product.name}</a>
                                                            <div>SKU: {product.sku}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                                    {product.packing}
                                                </td>
                                                <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                                    <input defaultValue={1} min={1} max={product.quantity} type="number"
                                                           className="border border-t-body rounded focus:outline-blue-500 py-1 px-3 text-sm"/>
                                                </td>
                                                <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                                    {product.quantity}
                                                </td>

                                                <td className="px-2 py-3 dark:border-strokedark border border-[#eee]">
                                                    <h5 className="font-medium text-black dark:text-white text-end">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(product.price)}
                                                    </h5>
                                                </td>
                                                <td className="px-2 py-3 dark:border-strokedark border border-[#eee]">
                                                    <h5 className="font-medium text-black dark:text-white text-end">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(product.price)}
                                                    </h5>
                                                </td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                            </div>
                            </div>
                        </BodyModal>
                        <FooterModal/>
                    </ContainerModal>
                )
            }
            {
                insertSuccess && (
                    pathname.toString().includes('new') ?
                        <SuccessModal title="Thành công" message="Thêm đơn hàng thành công" onClickLeft={() => {
                            router.back()
                        }} onClickRight={() => {
                        }}/> :
                        <SuccessModal title="Thành công" message="Cập nhật đơn hàng thành công" onClickLeft={() => {
                            router.back()
                        }} onClickRight={() => {
                        }}/>
                )
            }
            <form onSubmit={onSubmitOrderForm} className="flex flex-col gap-5">
                {
                    error && <Alert message={error} type="error"/>
                }
                <div
                    className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Thông tin chung</span>
                    </div>
                    <div className="py-2">
                        <Select label="Tên khách hàng" name="name" defaultValue="Nguyễn Thị A">
                            <option value="Nguyễn Thị A" selected={true}>Nguyễn Thị A</option>
                            <option value="Trần Thị Thu">Trần Thị Thu</option>
                            <option value="Nguyễn Hoàng Ân">Nguyễn Hoàng Ân</option>
                        </Select>

                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Địa chỉ" feedback="Địa chỉ là bắt buộc"
                                   placeholder="Nhập địa chỉ cụ thể"
                                   type="text"
                                   defaultValue={order?.address}
                                   name="address"/>

                            <Input label="Số điện thoại" feedback="Số điện thoại là bắt buộc"
                                   placeholder="Nhập Số điện thoại"
                                   defaultValue={order?.phone}
                                   type="text"
                                   name="phone"/>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <Select label="Thành phố/Tỉnh" name="city" value={selectedProvince?.province_id || ''} onChange={handleChangeProvince}>
                                <option value="">Chọn thành phố/tỉnh</option>
                                {
                                    provinces.map((province: Province) => (
                                        <option key={province.province_id}
                                                value={province.province_id}>{province.province_name}</option>
                                    ))
                                }
                            </Select>

                            <Select label="Quận/Huyện" name="district" value={selectedDistrict?.district_id || ''} onChange={handleChangeDistrict}>
                                <option value="">Chọn quận/huyện</option>
                                {
                                    districts.map((district: District) => (
                                        <option key={district.district_id}
                                                value={district.district_id}>{district.district_name}</option>
                                    ))
                                }
                            </Select>

                            <Select label="Phường/xã" name="ward" value={selectedWard?.ward_id || ''} onChange={handleChangeWard}>
                                <option value="">Chọn xã/phường</option>
                                {
                                    wards.map((ward: Ward) => (
                                        <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Select label="Khuyến mãi" name="discount" defaultValue="true">
                                <option value="IN_STOCK" selected={true}>Đang bán</option>
                                <option value="TEMPORARILY_SUSPENDED">Tạm ngưng</option>
                                <option value="OUT_OF_STOCK">Hết hàng</option>
                            </Select>

                            <Select label="Trạng thái" name="status" defaultValue="PROCESSING">
                                <option value="PROCESSING" selected={true}>Đang xử lý</option>
                                <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                                <option value="PAID">Đã thanh toán</option>
                                <option value="SHIPPING">Đang giao hàng</option>
                                <option value="COMPLETE">Hoàn thành</option>
                                <option value="CANCEL">Hủy</option>
                            </Select>

                        </div>
                    </div>
                </div>


                <div
                    className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Sản phẩm</span>
                    </div>
                    <div className="flex flex-col gap-2 py-3">
                        <div className="flex flex-row justify-between gap-2 items-center">
                            <InputDefault placeholder="Nhập SKU hoặc tên sản phẩm" type="text" name="" onChange={handleChangeSearchInput}/>
                            <button className="appearance-none rounded px-4 py-1 btn-blue" type="button" onClick={() => setShowSearchProductModal(true)}>Tìm</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left text-xs dark:bg-meta-4">
                                    {
                                        columns.map((column: string, index: number) => (
                                            <th key={"columns-" + index}
                                                className="min-w-[50px] px-2 py-2 font-medium text-black dark:text-white border border-[#eee] text-center">
                                                {column}
                                            </th>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody className="text-left">
                                {productsExample.map((product: Product, key: number) => (
                                    <tr key={key} className="text-xs border-b border-[#eee]">
                                        <td className="px-2 py-3 dark:border-strokedark border-[#eee] border">
                                            <div className="flex flex-row gap-2 ">
                                                <div>
                                                    <Image src={"/images/default/no-image.png"} alt="" width={50}
                                                           height={50}
                                                           className="rounded border border-opacity-30 aspect-square object-cover border-[#eee]"/>
                                                </div>
                                                <div>
                                                    <a href={`/products/${product.id}`} target="_blank"
                                                       className="font-bold text-sm text-blue-600 block mb-1">{product.name}</a>
                                                    <div>SKU: {product.sku}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            {product.packing}
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <input defaultValue={1} min={0} type="number"
                                                   className="border border-t-body rounded focus:outline-blue-500 py-1 px-3 text-sm"/>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            {product.quantity}
                                        </td>

                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.price)}
                                            </h5>
                                        </td>
                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.price)}
                                            </h5>
                                        </td>

                                        <td className="px-2 py-3 dark:border-strokedark border border-[#eee] text-center">
                                            <div className="flex items-center space-x-3.5 justify-center">
                                                <button className="hover:text-primary" type="button"><Trash/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div
                    className="rounded-sm border border-stroke bg-white px-5 pb-5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="border-b border-opacity-30">
                        <span className="text-sm text-black-2 font-bold mb-3 block">Thanh toán</span>
                    </div>
                    <div className="py-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức nhận
                                        hàng
                                    </div>
                                    <Radio label="Trực tiếp tại cửa hàng" name="shipping"
                                           value="Trực tiếp tại cửa hàng"/>
                                    <Radio label="Giao hàng" name="shipping" value="Giao hàng"/>
                                </div>
                                <div>
                                    <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Hình thức thanh
                                        toán
                                    </div>
                                    <Radio label="Tiền mặt" name="payment" value="Tiền mặt"/>
                                    <Radio label="Chuyển khoản" name="payment" value="Chuyển khoản"/>
                                    <Radio label="Momo" name="payment" value="Momo"/>
                                </div>
                                <div className="col-span-2">
                                    <TextArea label="Ghi chú" placeholder="Nhập ghi chú cho đơn hàng" name="note"
                                              feedback=""/>
                                </div>
                            </div>
                            <div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Tổng tiền</div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Giảm giá</div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Phí vận chuyển</div>
                                <div className="tracking-wide text-gray-700 text-sm font-bold mb-2">Thành tiền</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <Link href={"/orders"} className="btn btn-danger text-sm inline-flex items-center gap-2">
                        <span className="hidden xl:block">Hủy</span>
                    </Link>

                    <button className="btn btn-blue text-sm inline-flex items-center gap-2" type="submit">
                        <span className="hidden xl:block">{order ? "Đã thanh toán" : "Lưu"}</span>
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default OrderForm;