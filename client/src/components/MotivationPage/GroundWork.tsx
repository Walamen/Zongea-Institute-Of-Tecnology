import { Section } from '../Section';
import { FaUserGraduate, FaPeoplePulling, FaBriefcase } from 'react-icons/fa6';

export default function GroundWork() {
  const bgColors = ["bg-orange-200/50", "bg-white/50", "bg-green-200/50"];

  return (
    <Section id="approach" title="Our Approach" className="relative bg-gray-200 text-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-noto text-xl md:text-2xl font-bold mb-4 text-primary">
            Laying the Groundwork: Year One Highlights
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: 'Quality Education',
              description: 'Industry-aligned curriculum taught by experienced professionals.',
              icon: FaUserGraduate,
            },
            {
              title: 'Career Focus',
              description: 'Practical skills and guidance for your tech career journey.',
              icon: FaBriefcase,
            },
            {
              title: 'Supportive Community',
              description: 'Learn alongside passionate peers in a collaborative environment.',
              icon: FaPeoplePulling,
            },
          ].map((groundWork, index) => (
            <div key={groundWork.title} className="relative">
              <div
                className={`p-4 h-full w-full max-w-[18rem] ${bgColors[index]} rounded-md backdrop-blur-md`}
              >
                <div className="w-16 h-16 rounded-full flex justify-center items-center mb-2 bg-primary/10">
                  <groundWork.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-noto text-lg font-semibold mb-2 text-primary">{groundWork.title}</h3>
                <p className="font-roboto text-dparacolor text-sm">{groundWork.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
