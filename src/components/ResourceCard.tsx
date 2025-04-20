import { Link } from "react-router-dom";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  title: string;
  description: string;
  image?: string;
  symptoms?: string[];
  link?: string;
  linkText?: string;
  className?: string;
}

const ResourceCard = ({
  title,
  description,
  image,
  symptoms,
  link,
  linkText = "Learn More",
  className,
}: ResourceCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md hover-scale",
        className
      )}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {symptoms && symptoms.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Helpful for:
            </h4>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-PMHS-purple/10 text-PMHS-purple"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {link && (
          <div className="mt-4">
            <Button variant="outline" size="sm" to={link}>
              {linkText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
