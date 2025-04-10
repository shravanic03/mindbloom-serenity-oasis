
import Button from "./Button";

interface TherapistCardProps {
  name: string;
  title: string;
  specialization: string[];
  image: string;
  availability?: string;
}

const TherapistCard = ({ name, title, specialization, image, availability }: TherapistCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover-scale">
      <div className="aspect-square w-full overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-mindbloom-purple text-sm mb-2">{title}</p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mt-2">
            {specialization.map((spec, index) => (
              <span key={index} className="text-xs px-2 py-1 rounded-full bg-mindbloom-purple/10 text-mindbloom-purple">
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        {availability && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Availability:</span> {availability}
          </p>
        )}
        
        <Button variant="gradient" className="w-full" to="/appointment">
          Book Session
        </Button>
      </div>
    </div>
  );
};

export default TherapistCard;
