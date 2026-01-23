import { ImageParticles } from '@/components/user/ImageParticles';
import Hero from '../_components/Hero';
import Flavours from '../_components/Flavours';
import NextFlavour from '../_components/NextFlavour';

export default function Home() {
    return (
        <div className="bg-linear-to-b from-[#FFFAEF] to-[#E3D1A5]">
            <Hero />
            <ImageParticles
                className="absolute inset-0"
                images={[
                    '/images/user/almond-1.png',
                    '/images/user/pista-1.png',
                    '/images/user/hazelnut-1.png',
                    '/images/user/almond-2.png',
                    '/images/user/pista-2.png',
                    '/images/user/hazelnut-2.png',
                    '/images/user/almond-3.png',
                    '/images/user/pista-3.png',
                    '/images/user/hazelnut-3.png',
                    '/images/user/almond-4.png',
                    '/images/user/pista-4.png',
                    '/images/user/hazelnut-4.png',
                    '/images/user/almond-5.png',
                    '/images/user/pista-5.png',
                    '/images/user/hazelnut-5.png',
                    '/images/user/almond-6.png',
                    '/images/user/pista-6.png',
                    '/images/user/hazelnut-6.png',
                ]}
                quantity={18}
                size={30}
                staticity={12}
            />
            <Flavours />
            <NextFlavour />
        </div>
    );
}
