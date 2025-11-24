import { cn } from "@/lib/utiles";
import Image from "next/image";
type Page = {
  title: string;
  thumbnail: string;
  createdAt: string;
  author: string;
  layout: "row" | "column";
};

export function PostCard({ title, thumbnail, createdAt, author, layout }: Page) {
  return (
    <div className={cn(layout === "row" ? "flex max-w-[312px] " : "max-h-[218px]")}>
      <div className="flex overflow-hidden duration-200 rounded-xl border-2 border-black hover:border-main w-fit h-fit">
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={272}
          height={172}
          className="transition-transform ease-in-out object-cover
        hover:scale-105"
        />
      </div>
      <div className="flex p-2 font-bold">
        {title}
        {createdAt}
        {author}
      </div>
    </div>
  );
}
