import style from "../About/About.module.css";

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className={style.tittleWrapper}>
            <img
              className={style.img}
              src="https://w0.peakpx.com/wallpaper/260/18/HD-wallpaper-car-road-mountains-forest-nature.jpg"
              alt="car"
            />
            <h1 className={style.title}>
              Revolutionizing the Road: Unveiling the Ultimate Car Dealership
              Experience
            </h1>
          </div>
          <h3>Sleek Showroom Design:</h3>
          <p>
            Step into the future with our state-of-the-art showroom, designed to
            captivate and inspire. The ULDIS & CO boasts a sleek and
            modern design that sets the stage for an immersive car-buying
            journey. From ambient lighting to interactive displays, every
            element is crafted to enhance your overall experience.
          </p>
          <h3>Diverse Car Selection:</h3>
          <p>
            At ULDIS & CO, we understand that every driver is unique.
            That's why our dealership showcases an extensive range of vehicles,
            from fuel-efficient compacts to luxurious SUVs and powerful trucks.
            Our curated selection ensures that you find the perfect vehicle to
            match your lifestyle and preferences.
          </p>
          <h3>Innovative Technology Integration:</h3>
          <p>
            Embracing the digital age, ULDIS & CO incorporates
            cutting-edge technology to streamline the car-buying process.
            Explore our interactive touchscreens to customize your dream car,
            and experience virtual test drives using virtual reality (VR)
            technology. We're not just selling cars; we're offering a
            technological journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
