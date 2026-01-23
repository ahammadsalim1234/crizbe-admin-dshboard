import { Button } from '@/components/ui/button';
import Header from '@/components/user/Header';
import Image from 'next/image';
import React from 'react';

export default function Hero() {
    return (
        <div className=" min-h-screen relative">
            <Header />
            <div className="wrapper pt-[210px] pb-[120px] relative z-1">
                <div className="mb-[100px]">
                    <h2 className="text-[#4E3325] text-[72px] font-bricolage font-bold mb-[38px]">
                        Feel the{' '}
                        <span className="title-highlight after:bg-[#c2a065] text-[#f9f1df]">
                            Crunch.
                        </span>
                        <br />
                        Taste the Luxury.
                    </h2>
                    <Button className="bg-linear-to-r from-[#caa45a] via-[#ddb56a] to-[#b08a43] h-[54px] w-[195px] font-medium">
                        Discover the Crunch
                    </Button>
                </div>
                <p className="text-[#4E3325] text-[18px] font-normal">
                    A slender, perfectly layered crunch stick crafted with <br /> real hazelnut,
                    pistachio, and almond—where texture <br />
                    meets indulgence in every bite.
                </p>
            </div>
            {/* <Image
                src="/images/user/almond-bottle.png"
                alt="Crizbe"
                width={100}
                height={100}
                className="absolute z-1 w-[230px] bottom-0 -rotate-[28.55deg] left-[45%] top-[60%]"
            />
            <Image
                src="/images/user/hazelnut-bottle.png"
                alt="Crizbe"
                width={100}
                height={100}
                className="absolute z-1 w-[230px] bottom-0 -rotate-[17.64deg] left-[65%] top-[50%]"
            />
            <Image
                src="/images/user/pista-bottle.png"
                alt="Crizbe"
                width={100}
                height={100}
                className="absolute z-1 w-[230px] bottom-0 -rotate-[7.5deg] left-[83%] top-[25%]"
            /> */}
            {/* <Image
                src="/images/user/crizbe-bg.png"
                alt="Crizbe"
                width={100}
                height={100}
                className="absolute w-full bottom-0"
            /> */}
        </div>
    );
}
