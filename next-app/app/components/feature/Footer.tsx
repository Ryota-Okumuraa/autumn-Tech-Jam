import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-13 rounded-t-[30px] md:py-23 ">
            <div className="flex gap-4 items-center justify-center md:gap-[324px]">
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={20}
                    className="w-auto h-5"
                />
                <div className="text-white text-xs  flex gap-4 items-center md:text-[16px]">
                    <Link
                        href="/"
                        className="hover:underline transition-all duration-300 ease-in-out"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/"
                        className="hover:underline transition-all duration-300 ease-in-out"
                    >
                        Terms
                    </Link>
                </div>
            </div>
        </footer>
    );
};