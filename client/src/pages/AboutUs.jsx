import Header from "../components/Header";




const AboutUs = () => {
  return (
     <div className="max-w-[1240px] mx-auto mb-80" >
      <Header />
    <section className="max-w-4xl mx-auto pt-28 px-4">
        <h1 className="text-4xl font-bold text-customOrange mb-14 text-center">O nama</h1>
        <p className="text-gray-700 leading-7 mb-4 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eget orci eget dolor consequat tincidunt. In facilisis, turpis at
          fermentum ultrices, eros nulla vulputate magna, vel posuere risus
          velit nec erat. Morbi gravida, metus nec tempus tincidunt, mauris
          nisl placerat odio, ut tincidunt nisi ex sed nisl.
        </p>
        <p className="text-gray-700 leading-7 mb-4 text-lg">
          Vivamus fermentum urna in fermentum dignissim. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Nulla facilisi. In sed nunc et sem vestibulum iaculis.
        </p>
        <p className="text-gray-700 leading-7 text-lg">
          Donec imperdiet lacinia diam, a vulputate velit. Nulla facilisi.
          Integer id tincidunt quam, nec pretium ligula. Nam rutrum diam non
          justo consectetur, sed feugiat nunc malesuada.
        </p>
    </section>
    </div>
  );
};

export default AboutUs;
