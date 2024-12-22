import React from 'react';
import Services from '../Component/Shared/Services';
import Carousel from '../Component/Common/Carousel';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <section>
                <Carousel/>
            </section>
            <section>
                <Services></Services>
            </section>
        </div>
    );
};

export default Home;