import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FundingCycle from '@/components/FundingCycle'
import Programs from '@/components/Programs'
import HowItWorks from '@/components/HowItWorks'
import Impact from '@/components/Impact'
import Courses from '@/components/Courses'
import GetInvolved from '@/components/GetInvolved'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FundingCycle />
        <Programs />
        <HowItWorks />
        <Impact />
        <Courses />
        <GetInvolved />
      </main>
      <Footer />
    </>
  )
}
