import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust this import as needed
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-5xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#D81B60] mb-4 animate-slide-in-up">
          About AI Fashion Stylist
        </h1>
        <p className="text-neutral-600 text-lg animate-fade-in-up">
          Revolutionizing fashion through AI – personalized, inclusive, and body-positive.
        </p>
      </div>

      <div className="bg-[#FCE4EC] p-6 rounded-lg shadow-md mb-12 animate-slide-in-up">
        <h2 className="text-2xl font-semibold text-[#D81B60] mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          What We Do
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          AI Fashion Stylist is your smart companion for choosing outfits that suit <strong>
            your unique body type</strong>. 
          Our AI model analyzes your uploaded image to determine your <strong>
            body shape</strong>, and then suggests outfits tailored to your <strong>
                gender and silhouette</strong>. Whether you have a pear, apple, hourglass, or athletic body type – we help you feel confident and stylish every day.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in-up">
        <div className="bg-white p-6 rounded-lg shadow animate-slide-in-up hover:shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-[#D81B60] mb-2">✨ AI-Powered Analysis</h3>
          <p className="text-neutral-700">
            We use advanced computer vision models to understand your body structure from a single image and classify your body type accurately in seconds.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow animate-slide-in-up">
          <h3 className="text-xl font-bold text-[#D81B60] mb-2">🧥 Style Tailored to You</h3>
          <p className="text-neutral-700">
            Our AI recommends outfits that highlight your best features and are personalized for your gender, ensuring a flattering and empowering style.
          </p>
        </div>
      </div>

      <div className="text-center mt-12 animate-fade-in-up">
        <p className="text-neutral-600 mb-4">
          Want to discover your perfect style?
        </p>
        <Button
          className="bg-[#D81B60] text-white hover:bg-[#c2185b]"
          onClick={() => navigate("/analysis")}
        >
          Try Style Analysis
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
