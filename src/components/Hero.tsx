import Button from "./Button";

interface HeroProps {
  title: string;
  description: string;
  imageSrc?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Hero = ({
  title,
  description,
  imageSrc,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight gradient-text">
              {title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryButtonText && primaryButtonLink && (
                <Button variant="gradient" size="lg" to={primaryButtonLink}>
                  {primaryButtonText}
                </Button>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Button variant="outline" size="lg" to={secondaryButtonLink}>
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Hero"
                className="max-w-md w-full rounded-2xl shadow-lg animate-float"
              />
            ) : (
              <div className="bg-pink-purple-gradient w-full max-w-md aspect-square rounded-full blur-3xl opacity-50 absolute -right-32 -top-32"></div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute -z-10 inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-PMHS-purple-light/30 to-PMHS-pink-light/30 transform -skew-y-6"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-r from-PMHS-pink-light/30 to-PMHS-purple-light/30 transform skew-y-6"></div>
      </div>
    </div>
  );
};

export default Hero;
