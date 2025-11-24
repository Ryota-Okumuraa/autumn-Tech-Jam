"use client";
import BackButton from "./backButton";
import { UploadButton } from "@/app/components/shared/uploadButton";

export default function CreateForm() {
  return (
    <form className="mt-20 w-[80%] mx-auto ">
      {/* 戻るとuploadボタン */}
      <div className="flex items-center justify-between">
        <BackButton />
        <UploadButton />
      </div>
      <div className="flex items-center justify-between">
        {/* mdファイル */}
        <div className="w-[70%]">

        </div>
        <div className="w-[30%]">
          
        </div>
      </div>
    </form>
  );
}
