import Image from "next/image";

export const CategoryHead = () => {
    return (
        <section className="mt-25 mb-10 px-4">
            <div className="max-w-[240px] mx-auto flex flex-col items-center justify-center md:flex-row md:gap-22 md:max-w-[1020px]">
                {/*仮 */}
                <div className="max-w-full max-h-[240px] rounded-[50px] border-2 border-black p-7 md:rounded-[70px] md:max-w-[400px] md:max-h-[400px] ">
                    <Image
                        src="/category-food.png"
                        alt="category head"
                        width={500}
                        height={500}
                        className="md:max-w-[320px] md:max-h-[320px] "
                    />
                </div>
                <div className="md:items-start text-left">
                    <h1 className="font-bold text-[32px] text-center mt-11 md:text-left md:text-[72px]">
                        Category
                    </h1>
                    <p className="mt-7 md:text-[20px]">text text text text text text text text text text text text</p>
                </div>
            </div>
        </section>
    )
}