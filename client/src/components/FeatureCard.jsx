


const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg  text-left h-120 pt-28  hover:bg-stone-100">
      <img src={image} alt={title} className="w-20 h-20 object-cover rounded-md" />
      <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <button class="w-40 bg-customOrange hover:bg-hoverOrange text-white py-3 rounded-full my-8">
            Saznaj više
      </button>
    </div>
  );
};

export default FeatureCard;
