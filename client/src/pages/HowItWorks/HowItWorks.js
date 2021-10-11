import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from "../../components/Header/Header";
import styles from './HowItWorks.module.sass';
import HeroBanner from '../../components/HowItWorks/HeroBanner/HeroBanner';
import ServicesSection from '../../components/HowItWorks/ServicesSection/ServicesSection';
import HowDoNamingContestsWork from '../../components/HowItWorks/HowDoNamingContestsWork/HowDoNamingContestsWork';
import FAQ from '../../components/HowItWorks/FAQ/FAQ';
import ReadyToGetStarted from '../../components/HowItWorks/ReadyToGetStarted/ReadyToGetStarted';
import Info from '../../components/HowItWorks/Info/Info';
import Consultation from '../../components/HowItWorks/Consultation/Consultation';
import Feautured from '../../components/HowItWorks/Feautured/Feautured';

const HowItWorks = () => {

    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <HeroBanner classes={{
                    heroBanner: styles.heroBanner,
                    space1: styles.space1,
                    container: styles.container,
                    firstContainer: styles.firstContainer,
                    heroImgHolder: styles.heroImgHolder,
                    blueButton: styles.blueButton,
                    notes: styles.notes
                }} />
                <ServicesSection classes={{
                    space1: styles.space1,
                    container: styles.container,
                    space1Header: styles.space1Header,
                    notes: styles.notes,
                    blueButton: styles.blueButton,
                    imgIcon: styles.imgIcon,
                    cardBlockContainer: styles.cardBlockContainer
                }} />
                <HowDoNamingContestsWork classes={{
                    space2: styles.space2,
                    space2Header: styles.space2Header,
                    space2Body: styles.space2Body,
                    stepsHolder: styles.stepsHolder,
                    stepsImgHolder: styles.stepsImgHolder
                }} />
                <FAQ classes={{
                    space2: styles.space2
                }} />
                <ReadyToGetStarted classes={{
                    space1: styles.space1,
                    container: styles.container,
                    blueButton: styles.blueButton
                }} />
                <Info classes={{
                    space1: styles.space1,
                    container: styles.container,
                    infoContainer: styles.infoContainer}}/>
                <Consultation classes={{
                    space1: styles.space1,
                    container: styles.container}}/>
                <Feautured classes={{
                    container: styles.container,
                    feauturedHolder: styles.feauturedHolder,
                    feauturedHeader: styles.feauturedHeader,
                    feauturedBody: styles.feauturedBody,
                    sourseContainer: styles.sourseContainer}}/>
            </div>
            <Footer />
        </>
    );
}

export default HowItWorks