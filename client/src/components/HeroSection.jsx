import Scan from '../assets/scanCode.png';
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-between mt-20">
      <div className="w-1/2">
        <h1 className="text-7xl font-bold">Kreiraj svoju onepage stranicu</h1>
        <p className="mt-4 text-xl text-gray-700">
          Jednostavan način kreiranja web stranica i još jednostavniji način dijeljenja pomoću QR koda
        </p>
     
        <div class="flex space-x-4 mt-10">
          <button class="w-40 bg-customOrange hover:bg-hoverOrange text-white py-3 rounded-full"  onClick={() => navigate("/aboutUs")}>
            Saznaj više
          </button>
          <HashLink to="/#featuresSection">
          <button class="w-40 bg-white hover:bg-stone-100 text-black border border-gray-500 py-3 rounded-full">
            Kreni s izradom
          </button>
          </HashLink>
        </div>

      </div>
      <div className="w-1/2 flex justify-end">
        <img
          src={Scan}
          alt="Hero Image"
          className="w-86 "
        />
      </div>
    </section>
  );
};

export default HeroSection;
