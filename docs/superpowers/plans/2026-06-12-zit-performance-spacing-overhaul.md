# ZIT Site — Performance & Spacing Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all animation libraries and dead dependencies, scope payment providers to the donation route, optimize images, fix the hero slideshow, and apply a unified spacing system across every section of the site.

**Architecture:** Dead code is deleted first so nothing downstream depends on removed APIs. Payment providers are cleaned from global wrappers (DonationPage already self-contains its own). Spacing is applied last so all component structure is stable before layout is adjusted.

**Tech Stack:** React 19, Vite 6, Tailwind CSS 3, TypeScript, react-router-dom 7

**Spec:** `docs/superpowers/specs/2026-06-12-zit-performance-spacing-overhaul-design.md`

---

## File Map

### Deleted
- `client/src/components/ArchitectureScene.tsx` — dead Three.js scene, never imported
- `client/src/components/Carousel.tsx` — framer-motion carousel, never imported
- `client/src/components/Testimonial/Testimonial.tsx` — never imported anywhere, dead code
- `client/src/animations/variants.ts` — framer-motion variants, becomes unused
- `client/src/components/common/AnimateOnScroll.tsx` — custom scroll animation component
- `client/src/components/ParallaxSection.tsx` — framer-motion parallax
- `client/src/components/FloatingElement.tsx` — framer-motion infinite float

### Modified — Performance
- `client/package.json` — uninstall 7 packages
- `client/vite.config.ts` — add image optimizer, manual chunks, remove lucide exclusion
- `client/src/main.tsx` — remove Stripe Elements wrapper
- `client/src/App.tsx` — remove PayPal + Stripe global providers, add Suspense
- `client/src/components/GlassCard.tsx` — `motion.div` → `div`
- `client/src/components/HomePageComponent/HowWeTeach.tsx` — remove framer-motion
- `client/src/components/MotivationPage/GroundWork.tsx` — remove framer-motion
- `client/src/components/GradientText.tsx` — remove unused `animate-gradient-x` class
- `client/src/components/HomePageComponent/HeroSection.tsx` — GPU crossfade + AnimateOnScroll removal
- `client/src/components/HomePageComponent/Hero/SuccessStory.tsx` — remove AnimateOnScroll
- `client/src/components/HomePageComponent/Hero/FeaturesSection.tsx` — remove AnimateOnScroll
- `client/src/components/HomePageComponent/StudySucceed/index.tsx` — remove AnimateOnScroll
- `client/src/components/HomePageComponent/CallToAction/index.tsx` — remove AnimateOnScroll
- `client/src/components/StudySucceed/index.tsx` — remove AnimateOnScroll
- `client/src/components/Testimonial/Testimonial.tsx` — remove AnimateOnScroll
- All `<img>` tags across codebase — add `loading="lazy" decoding="async"`

### Modified — Spacing
- `client/tailwind.config.js` — add spacing tokens
- `client/src/index.css` — remove fade-in rules, update `.section`
- `client/src/components/Section.tsx` — update to new rhythm, remove fade-in
- `client/src/components/HomePageComponent/OurApproach.tsx`
- `client/src/components/HomePageComponent/StudyAtZit.tsx`
- `client/src/components/HomePageComponent/ProgramsWeOffer.tsx`
- `client/src/components/HomePageComponent/TTM.tsx`
- `client/src/components/HomePageComponent/TutorshipSection.tsx`
- `client/src/components/HomePageComponent/Hero/TeachSomeon.tsx`
- `client/src/components/HomePageComponent/Hero/SuccessStory.tsx`
- `client/src/components/HomePageComponent/Hero/FeaturesSection.tsx`
- `client/src/components/HomePageComponent/UpComingEvent.tsx`
- `client/src/components/MotivationPage/ReadyToStartSec.tsx`
- `client/src/components/MotivationPage/GroundWork.tsx`
- `client/src/components/HomePageComponent/CallToAction/index.tsx`
- `client/src/components/Testimonial/Testimonial.tsx`

---

## Task 1: Delete dead files and uninstall heavy packages

**Files:**
- Delete: `client/src/components/ArchitectureScene.tsx`
- Delete: `client/src/components/Carousel.tsx`
- Delete: `client/src/animations/variants.ts`
- Delete: `client/src/components/common/AnimateOnScroll.tsx`
- Delete: `client/src/components/ParallaxSection.tsx`
- Delete: `client/src/components/FloatingElement.tsx`
- Modify: `client/package.json`

- [ ] **Step 1: Delete the seven dead files**

```bash
cd client
rm src/components/ArchitectureScene.tsx
rm src/components/Carousel.tsx
rm src/components/Testimonial/Testimonial.tsx
rm src/animations/variants.ts
rm src/components/common/AnimateOnScroll.tsx
rm src/components/ParallaxSection.tsx
rm src/components/FloatingElement.tsx
```

- [ ] **Step 2: Uninstall the heavy packages**

```bash
npm uninstall @react-three/fiber @react-three/drei three @daily-co/daily-js @daily-co/daily-react framer-motion
```

Expected: npm prints `removed N packages` with no errors.

- [ ] **Step 3: Verify the packages are gone**

```bash
node -e "require('@react-three/fiber')" 2>&1 | head -1
```

Expected: `Cannot find module '@react-three/fiber'`

- [ ] **Step 4: Commit**

```bash
cd ..
git add client/package.json client/package-lock.json
git commit -m "chore: remove dead files and uninstall Three.js, Daily.js, framer-motion"
```

---

## Task 2: Strip framer-motion from GlassCard.tsx

