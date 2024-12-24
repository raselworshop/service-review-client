import React from 'react';
import Services from '../Component/Shared/Services';
import Carousel from '../Component/Common/Carousel';
import PlatformStats from '../Component/Shared/PlatFormState';
import WhyChoose from '../Component/Common/WhyChoose';
import MeetOurPartners from '../Component/Common/partner/MeetOurPartners';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <section>
                <Carousel/>
            </section>
            <section>
                <PlatformStats></PlatformStats>
            </section>
            <section>
                <Services></Services>
            </section>
            <section>
                <MeetOurPartners></MeetOurPartners>
            </section>
            <section className='my-8'>
                <WhyChoose></WhyChoose>
            </section>
        </div>
    );
};

export default Home;