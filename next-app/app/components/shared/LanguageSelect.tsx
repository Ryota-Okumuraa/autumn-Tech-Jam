"use client";

import { Icon } from "./icon";
import { useState } from "react";
import { cn } from "@/lib/utiles";

const languages = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

export const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage)?.label || "English";

  const handleLanguageChange = async (code: string) => {};

  const toggleDropdown = () => [];

  return (
    <div className="relative w-[148px]">
      <button className="bg-black p-[2px] rounded-full  w-[140px] h-8" onClick={toggleDropdown}>
        <div className="bg-white rounded-full flex items-center justify-center gap-3 w-full h-full">
          <span className="font-bold">{currentLanguage}</span>
          <Icon.ArrowDown strokeWidth={1.5} className="w-4 h-4" />
        </div>
      </button>
      <div
        className={cn(
          "bg-main absolute z-[-1] top-2 left-2 px-[2px] border-2 border-black rounded-full w-[140px] h-8 "
        )}
      ></div>
    </div>
  );
};
