import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export default function Home() {
  return (
    <DefaultLayout>
      nội dung nè
    </DefaultLayout>
  );
}

export const metadata: Metadata = {
  title: "Admin", description: "Admin"
}
