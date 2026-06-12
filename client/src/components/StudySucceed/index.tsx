const StudySucceed = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Transformative Testimonials</h2>
          <p className="text-gray-600 mb-8 text-sm">
            Discover how our coding school has empowered individuals to embark on successful tech careers. Hear firsthand experiences from our alumni who have transformed their lives through coding education and unlocked exciting opportunities in the tech industry.
          </p>
        </div>
        <div className="space-y-2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
            alt="Students collaborating"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="grid grid-cols-2 gap-4 mt-24">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
              alt="Campus facilities"
              className="rounded-lg shadow-lg w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
              alt="Learning activities"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudySucceed;
