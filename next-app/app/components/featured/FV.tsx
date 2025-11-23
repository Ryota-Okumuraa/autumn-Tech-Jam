import Image from "next/image";

export const FV = () => {
    return (
        <section className="h-screen w-full">
            <Image
                src="/dummy.png"
                alt="FV"
                width={500}
                height={500}
                className="w-full h-full object-cover" />
        </section>
    )
}