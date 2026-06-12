


import Hero from '../components/HomePageComponent/HeroSection';
import OurApproach from '../components/HomePageComponent/OurApproach';
import StudyAtZit from '../components/HomePageComponent/StudyAtZit';
import ProgramsWeOffer from '../components/HomePageComponent/ProgramsWeOffer';
import TTM from '../components/HomePageComponent/TTM';
import TeachSomeone from '../components/HomePageComponent/Hero/TeachSomeon';
import UpComingEvent from '../components/HomePageComponent/UpComingEvent';
import TutorshipSection from '../components/HomePageComponent/TutorshipSection';
import ReadyToStartSec from '../components/MotivationPage/ReadyToStartSec';
import SuccessStory from '../components/HomePageComponent/Hero/SuccessStory';
import ScrollToTopButton from '../components/ScrollToTopButton';


const HomePage: React.FC = () => {
    return (
        <main className="overflow-hidden">
                <Hero/>
                <OurApproach />
                <StudyAtZit />
                <ProgramsWeOffer />
                <TutorshipSection />
                <ReadyToStartSec />
                <TeachSomeone />
                <TTM />
                <SuccessStory />
                <UpComingEvent />
                <ScrollToTopButton />
        </main>
    );
};

export default HomePage;
