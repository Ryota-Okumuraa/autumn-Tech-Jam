import Image from "next/image";

export const FixedBg = () => {
    return (
        <div className="hidden fixed top-0 left-0 w-screen h-screen md:block -z-10">
            <Image
                src="/bg.png"
                alt="background image"
                width={1000}
                height={1000}
                className="w-full h-full"
            />
        </div>
    )
}