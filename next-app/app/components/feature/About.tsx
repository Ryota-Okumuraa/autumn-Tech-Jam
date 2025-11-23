import Image from "next/image";

export const About = () => {
  return (
    <section className="bg-main/60 mr-4 pl-4 rounded-r-[20px] py-30 mt-10 mb-4">
      <div className="md:max-w-[1200px] flex items-center mx-auto">
        <div className="flex-1">
          <p className="text-xl">
            Nagoya’s charm lies in its everyday culture—morning café traditions,
            <br />
            local dishes, friendly neighborhoods, and a calm atmosphere.
          </p>
        </div>
        <div className="flex-1 hidden md:block">
          <Image src="/about.png" alt="about" width={500} height={500} />
        </div>
      </div>
    </section>
  );
};