**Files:**
- Modify: `client/src/components/GlassCard.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// client/src/components/GlassCard.tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  variant?: 'default' | 'strong' | 'light';
}

export const GlassCard = ({
  children,
  className = '',
  glowColor = 'from-primary-500/20',
  variant = 'default',
}: GlassCardProps) => {
  const baseClasses = 'relative overflow-hidden rounded-2xl backdrop-blur-lg';
  const variantClasses = {
    default: 'bg-white/30 shadow-glass',
    strong: 'bg-white/40 shadow-glass-strong',
    light: 'bg-white/20 shadow-glass-light',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} to-transparent opacity-20`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build compiles**

```bash
cd client && npm run build 2>&1 | tail -5
```

Expected: build completes with no TypeScript errors about `motion` or `framer-motion`.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/src/components/GlassCard.tsx
git commit -m "refactor: replace motion.div with plain div in GlassCard"
```

---

## Task 3: Strip framer-motion from HowWeTeach.tsx

**Files:**
- Modify: `client/src/components/HomePageComponent/HowWeTeach.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// client/src/components/HomePageComponent/HowWeTeach.tsx
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { GradientText } from '../GradientText';

const HowWeTeach = () => {
  return (
    <Section
      id="impact"
      title="TTM model"
      className="relative bg-primary text-white overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-noto md:text-5xl font-bold mb-4">
          How We <GradientText className="text-white">Teach, Tutor & Mentor</GradientText>
        </h2>
        <p className="text-xl font-roboto text-dparacolor max-w-2xl mx-auto">
          Education Beyond the Classroom, from Learning to Mastery - A Guided Approach
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { stat: 'Step 1', label: 'Teach', description: 'Learn from Experts, Master the Basics' },
          { stat: 'Step 2', label: 'Tutor', description: 'One-on-One Support to Strengthen Your Skills' },
          { stat: 'Step 3', label: 'Mentor', description: "Guidance from Professionals Who've Been There" },
          { stat: 'Step 4', label: 'Apply & Grow', description: 'Career placement' },
        ].map((stat, index) => (
          <GlassCard
            key={index}
            className="p-6 h-[15rem] text-center bg-white/5 backdrop-blur-sm"
            variant="light"
            glowColor="from-primary-400/10"
          >
            <div className="text-3xl font-bold text-primary mb-2">{stat.stat}</div>
            <h3 className="text-xl font-noto font-semibold mb-2 mt-8 text-white">{stat.label}</h3>
            <p className="text-dparacolor font-roboto">{stat.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default HowWeTeach;
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/HowWeTeach.tsx
git commit -m "refactor: remove framer-motion from HowWeTeach"
```

---

## Task 4: Strip framer-motion from GroundWork.tsx

**Files:**
- Modify: `client/src/components/MotivationPage/GroundWork.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// client/src/components/MotivationPage/GroundWork.tsx
import { BackgroundMesh } from '../BackgroundMesh';
import { Section } from '../Section';
import { FaUserGraduate, FaPeoplePulling, FaBriefcase } from 'react-icons/fa6';

export default function GroundWork() {
  const bgColors = ["bg-orange-200/50", "bg-white/50", "bg-green-200/50"];

  return (
    <Section id="approach" title="Our Approach" className="relative bg-gray-200 text-primary">
      <BackgroundMesh className="rotate-45 opacity-10" />
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
            <div className={`p-4 h-full w-full max-w-[18rem] ${bgColors[index]} rounded-md backdrop-blur-md`}>
              <div className="w-16 h-16 rounded-full flex justify-center items-center mb-2 bg-primary/10">
                <groundWork.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-noto text-lg font-semibold mb-2 text-primary">{groundWork.title}</h3>
              <p className="font-roboto text-dparacolor text-sm">{groundWork.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Remove unused `animate-gradient-x` from GradientText.tsx**

```tsx
// client/src/components/GradientText.tsx
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText = ({ children, className }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent text-primary-900 ${className}`}>
      {children}
    </span>
  );
};
```

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/src/components/MotivationPage/GroundWork.tsx client/src/components/GradientText.tsx
git commit -m "refactor: remove framer-motion from GroundWork, clean GradientText"
```

---

## Task 5: Remove AnimateOnScroll from HeroSection.tsx

**Files:**
- Modify: `client/src/components/HomePageComponent/HeroSection.tsx`

- [ ] **Step 1: Replace the entire file** (AnimateOnScroll wrapper around indicators → plain div)

```tsx
// client/src/components/HomePageComponent/HeroSection.tsx
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg1 from '../../asset/images/herobg2.jpg';
import heroImg2 from '../../asset/images/study-group-african-people.jpg';
import heroImg3 from '../../asset/images/Technology - Digital.jpg';

const images = [heroImg1, heroImg2, heroImg3];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[90vh] md:h-[80vh] relative flex items-end overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      <div className="absolute inset-0 bg-primary/10" />

      {/* Content Box */}
      <div className="relative z-10 container mb-8">
        <div className="text-white w-full md:w-[50%] lg:w-[55%] bg-primary/70 rounded-tr-lg rounded-tl-lg py-6">
          <h1 className="text-base font-noto sm:text-lg md:text-2xl font-semibold my-6 sm:my-5 px-4 md:px-5 w-[85%]">
            Unleash Your Potential: Take the First Step Toward a Thriving Tech Career
          </h1>
          <p className="text-xs font-roboto sm:text-sm mb-3 sm:mb-6 px-4 md:px-5 w-[90%] md:w-[75%]">
            Opportunities in tech are within your reach. No matter your background or experience level,
            we provide the training and support to help you succeed. The path to a brighter future starts
            now; are you ready to take it?
          </p>
          <div className="relative z-40 px-4 md:px-5 flex flex-col mt-4 md:flex-row md:gap-8 md:items-center">
            <Link
              to="/courses"
              className="bg-transparent font-sans z-50 text-base border border-white text-white hover:bg-white hover:text-primary hover:font-bold px-2 py-[7px] rounded-md transition-all duration-300 inline-flex items-center justify-center mb-2"
            >
              Explore Courses
              <ArrowRight className="ml-1 md:ml-4" size={16} />
            </Link>
            <Link
              to="/admission"
              className="bg-secondary z-50 text-base font-sans text-white hover:bg-white hover:text-primary hover:font-bold px-3 py-2 rounded-md transition-all duration-300 inline-flex items-center justify-center mb-2"
            >
              Apply Now
              <ArrowRight className="ml-1 md:ml-4" size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Vertical Indicators */}
      <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-4 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
              index === currentIndex ? 'bg-secondary scale-125' : 'bg-white'
            }`}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-label={`Select image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify no import errors**

```bash
cd client && npm run build 2>&1 | grep -i error | head -10
```

Expected: no errors about `AnimateOnScroll` or missing files.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/HeroSection.tsx
git commit -m "perf: GPU crossfade hero slideshow, remove AnimateOnScroll"
```

---

## Task 6: Remove AnimateOnScroll from FeaturesSection.tsx and StudySucceed components

**Files:**
- Modify: `client/src/components/HomePageComponent/Hero/FeaturesSection.tsx`
- Modify: `client/src/components/HomePageComponent/StudySucceed/index.tsx`
- Modify: `client/src/components/StudySucceed/index.tsx`

- [ ] **Step 1: Rewrite FeaturesSection.tsx** (remove AnimateOnScroll wrappers, keep all content)

```tsx
// client/src/components/HomePageComponent/Hero/FeaturesSection.tsx
import { useState } from "react";
import image1 from "../../../asset/images/OT image .jpg";
import image2 from "../../../asset/images/WhatsApp Image 2024-11-23 at 19.24.55_c7b5e29d.jpg";
import image3 from "../../../asset/images/student_teaching.jpg";

interface CardProps {
  imgSrc: string;
  title: string;
  description: string;
  linkText: string;
  fullHeight?: boolean;
}

function FeaturesSection() {
  return (
    <div className="w-full h-auto bg-secondary py-16 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-2xl font-noto font-bold text-primary mb-4 md:text-left">
          Study at ZIT
        </h2>
        <p className="text-gray-600 font-roboto mb-8 md:max-w-3xl md:text-left">
          Unlock job-ready skills that open doors in today's tech landscape. No other
          program matches the depth and impact of our hands-on training in technology,
          design, and digital literacy — preparing you for success in the digital economy.
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative w-full">
            <HoverCard
              imgSrc={image1}
              title="Hands-On Learning"
              description="Gain practical experience through interactive, project-based learning that prepares you for real-world challenges."
              linkText="Explore courses →"
              fullHeight
            />
          </div>
          <FeatureCard
            imgSrc={image2}
            title="Personalized Support"
            description="We provide tailored support to ensure your success. From one-on-one tutoring sessions to career guidance, we're here to solve any challenges you face, even the most complex topics."
            linkText="Learn More About ZIT →"
          />
          <FeatureCard
            imgSrc={image3}
            title="Career-Ready Skills"
            description="Program curricula is designed to align with today's top employers' demand. You'll learn practical, hands-on skills that make you job-ready."
            linkText="Start Your Journey →"
          />
        </div>
      </div>
    </div>
  );
}

function HoverCard({ imgSrc, title, description, linkText, fullHeight }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-transparent ${fullHeight ? "h-full" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="transition-all duration-500 hover:scale-105 cursor-pointer">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover rounded-lg" loading="lazy" decoding="async" />
      </div>
      <div
        className={`absolute w-full h-full top-0 bg-primary bg-opacity-60 text-white rounded-lg shadow-lg p-6 transition-all duration-300 transform flex flex-col justify-center items-center text-center space-y-4 ${
          isHovered ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
        }`}
      >
        <h3 className="text-lg font-noto text-secondary-yellow font-semibold">{title}</h3>
        <p className="text-sm font-roboto">{description}</p>
        <a href="#" className="text-white font-sans border px-4 py-2 rounded-md hover:text-primary hover:bg-white font-semibold transition-all duration-300 hover:scale-105">
          {linkText}
        </a>
      </div>
    </div>
  );
}

function FeatureCard({ imgSrc, title, description, linkText }: CardProps) {
  return (
    <div className="flex flex-col md:p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
      <div className="overflow-hidden rounded-lg">
        <img src={imgSrc} alt={title} className="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 hover:scale-110" loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <h3 className="text-lg text-primary font-noto font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 font-roboto flex-grow">{description}</p>
      </div>
      <a href="#" className="text-black hover:text-primary font-sans relative group mt-4 inline-block w-fit">
        <span className="font-semibold font-sans">{linkText}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </a>
    </div>
  );
}

export default FeaturesSection;
```

- [ ] **Step 2: Rewrite HomePageComponent/StudySucceed/index.tsx** (remove all AnimateOnScroll wrappers)

```tsx
// client/src/components/HomePageComponent/StudySucceed/index.tsx
import { ArrowRight } from 'lucide-react';

const StudySucceed = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-noto md:text-3xl font-bold mb-6 text-gray-800">Transformative Testimonials</h2>
          <p className="text-gray-600 font-roboto mb-8 text-sm">
            Discover how our coding school has empowered individuals to embark on successful tech careers.
            Hear firsthand experiences from our alumni who have transformed their lives through coding
            education and unlocked exciting opportunities in the tech industry.
          </p>
          <a
            href="#success-stories"
            className="bg-secondary-yellow font-sans font-bold text-xs text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
            LEARN MORE <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
        <div className="space-y-4">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
            alt="Students collaborating"
            className="rounded-lg shadow-lg w-full"
            loading="lazy"
            decoding="async"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400"
              alt="Campus facilities"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400"
              alt="Learning activities"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudySucceed;
```

- [ ] **Step 3: Rewrite StudySucceed/index.tsx** (the root-level one — same transformation)

```tsx
// client/src/components/StudySucceed/index.tsx
import { ArrowRight } from 'lucide-react';

const StudySucceed = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-noto md:text-3xl font-bold mb-6 text-gray-800">Transformative Testimonials</h2>
          <p className="text-gray-600 font-roboto mb-8 text-sm">
            Discover how our coding school has empowered individuals to embark on successful tech careers.
            Hear firsthand experiences from our alumni who have transformed their lives through coding
            education and unlocked exciting opportunities in the tech industry.
          </p>
          <a
            href="#success-stories"
            className="bg-secondary-yellow font-sans font-bold text-xs text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
            LEARN MORE <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
        <div className="space-y-4">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
            alt="Students collaborating"
            className="rounded-lg shadow-lg w-full"
            loading="lazy"
            decoding="async"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400"
              alt="Campus facilities"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400"
              alt="Learning activities"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudySucceed;
```

- [ ] **Step 4: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/Hero/FeaturesSection.tsx \
        client/src/components/HomePageComponent/StudySucceed/index.tsx \
        client/src/components/StudySucceed/index.tsx
git commit -m "refactor: remove AnimateOnScroll from FeaturesSection and StudySucceed"
```

---

## Task 7: Remove AnimateOnScroll from SuccessStory.tsx and CallToAction/index.tsx

**Files:**
- Modify: `client/src/components/HomePageComponent/Hero/SuccessStory.tsx`
- Modify: `client/src/components/HomePageComponent/CallToAction/index.tsx`

- [ ] **Step 1: In SuccessStory.tsx** — remove only the AnimateOnScroll wrappers around the heading and paragraph (lines 86–93). Replace with plain divs.

Find this block:
```tsx
<AnimateOnScroll animation="slideDown">
  <h2 className="text-3xl font-noto font-bold text-primary text-center mb-4">Our Testimonials</h2>
</AnimateOnScroll>
<AnimateOnScroll animation="fadeIn" delay={200}>
  <p className="text-lg font-roboto text-dparacolor text-center max-w-3xl mx-auto mb-1">
    ...
  </p>
</AnimateOnScroll>
```

Replace with:
```tsx
<h2 className="text-3xl font-noto font-bold text-primary text-center mb-4">Our Testimonials</h2>
<p className="text-lg font-roboto text-dparacolor text-center max-w-3xl mx-auto mb-1">
  We provide aspiring tech professionals with the skills and knowledge to succeed. Discover why our students choose ZIT, and why so many of our graduates return to teach, mentor, and inspire the next generation.
</p>
```

Also remove the import line at the top:
```tsx
import AnimateOnScroll from "../../common/AnimateOnScroll";
```

- [ ] **Step 2: Rewrite CallToAction/index.tsx** (remove AnimateOnScroll wrappers)

```tsx
// client/src/components/HomePageComponent/CallToAction/index.tsx
import HeroBgImg from "../../../asset/images/Graduation-Bg-Img.jpg";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${HeroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container text-center text-white">
        <h2 className="text-base font-noto md:text-2xl md:w-[70%] md:mx-auto mb-4">
          Make a difference today—your donation, no matter the size, brings us one step closer to transforming lives and creating lasting impact!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            to="/donate"
            className="w-full md:w-fit font-sans border hover:bg-white hover:text-primary text-lg text-white px-3 sm:px-6 py-1 sm:py-2 transition-all duration-300 rounded-md inline-flex items-center justify-center group"
          >
            Be A Volunteer
            <ArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" size={16} />
          </Link>
          <Link
            to="/donate"
            className="w-full md:w-fit font-sans bg-white text-lg text-primary px-3 sm:px-6 py-1 sm:py-2 transition-all duration-300 rounded-md inline-flex items-center justify-center group"
          >
            Donate Today
            <ArrowRight className="ml-4 transform transition-transform group-hover:translate-x-1" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/Hero/SuccessStory.tsx \
        client/src/components/HomePageComponent/CallToAction/index.tsx
git commit -m "refactor: remove AnimateOnScroll from SuccessStory and CallToAction"
```

---

## Task 8: Confirm Testimonial.tsx is deleted (dead code)

**Files:**
- Already deleted: `client/src/components/Testimonial/Testimonial.tsx` (handled in Task 1)

`Testimonial.tsx` is never imported on any page. It was deleted in Task 1 along with the other dead files. No further action needed.

- [ ] **Step 1: Verify the file is gone**

```bash
ls client/src/components/Testimonial/ 2>&1
```

Expected: `ls: cannot access '...' No such file or directory` — confirming deletion.

- [ ] **Step 2: Verify no broken imports**

```bash
cd client && npm run build 2>&1 | grep -i error | head -10
```

Expected: no errors referencing `Testimonial`.

---

## Task 9: Clean Section.tsx and index.css

**Files:**
- Modify: `client/src/components/Section.tsx`
- Modify: `client/src/index.css`

- [ ] **Step 1: Update Section.tsx** — remove `fade-in`, `ref={null}`, fix container nesting

```tsx
// client/src/components/Section.tsx
import { ReactNode } from 'react';
import clsx from 'clsx';
import type { Section as SectionType } from '../types';

interface SectionProps extends SectionType {
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, subtitle, children, className }: SectionProps) => {
  return (
    <section id={id} className={clsx('py-16 md:py-24', className)}>
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-noto mb-4 hidden">{title}</h2>
            {subtitle && <p className="text-xl font-roboto text-gray-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Remove fade-in rules from index.css**

Find and delete these lines from `client/src/index.css`:
```css
.fade-in {
  opacity: 0;
  transition: opacity 0.6s ease-in;
}

.fade-in.visible {
  opacity: 1;
}
```

Also update the `.section` rule — change from `py-6 pb-14` to the new rhythm:
```css
@layer components {
  .section {
    @apply py-16 md:py-24;
  }

  .container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/src/components/Section.tsx client/src/index.css
git commit -m "refactor: clean Section component and remove fade-in animation CSS"
```

---

## Task 10: Fix payment providers — main.tsx and App.tsx

**Files:**
- Modify: `client/src/main.tsx`
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Replace main.tsx** — remove Stripe wrapper entirely

```tsx
// client/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@fontsource/noto-serif/700.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 2: Update App.tsx** — remove global PayPal + Stripe providers, add Suspense

Replace the top of `App.tsx`:
```tsx
// client/src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer/index'));

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
const DonationSuccess = lazy(() => import('./pages/Donationations/DonationSuccess'));
const PaypalDonationSuccess = lazy(() => import('./pages/Donationations/PaypalSucess'));
const StripMonthlyDonationSuccess = lazy(() => import('./pages/Donationations/StripMonthlySucess'));
const Admission = lazy(() => import('./pages/Admission/AdmissionPage'));
const HowToApply = lazy(() => import('./pages/Admission/HowToApply'));
const Motivation = lazy(() => import('./pages/MotivationPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const Courses = lazy(() => import('./pages/CoursesPage'));
const Cohort = lazy(() => import('./pages/CohortPage'));
const BeADonor = lazy(() => import('./pages/MakeImpact/BeADonor'));
const Mentorship = lazy(() => import('./pages/MakeImpact/Mentorship'));
const GetTutorShip = lazy(() => import('./pages/MakeImpact/Tutorship'));
const TeachingAtZit = lazy(() => import('./pages/MakeImpact/TeachingAtZit'));
const AdmissionSuccess = lazy(() => import('./pages/Admission/AdminssionSuccessPage'));
const GuidingHandingProgram = lazy(() => import('./pages/MakeImpact/GuidingHandingProgram'));
const Fullstack = lazy(() => import('./pages/CoursesDetails/FullStackDevelopment'));
const UIUXDesign = lazy(() => import('./pages/CoursesDetails/UIUXDesign'));
const GraphicDesign = lazy(() => import('./pages/CoursesDetails/GraphicDesign'));
const CyberSecurity = lazy(() => import('./pages/CoursesDetails/CyberSercurity'));
const MicrosoftOffice = lazy(() => import('./pages/CoursesDetails/MicrosoftOfficeDetailPage'));
const DatabaseAdmin = lazy(() => import('./pages/CoursesDetails/DatabaseAdminDetailPage'));

import StudentModel from './components/Models/StudentModel';
import ParentModel from './components/Models/ParentModel';
import AdministrationModel from './components/Models/AdministrationModel';
import MentorModel from './components/Models/MentorModel';
import TutorModel from './components/Models/TutorModel';
import TeacherModel from './components/Models/TeacherModel';
import MenteeModel from './components/Models/MenteeModel';
const IccSucessPage = lazy(() => import('./pages/IccSucessPage'));

import { storeReferralCode } from './hooks/refTracdker';

function App() {
  storeReferralCode();
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-primary" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cohorts" element={<Cohort />} />
              <Route path="/how-to-apply" element={<HowToApply />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/motivation" element={<Motivation />} />
              <Route path="/impact-connect-center" element={<GuidingHandingProgram />} />
              <Route path="/mentorship-program" element={<Mentorship />} />
              <Route path="/teaching-at-zit" element={<TeachingAtZit />} />
              <Route path="/tutorship-program" element={<GetTutorShip />} />
              <Route path="/be-a-donor" element={<BeADonor />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/admission-success" element={<AdmissionSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/success" element={<DonationSuccess />} />
              <Route path="/paypal-success" element={<PaypalDonationSuccess />} />
              <Route path="/stripe-monthly-success" element={<StripMonthlyDonationSuccess />} />
              <Route path="/courses/ui-ux-design" element={<UIUXDesign />} />
              <Route path="/courses/graphic-design" element={<GraphicDesign />} />
              <Route path="/courses/cybersecurity" element={<CyberSecurity />} />
              <Route path="/courses/full-stack-development" element={<Fullstack />} />
              <Route path="/courses/microsoft-office" element={<MicrosoftOffice />} />
              <Route path="/courses/database-admin" element={<DatabaseAdmin />} />
              <Route path="/icc-student" element={<StudentModel />} />
              <Route path="/icc/teacher" element={<TeacherModel />} />
              <Route path="/icc/parent-guardian" element={<ParentModel />} />
              <Route path="/icc/mentor" element={<MentorModel />} />
              <Route path="/icc/tutor" element={<TutorModel />} />
              <Route path="/icc/mentee" element={<MenteeModel />} />
              <Route path="/icc/administration" element={<AdministrationModel />} />
              <Route path="/icc-success" element={<IccSucessPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Verify donation page still works — check DonationPage imports its own providers**

```bash
cd client && grep -n "PayPalScriptProvider\|Elements" src/pages/Donationations/DonationPage.tsx | head -5
```

Expected: output shows `PayPalScriptProvider` and `Elements` still present inside DonationPage — confirming it self-manages providers.

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -5
```

Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
cd ..
git add client/src/main.tsx client/src/App.tsx
git commit -m "perf: scope Stripe/PayPal to donation route, add Suspense boundary"
```

---

## Task 11: Configure Vite bundle splitting and install image optimizer

**Files:**
- Modify: `client/vite.config.ts`

- [ ] **Step 1: Install vite-plugin-image-optimizer**

```bash
cd client && npm install -D vite-plugin-image-optimizer
```

- [ ] **Step 2: Replace vite.config.ts**

```ts
// client/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          'vendor-paypal': ['@paypal/react-paypal-js'],
          'vendor-swiper': ['swiper'],
          'vendor-utils': ['axios', 'lucide-react'],
        },
      },
    },
  },
  server: {
    port: 4000,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build 2>&1 | tail -10
```

Expected: build completes, output shows multiple chunk files including `vendor-react`, `vendor-stripe`, `vendor-paypal`.

- [ ] **Step 4: Commit**

```bash
cd ..
git add client/vite.config.ts client/package.json client/package-lock.json
git commit -m "perf: add Vite manual chunks and image optimizer plugin"
```

---

## Task 12: Add loading="lazy" to remaining img tags site-wide

**Files:** Multiple — grep-identified img tags missing `loading="lazy"`

- [ ] **Step 1: Find all img tags missing lazy loading**

```bash
cd client && grep -rn '<img' src/ --include="*.tsx" | grep -v 'loading=' | grep -v 'node_modules'
```

This lists every `<img>` without a `loading` attribute. Work through each file.

- [ ] **Step 2: Add to TutorshipSection.tsx** — 4 card images

In `client/src/components/HomePageComponent/TutorshipSection.tsx`, find each `<img` and add `loading="lazy" decoding="async"`:
```tsx
<img
  src={card.img}
  alt={card.label}
  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
  loading="lazy"
  decoding="async"
/>
```

- [ ] **Step 3: Add to TTM.tsx** — tab images

In `client/src/components/HomePageComponent/TTM.tsx`, find the `<img` element and add `loading="lazy" decoding="async"`:
```tsx
<img
  src={tabContent[activeTab].image}
  alt={`${activeTab} Image`}
  className="w-full h-[100%] rounded-lg shadow-md object-cover"
  loading="lazy"
  decoding="async"
/>
```

- [ ] **Step 4: Add to TeachSomeon.tsx**

In `client/src/components/HomePageComponent/Hero/TeachSomeon.tsx`:
```tsx
<img
  src={image}
  alt="Mentor smiling"
  className="md:w-[94%] md:h-100%] w-full object-cover relative top-2 left-3"
  loading="lazy"
  decoding="async"
/>
```

- [ ] **Step 5: Run the grep check again to confirm no remaining unlazyloaded imgs**

```bash
cd client && grep -rn '<img' src/ --include="*.tsx" | grep -v 'loading=' | grep -v 'node_modules'
```

Expected: empty output (all img tags have `loading=`).

- [ ] **Step 6: Commit**

```bash
cd ..
git add client/src/
git commit -m "perf: add loading=lazy decoding=async to all img tags"
```

---

## Task 13: Update tailwind.config.js spacing tokens

**Files:**
- Modify: `client/tailwind.config.js`

- [ ] **Step 1: Add spacing tokens**

```js
// client/tailwind.config.js
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000054',
        secondary: '#E32845',
        accent: '#060657',
        dparacolor: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        noto: ['Noto Serif', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: ['1.75rem', { lineHeight: '1.3', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }],
        h4: ['1.125rem', { lineHeight: '1.3', fontWeight: '500' }],
        h5: ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }],
        h6: ['1rem', { lineHeight: '1.3', fontWeight: '400' }],
        p: ['1rem', { lineHeight: '1.3', fontWeight: '400' }],
      },
      spacing: {
        'section': '4rem',
        'section-lg': '6rem',
      },
    },
  },
  plugins: [forms, aspectRatio],
};
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add client/tailwind.config.js
git commit -m "style: add section spacing tokens to tailwind config"
```

---

## Task 14: Apply unified spacing — OurApproach, ProgramsWeOffer, StudyAtZit

**Files:**
- Modify: `client/src/components/HomePageComponent/OurApproach.tsx`
- Modify: `client/src/components/HomePageComponent/ProgramsWeOffer.tsx`
- Modify: `client/src/components/HomePageComponent/StudyAtZit.tsx`

- [ ] **Step 1: Rewrite OurApproach.tsx** — replace outer `div` + inner `section` with the standard two-layer pattern

```tsx
// client/src/components/HomePageComponent/OurApproach.tsx
import { memo } from 'react';
import { GlassCard } from '../GlassCard';
import { FaArrowsDownToPeople, FaPeoplePulling } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";

const approaches = [
  {
    title: 'Teach',
    description: 'Lay a Strong Foundation',
    note: "Deliver structured, high-quality tech education that empowers students with essential knowledge, critical thinking skills, and hands-on experience to excel in the digital world.",
    icon: GiTeacher,
  },
  {
    title: 'Tutor',
    description: 'Reinforce and Support',
    icon: FaPeoplePulling,
    note: "Provide personalized guidance and hands-on support to help students master concepts, overcome challenges, and confidently apply their knowledge",
  },
  {
    title: 'Mentor',
    description: 'Inspire and Give Back',
    icon: FaArrowsDownToPeople,
    note: "Equip students to guide and uplift others, fostering a culture of continuous learning, leadership, and community transformation.",
  },
];

const ApproachCard = memo(({ approach, index }: { approach: typeof approaches[0], index: number }) => (
  <div className="relative" key={index}>
    <GlassCard
      className="p-4 h-full w-80 bg-transparent backdrop-blur-md border border-gray-300 transition-all duration-300 hover:translate-y-1"
      glowColor={`from-primary-${(index + 4) * 100}/20`}
    >
      <approach.icon className="w-10 h-10 text-secondary mb-4" />
      <h3 className="text-lg font-noto font-semibold mb-2 text-primary">{approach.title}</h3>
      <h4 className="text-gray-900 font-noto text-md font-bold">{approach.description}</h4>
      <p className="text-gray-700 font-roboto mt-4">{approach.note}</p>
    </GlassCard>
  </div>
));

const OurApproach = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-xl font-noto md:text-2xl font-bold mb-4 text-primary">Our Approach</h2>
          <p className="text-lg font-roboto text-dparacolor max-w-2xl mx-auto">
            Revolutionizing tech education through mentorship, experiential learning, and a community-driven approach to impact.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {approaches.map((approach, index) => (
            <ApproachCard key={approach.title} approach={approach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
```

- [ ] **Step 2: Rewrite ProgramsWeOffer.tsx** — add `py-16 md:py-24` to section

```tsx
// client/src/components/HomePageComponent/ProgramsWeOffer.tsx
// Change only the outer section tag — find:
<section id="programs" title="Programs section" className="relative bg-gray-200">
  <div className="container mx-auto px-4">
// Replace with:
<section id="programs" className="py-16 md:py-24 bg-gray-200">
  <div className="container">
```

Leave all inner content unchanged.

- [ ] **Step 3: Rewrite StudyAtZit.tsx** — remove outer div wrapper, fix inner section

```tsx
// client/src/components/HomePageComponent/StudyAtZit.tsx
import { Link } from "react-router-dom";
import SideImg3 from "../../asset/images/Study at ZIT.jpg";

export default function StudyAtZit() {
  return (
    <section className="py-16 md:py-24 bg-gray-200">
      <div className="container">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="font-noto text-2xl font-bold text-primary">Study at ZIT</h2>
          <p className="mt-2 font-roboto text-dparacolor md:w-[44rem] md:px-0 px-6">
            At Zongea Institute of Technology, we go beyond traditional education to ensure students learn, apply, and excel in real-world scenarios. Our Teach, Tutor, and Mentor (TTM) model provides a structured approach to hands-on learning, personalized support, and career-focused training to prepare you for success in the ever-evolving tech industry.
          </p>
          <div className="relative mt-8 md:w-[90%] max-w-full flex flex-col sm:flex-row sm:items-start gap-6">
            <img src={SideImg3} alt="Study at ZIT" className="w-full sm:w-[40rem] h-[22rem] mt-8 object-cover" loading="lazy" decoding="async" />
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
              <div className="flex flex-col justify-center gap-4 px-10 py-8 lg:absolute md:left-[45%] lg:left-[60%] lg:top-[20%] bg-primary text-white w-full h-auto sm:w-[30rem] shadow-lg mt-6 sm:mt-0">
                <h3 className="font-semibold font-noto text-lg">Hands-On Learning Experience</h3>
                <p className="mt-2 font-roboto text-sm">
                  Our programs are designed to bridge the gap between knowledge and application with a real-world, project-based curriculum. Through interactive learning and problem-solving exercises, students gain the confidence and technical skills to tackle challenges, build solutions, and excel in their fields.
                </p>
                <Link to="/admission" className="flex font-sans justify-center items-center hover:bg-white hover:text-primary font-medium mt-4 text-white bg-secondary hover:font-semibold w-32 h-8 rounded-md">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/OurApproach.tsx \
        client/src/components/HomePageComponent/ProgramsWeOffer.tsx \
        client/src/components/HomePageComponent/StudyAtZit.tsx
git commit -m "style: apply unified section spacing to OurApproach, ProgramsWeOffer, StudyAtZit"
```

---

## Task 15: Apply unified spacing — TTM, TutorshipSection, TeachSomeone

**Files:**
- Modify: `client/src/components/HomePageComponent/TTM.tsx`
- Modify: `client/src/components/HomePageComponent/TutorshipSection.tsx`
- Modify: `client/src/components/HomePageComponent/Hero/TeachSomeon.tsx`

- [ ] **Step 1: Update TTM.tsx** — replace raw padding with standard pattern

Find the opening section tag:
```tsx
<section className=" bg-gray-100 h-auto px-4 md:px-28 py-20">
```
Replace with:
```tsx
<section className="py-16 md:py-24 bg-gray-100">
```

Then wrap the entire interior content (starting from the `<h2>` heading) in `<div className="container">...</div>`.

The result:
```tsx
<section className="py-16 md:py-24 bg-gray-100">
  <div className="container">
    <h2 className="text-2xl font-bold font-noto text-primary">
      Opportunities to Educate, Inspire, and Lead
    </h2>
    <p className="md:w-[60%] text-dparacolor font-roboto mt-6">
      Join a dynamic community where you can enhance your skills, make a tangible impact, and inspire future leaders. Shape minds, foster growth, and lead with purpose.
    </p>
    {/* Content Section - Dynamic Update */}
    <div className="flex flex-col md:flex-row items-center mt-10 gap-6">
      {/* ... rest of content unchanged ... */}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update TutorshipSection.tsx** — replace raw padding

Find:
```tsx
<section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-16 bg-white">
```
Replace with:
```tsx
<section className="py-16 md:py-24 bg-white">
  <div className="container flex flex-col md:flex-row items-center justify-between">
```
And close the `container` div before the closing `</section>`.

- [ ] **Step 3: Update TeachSomeon.tsx** — replace raw padding

Find:
```tsx
<section className=" flex flex-col md:flex-row items-center justify-between px-4 md:px-40 pt-16 pb-4 md:pb-20 bg-white">
```
Replace with:
```tsx
<section className="py-16 md:py-24 bg-white">
  <div className="container flex flex-col md:flex-row items-center justify-between">
```
And close the `container` div before `</section>`.

- [ ] **Step 4: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/TTM.tsx \
        client/src/components/HomePageComponent/TutorshipSection.tsx \
        client/src/components/HomePageComponent/Hero/TeachSomeon.tsx
git commit -m "style: apply unified section spacing to TTM, TutorshipSection, TeachSomeone"
```

---

## Task 16: Apply unified spacing — SuccessStory, UpcomingEvents, ReadyToStartSec, GroundWork

**Files:**
- Modify: `client/src/components/HomePageComponent/Hero/SuccessStory.tsx`
- Modify: `client/src/components/HomePageComponent/UpComingEvent.tsx`
- Modify: `client/src/components/MotivationPage/ReadyToStartSec.tsx`
- Modify: `client/src/components/MotivationPage/GroundWork.tsx`

- [ ] **Step 1: Update SuccessStory.tsx** — wrap outermost `div` in section with container

Find:
```tsx
<div className="w-full bg-white mx-auto px-6 md:px-10 h-full py-16 overflow-hidden">
```
Replace with:
```tsx
<section className="py-16 md:py-24 bg-white overflow-hidden">
  <div className="container">
```
And change the closing `</div>` to `</div></section>`.

- [ ] **Step 2: Update UpComingEvent.tsx** — fix `py-12` and remove ad-hoc `md:px-32` from grid

Find:
```tsx
<section className="py-12 bg-gray-100">
  <div className="container mx-auto text-left">
    ...
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-32">
```
Replace with:
```tsx
<section className="py-16 md:py-24 bg-gray-100">
  <div className="container">
    ...
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
```

- [ ] **Step 3: Update ReadyToStartSec.tsx** — standardise the outer div to section

Find:
```tsx
<div className="text-white py-16" style={{...}}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
```
Replace with:
```tsx
<section className="py-16 md:py-24 text-white" style={{...}}>
  <div className="container text-center">
```
And close `</section>` instead of `</div>`.

- [ ] **Step 4: GroundWork.tsx already uses Section component** — verify Section applies `py-16 md:py-24` (Task 9 handled this). No change needed here beyond confirming.

```bash
cd client && grep -n "py-16\|py-section" src/components/Section.tsx
```

Expected: output includes `py-16` confirming the Section component got updated in Task 9.

- [ ] **Step 5: Commit**

```bash
cd ..
git add client/src/components/HomePageComponent/Hero/SuccessStory.tsx \
        client/src/components/HomePageComponent/UpComingEvent.tsx \
        client/src/components/MotivationPage/ReadyToStartSec.tsx
git commit -m "style: apply unified section spacing to SuccessStory, UpcomingEvents, ReadyToStartSec"
```

---

## Task 17: Final verification

- [ ] **Step 1: Full production build**

```bash
cd client && npm run build
```

Expected: build completes with no TypeScript errors, no missing module errors.

- [ ] **Step 2: Check bundle output — verify vendor splits**

```bash
ls -lh dist/assets/*.js | sort -k5 -rh | head -10
```

Expected: multiple JS files including chunks named `vendor-react`, `vendor-stripe`, `vendor-paypal`, `vendor-swiper`. Main entry chunk should be well under 500KB.

- [ ] **Step 3: Verify no framer-motion or three.js in the build**

```bash
grep -r "framer-motion\|@react-three\|daily-co" dist/ 2>/dev/null | head -5
```

Expected: no output (these packages are gone from the bundle).

- [ ] **Step 4: Verify no AnimateOnScroll references remain**

```bash
grep -rn "AnimateOnScroll" client/src/ --include="*.tsx"
```

Expected: no output.

- [ ] **Step 5: Spot-check spacing — grep for banned padding patterns**

```bash
grep -rn "px-28\|px-40\|md:px-60\|lg:px-32\|ml-\[8%\]\|px-31" client/src/ --include="*.tsx"
```

Expected: no output. These ad-hoc padding classes should all be gone.

- [ ] **Step 6: Run dev server and do a visual check**

```bash
npm run dev
```

Open `http://localhost:4000` and scroll through the homepage verifying:
- Hero crossfades between images smoothly (no flash)
- Sections have consistent horizontal margins as you scroll
- No blank white flash between sections while loading
- Payment scripts do NOT appear in the Network tab until `/donate` is visited

- [ ] **Step 7: Final commit**

```bash
cd ..
git add -A
git commit -m "chore: complete performance and spacing overhaul"
```
