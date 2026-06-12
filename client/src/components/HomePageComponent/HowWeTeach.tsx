
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { GradientText } from '../GradientText';

const HowWeTeach = () => {
  return (
    <Section
      id="impact"
      title='TTM model'
      className="relative bg-primary text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-mesh bg-mesh opacity-10" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-noto md:text-5xl font-bold mb-4">
            How We <GradientText className='text-white'>Teach, Tutor & Mentor</GradientText>
          </h2>
          <p className="text-xl font-roboto text-dparacolor max-w-2xl mx-auto">
            Education Beyond the Classroom, from Learning to Mastery - A Guided Approach
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              stat: 'Step 1',
              label: 'Teach',
              description: 'Learn from Experts, Master the Basics',
            },
            {
              stat: 'Step 2',
              label: 'Tutor',
              description: 'One-on-One Support to Strengthen Your Skills',
            },
            {
              stat: 'Step 3',
              label: 'Mentor',
              description: "Guidance from Professionals Who've Been There",
            },
            {
              stat: 'Step 4',
              label: 'Apply & Grow',
              description: 'Career placement',
            },
          ].map((stat, index) => (
            <div key={index} className="relative">
              <GlassCard
                className="p-6 h-[15rem] text-center bg-white/5 backdrop-blur-sm"
                variant="light"
                glowColor="from-primary-400/10"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.stat}
                </div>
                <h3 className="text-xl font-noto font-semibold mb-2 mt-8 text-white">{stat.label}</h3>
                <p className="text-dparacolor font-roboto">{stat.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowWeTeach