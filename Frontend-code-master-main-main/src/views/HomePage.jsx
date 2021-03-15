import React, { useState } from 'react'
import Contact from '../components/contact/contact.components'
import Faq from '../components/faq/faq.components'
import Footer from '../components/footer/footer.components'
import { homeObjOne } from '../components/infosection/infosection.data'
import InfoSection from '../components/infosection/infosection.component'
import Navbar from '../components/navabar/navbar.components'
import ServiceList from '../components/service-list/service-list.component'
// import CardList from '../components/service-cardlist/service-cardlist.componet'
// import CardList from '../components/service-cardlist'
import Sidebar from '../components/sidebar/sidebar.components'
import VideoSection from '../components/videosection/videosection.component'



const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <VideoSection />
            {/* <CardList /> */}
            <ServiceList />
            {/* <Services /> */}
            <InfoSection {...homeObjOne} />
            {/* <InfoSection {...homeObjTwo}/>   */}
            <Faq />
            <Contact />
            <Footer />
            {/* <InfoSection {...homeObjThree}/>   */}
        </>
    )
}

export default Home
