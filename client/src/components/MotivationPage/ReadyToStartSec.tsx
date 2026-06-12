import { Link } from 'react-router-dom'
import MotivationBgImg from '../../asset/images/Graduation-Bg-Img.jpg'

const ReadyToStartSec = () => {
  return (
    <section className="py-16 md:py-24 text-white" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.8), rgba(0, 0, 90, 0.8)), url(${MotivationBgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container text-center">
        <h2 className="font-noto text-xl md:text-2xl font-bold mb-6 text-white">Ready to Start Learning?</h2>
        <p className="font-roboto text-sm md:text-lg text-white mb-8 max-w-2xl mx-auto">
          Join our community of learners and kickstart your career in technology and design.
          All courses are free and designed to help you succeed.
        </p>
        
        {/* Fixed Button */}
        <Link
          to="/admission"
          className="font-sans text-xs md:text-sm bg-secondary hover:font-semibold text-white px-3 py-2 transition-colors rounded-md inline-flex items-center justify-center hover:bg-white hover:text-primary"
        >
          Apply Now
        </Link>
      </div>
    </section>
  )
}

export default ReadyToStartSec;
