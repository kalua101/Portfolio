export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Building digital experiences that matter
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            I'm a full-stack software engineer and data science enthusiast currently pursuing a Bachelor's Degree 
            in Computer Science at Hope Enterprise University College (2024-2027). As an Engineer Intern at the 
            Space Science and Geospatial Institute (SSGI), I work on cutting-edge deep learning projects that 
            forecast geomagnetic activity using NASA OMNI solar wind datasets.
          </p>
          <p>
            My expertise spans modern web technologies (Next.js, React, FastAPI, PostgreSQL) and machine learning 
            frameworks (PyTorch, LSTM-GRU architectures). I'm passionate about building production-ready applications 
            that solve real-world problems—from agricultural marketplaces connecting Ethiopian farmers to urban 
            buyers, to time-series forecasting models for space weather prediction.
          </p>
          <p>
            Based in Addis Ababa, Ethiopia, I combine clean code principles with innovative thinking to create 
            scalable solutions that bridge the gap between software engineering and data science.
          </p>
        </div>
      </div>
    </section>
  );
}
