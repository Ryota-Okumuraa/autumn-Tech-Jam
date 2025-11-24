"use client";
import { CategoriesResponse } from "@/app/api-client/categories/category";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useTranslations } from "next-intl";

export default function SelectCategory() {
  const t = useTranslations("post-create");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const { isLoading } = useSWR<CategoriesResponse>(`/api/category`, fetcher, {
    onSuccess: (data) => setCategories(data.categories),
  });

  if (isLoading) {
    return (
      <label htmlFor="category" className="w-full flex flex-col items-start space-y-2">
        <span className="text-black">{t("category")}</span>
        <select className="w-full py-3 pl-4 text-black border border-black rounded-xl bg-yellow">
          <option value="" disabled>
            Loading...
          </option>
        </select>
      </label>
    );
  }
  return (
    <label htmlFor="category" className="w-full flex flex-col items-start space-y-2">
      <span className="text-black">{t("category")}</span>
      <select
        id="category"
        className="w-full py-3 pl-4 text-black border border-black rounded-xl bg-yellow"
      >
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}
