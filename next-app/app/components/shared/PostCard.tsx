import { cn } from "@/lib/utiles";
import Link from "next/link";
import Image from "next/image"

type PostCardProps = {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    author: string;
    layout: 'row' | 'column';
}

export function PostCard({ title, thumbnail, date, author, layout, id }: PostCardProps) {
    return (
        <Link
            href={`/post/${id}`}
            className={cn(
                "min-w-[200px] md:min-w-none",
                layout === "row"
                    ? "flex max-w-[312px] md:max-w-full "
                    : "max-w-[218px] md:max-w-[280px] w-full flex flex-col md:min-w-[280px]",
            )}>
            <div className="flex overflow-hidden duration-200 rounded-xl border-2 border-black hover:border-main w-fit h-fit">
                <Image
                    src={thumbnail}
                    alt="thumbnail"
                    width={400}
                    height={400}
                    className="transition-transform ease-in-out object-cover hover:scale-105"
                />
            </div>
            <div className="flex flex-col gap-3">
                <h4 className="flex line-clamp-2 text-[14px] mt-4 font-bold h- md:text-md">{title}</h4>
                <div className="flex gap-6 text-xs items-center md:text-[14px]">
                    <span>{date}</span>
                    <span>{author}</span>
                </div>
            </div>
        </Link>
    )
}