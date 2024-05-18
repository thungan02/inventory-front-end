import React from 'react';
import {GroupCustomer} from "@/models/Model";

const Page = () => {
    const groupCustomers: GroupCustomer[] = [
        {
            id: 1,
            name: "Nhóm A",
            status: "Active",
            created_at: new Date("2022-01-15"),
            updated_at: new Date("2022-05-20")
        },
        {
            id: 2,
            name: "Nhóm B",
            status: "Inactive",
            created_at: new Date("2022-03-10"),
            updated_at: new Date("2022-06-25")
        },
        {
            id: 3,
            name: "Nhóm C",
            status: "Active",
            created_at: new Date("2022-02-28"),
            updated_at: new Date("2022-07-30")
        }
    ];
    return (
        <div>
            {
                groupCustomers?.map((group: GroupCustomer, index: number) => (
                    <div key={index}>{group.name} - {group.status}</div>
                ))
            }
        </div>
    );
};

export default Page;