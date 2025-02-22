import FeatureCard from "./FeatureCard";
import chat from '../assets/chat-icon.png';
import form from '../assets/form-icon.png';


const FeaturesSection = () => {
  return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-20" id="featuresSection">
         <a href="/chat">    <FeatureCard
          image={chat}
          title="Kreiranje uz pomoć chata"
          description="Interaktivno kreirajte svoju web stranicu kroz jednostavan razgovor. Odgovarajte na pitanja i dobijte gotovu stranicu u samo nekoliko koraka!"
          /></a>
          <a href="/form">    <FeatureCard
            image={form}
            title="Kreiranje preko forme"
            description="Precizno unesite sve potrebne podatke kroz intuitivnu formu i odmah generirajte profesionalnu web stranicu bez komplikacija"
          /></a>

      
      </section>
  );
};

export default FeaturesSection;
