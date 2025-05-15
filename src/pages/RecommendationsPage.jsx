import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ExternalLink, Check, Loader } from "lucide-react";

const genAI = new GoogleGenerativeAI("AIzaSyBfydMVeTuKMaIF2DekcUE9hGrYkGXj3A0");

function RecommendationsPage({ bodyData, gender }) {
  const [recommendations, setRecommendations] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();
  console.log(bodyData, gender);
  useEffect(() => {
    if (!bodyData) {
      navigate("/analysis");
      return;
    }

    const fetchRecommendations = async () => {
      const prompt = `
Based on the following details:
Gender: ${gender}
Type: ${bodyData.bodyType.type}
Description: ${bodyData.bodyType.description}
Features: ${bodyData.bodyType.features.join(", ")}

Give me outfit recommendations for the categories: casual, formal, workwear, accessories.
Each category should include 3 items with:
- name
- description
- image (valid URL)
- tags
- reasonText

Format as:
{
  "casual": [...],
  "formal": [...],
  "workwear": [...],
  "accessories": [...]
}
`;

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Clean and parse the result
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}");
        const cleanJson = text.slice(jsonStart, jsonEnd + 1);
        const data = JSON.parse(cleanJson);

        setRecommendations(data);
      } catch (err) {
        console.error("Gemini error:", err);
        alert("Failed to fetch recommendations.");
      }
    };

    fetchRecommendations();
  }, [bodyData, navigate,gender]);

  if (!recommendations)
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader className="animate-spin h-6 w-6 text-[#D81B60] mb-3" />
        <p className="text-center text-[#D81B60]">Loading recommendations...</p>
      </div>
    );

  const toggleSaveItem = (itemId) => {
    setSavedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderOutfitCard = (outfit, index, category) => (
    <Card
      key={index}
      className="overflow-hidden hover:shadow-lg transition-shadow relative"
    >
      <img
        src={outfit.image}
        alt={outfit.name}
        className="w-full h-64 object-cover"
      />
      <span className="absolute top-2 left-2 bg-[#D81B60] text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
        {category}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 bg-white hover:bg-[#FCE4EC] border-none"
        onClick={() => toggleSaveItem(`${outfit.name}-${category}`)}
      >
        {savedItems.includes(`${outfit.name}-${category}`) ? (
          <Heart className="h-5 w-5 fill-[#D81B60] text-[#D81B60]" />
        ) : (
          <Heart className="h-5 w-5 text-[#D81B60]" />
        )}
      </Button>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-[#D81B60]">
          {outfit.name}
        </h3>
        <p className="text-neutral-600 text-sm mb-3">{outfit.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {outfit.tags?.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              className="bg-[#FCE4EC] text-[#D81B60] border-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-sm">
          <p className="font-medium text-[#D81B60]">Why this works:</p>
          <p className="text-neutral-600">{outfit.reasonText}</p>
        </div>
      </CardContent>
      <Separator />
    </Card>
  );

  const allOutfits = ["casual", "formal", "workwear", "accessories"].flatMap(
    (category) =>
      (recommendations[category] || []).map((item, index) =>
        renderOutfitCard(item, index, category)
      )
  );

  return (
  <div className="container px-4 py-10 max-w-7xl mx-auto animate-fade-in">
    <div className="text-center mb-10 transition-opacity duration-700">
      <h1 className="text-3xl font-bold text-[#D81B60] mb-2 animate-slide-in-up">
        Your Personal Style Recommendations
      </h1>
      <p className="text-neutral-600 max-w-2xl mx-auto animate-fade-in-up">
        Based on your {bodyData.bodyType.type} body shape, we've curated these
        AI-powered recommendations to flatter your natural silhouette.
      </p>

      <div className="mt-6 p-5 bg-[#FCE4EC] rounded-lg max-w-2xl mx-auto animate-slide-in-up">
        <h2 className="text-xl font-semibold text-[#D81B60] mb-3">
          Your Body Shape: {bodyData.bodyType.type}
        </h2>
        <p className="text-neutral-700 mb-4">{bodyData.bodyType.description}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {bodyData.bodyType.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-white px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105"
            >
              <Check className="h-4 w-4 text-[#D81B60] mr-1" />
              <span className="text-sm text-neutral-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {!recommendations || Object.keys(recommendations).length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-10 animate-fade-in">
        <Loader className="animate-spin h-6 w-6 text-[#D81B60] mb-3" />
        <p className="text-center text-[#D81B60]">
          Loading recommendations...
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {allOutfits}
      </div>
    )}

    <div className="mt-10 text-center animate-fade-in-up">
      <p className="text-neutral-600 mb-4">
        Not seeing what you like? Try another analysis or explore more styles.
      </p>
      <Button
        variant="outline"
        className="border-[#D81B60] text-[#D81B60] hover:bg-[#FCE4EC] transition-transform duration-300 hover:scale-105"
        onClick={() => navigate("/analysis")}
      >
        New Analysis
      </Button>
    </div>
  </div>
);

}

export default RecommendationsPage;
