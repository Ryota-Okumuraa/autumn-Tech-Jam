"use client";
import BackButton from "./backButton";
import { UploadButton } from "@/app/components/shared/uploadButton";
import InputTitle from "./input-title";
import SelectCategory from "./selectCategory";
import Thumbnail from "./thumbnail";
import Article from "./article";

export default function CreateForm() {
  return (
    <form className="mt-20 w-[80%] mx-auto h-full">
      {/* 戻るとuploadボタン */}
      <div className="flex items-center justify-between mb-5">
        <BackButton />
        <UploadButton />
      </div>
      <div className="flex items-center justify-between">
        {/* mdファイル */}
        <div className="w-[70%] h- pr-8 border-r-2 border-r-black">
          <Article />
        </div>
        <div className="w-[30%] flex flex-col space-y-4 pl-8">
          <InputTitle />
          <SelectCategory />
          <Thumbnail />
        </div>
      </div>
    </form>
  );
}
