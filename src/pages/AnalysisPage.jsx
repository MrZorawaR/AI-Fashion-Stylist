import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, RefreshCw, ThumbsUp } from "lucide-react";
import { analyzeBodyShape } from "../services/bodyAnalyzerService";
import { getRecommendations } from "../services/recommendationService";

function AnalysisPage({ setBodyData, setRecommendations , setGender }) {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [detector, setDetector] = useState(null);
  const [progress, setProgress] = useState(0);
  const [bodyMeasurements, setBodyMeasurements] = useState(null);
  const [bodyType, setBodyType] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const [gender, setGender] = useState("");

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);

        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true,
        };

        const model = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );

        setDetector(model);
        setIsModelLoading(false);

        toast({
          title: "Model loaded successfully",
          description: "You can now upload an image for analysis",
        });
      } catch (error) {
        console.error("Error loading model:", error);
        toast({
          variant: "destructive",
          title: "Error loading model",
          description: "Please refresh the page and try again.",
        });
      }
    };

    loadModel();
  }, [toast]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file.",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!detector || !selectedImage || !canvasRef.current) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Create a progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      // Create an image element for analysis
      const img = new Image();
      img.src = imagePreview;
      await img.decode(); // Ensure image is loaded

      // Set canvas dimensions to match image
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;

      // Draw image on canvas
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get pose
      const poses = await detector.estimatePoses(img);

      if (poses && poses.length > 0) {
        // Draw keypoints
        drawKeypoints(poses[0], ctx);

        // Calculate body measurements
        const measurements = calculateBodyMeasurements(poses[0]);
        setBodyMeasurements(measurements);

        // Analyze body shape
        const shape = analyzeBodyShape(measurements);
        setBodyType(shape);

        // Complete progress
        clearInterval(progressInterval);
        setProgress(100);
        setIsAnalyzing(false);

        // Combine data
        const bodyData = {
          measurements,
          bodyType: shape,
        };

        // Set data for parent component
        setBodyData(bodyData);

        toast({
          title: "Analysis complete",
          description: `Your body type has been identified as ${shape.type}`,
        });
      } else {
        clearInterval(progressInterval);
        setProgress(0);
        setIsAnalyzing(false);
        toast({
          variant: "destructive",
          title: "No pose detected",
          description: "Please upload a clear, full-body image.",
        });
      }
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      setIsAnalyzing(false);
      console.error("Error analyzing image:", error);
      toast({
        variant: "destructive",
        title: "Error analyzing image",
        description: "Please try again with a different image.",
      });
    }
  };

  const drawKeypoints = (pose, ctx) => {
    if (!pose || !pose.keypoints) return;

    // Draw keypoints
    pose.keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.3) {
        const { x, y } = keypoint;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#D81B60";
        ctx.fill();
      }
    });

    // Draw connections
    drawConnections(pose, ctx);
  };

  const drawConnections = (pose, ctx) => {
    const connections = [
      ["nose", "left_eye"],
      ["nose", "right_eye"],
      ["left_eye", "left_ear"],
      ["right_eye", "right_ear"],
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["right_shoulder", "right_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_elbow", "right_wrist"],
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"],
      ["left_hip", "right_hip"],
      ["left_hip", "left_knee"],
      ["right_hip", "right_knee"],
      ["left_knee", "left_ankle"],
      ["right_knee", "right_ankle"],
    ];

    ctx.strokeStyle = "#FCE4EC";
    ctx.lineWidth = 2;

    const keypoints = {};
    pose.keypoints.forEach((keypoint) => {
      keypoints[keypoint.name] = keypoint;
    });

    connections.forEach(([p1, p2]) => {
      const point1 = keypoints[p1];
      const point2 = keypoints[p2];

      if (point1 && point2 && point1.score > 0.3 && point2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
      }
    });
  };

  const calculateBodyMeasurements = (pose) => {
    const keypoints = {};
    pose.keypoints.forEach((keypoint) => {
      keypoints[keypoint.name] = keypoint;
    });

    // Calculate shoulder width
    const shoulderWidth = calculateDistance(
      keypoints.left_shoulder,
      keypoints.right_shoulder
    );

    // Calculate hip width
    const hipWidth = calculateDistance(keypoints.left_hip, keypoints.right_hip);

    // Calculate waist (estimate)
    const leftWaist = {
      x:
        keypoints.left_shoulder.x +
        0.5 * (keypoints.left_hip.x - keypoints.left_shoulder.x),
      y:
        keypoints.left_shoulder.y +
        0.5 * (keypoints.left_hip.y - keypoints.left_shoulder.y),
    };

    const rightWaist = {
      x:
        keypoints.right_shoulder.x +
        0.5 * (keypoints.right_hip.x - keypoints.right_shoulder.x),
      y:
        keypoints.right_shoulder.y +
        0.5 * (keypoints.right_hip.y - keypoints.right_shoulder.y),
    };

    const waistWidth = calculateDistance(leftWaist, rightWaist);

    // Calculate height (top to bottom)
    const height = Math.max(
      calculateDistance(keypoints.nose, keypoints.left_ankle),
      calculateDistance(keypoints.nose, keypoints.right_ankle)
    );

    return {
      shoulderWidth,
      waistWidth,
      hipWidth,
      height,
      shoulderToHipRatio: shoulderWidth / hipWidth,
      waistToHipRatio: waistWidth / hipWidth,
      shoulderToWaistRatio: shoulderWidth / waistWidth,
    };
  };

  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return 0;

    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setBodyMeasurements(null);
    setBodyType(null);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateRecommendations = () => {
  if (!bodyType ) {
    return toast({
      variant: "destructive",
      title: "Missing info",
      description: "Please select your gender and body type.",
    });
  }

  navigate("/recommendations", { state: { bodyType } });
};

 return (
  <div className="container px-4 py-8 max-w-5xl mx-auto animate-fade-in">
    <h1 className="text-3xl font-bold text-[#D81B60] mb-6 text-center transition-opacity duration-700">
      Body Shape Analysis
    </h1>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Section */}
      <div className="space-y-4 animate-slide-in-left">
        <Card className="overflow-hidden shadow-md transition-transform duration-500 hover:scale-[1.01]">
          <CardContent className="p-0 relative">
            {isModelLoading ? (
              <div className="bg-neutral-100 aspect-video flex items-center justify-center">
                <div className="text-center p-4">
                  <RefreshCw className="h-8 w-8 text-[#D81B60] mx-auto animate-spin mb-2" />
                  <p className="text-neutral-700">Loading AI Model...</p>
                  <Progress value={progress} className="mt-2 h-2" />
                </div>
              </div>
            ) : !imagePreview ? (
              <div
                className="bg-neutral-100 aspect-video flex flex-col items-center justify-center cursor-pointer transition duration-500 hover:opacity-80"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-[#D81B60] mb-2" />
                <p className="text-neutral-700">Click to upload an image</p>
                <p className="text-sm text-neutral-500 mt-1">or drag and drop</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="relative transition-opacity duration-700">
                <canvas
                  ref={canvasRef}
                  className="w-full aspect-video object-contain"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center p-4">
                      <RefreshCw className="h-8 w-8 text-white mx-auto animate-spin mb-2" />
                      <p className="text-white">Analyzing your image...</p>
                      <Progress value={progress} className="mt-2 h-2" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 animate-fade-in">
          {!imagePreview ? (
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isModelLoading}
              className="bg-[#D81B60] hover:bg-[#AD1457] text-white transition-transform duration-300 hover:scale-105"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          ) : !bodyType ? (
            <>
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="border-[#D81B60] text-[#D81B60] hover:bg-[#FCE4EC] transition duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Upload New Image
              </Button>
              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="bg-[#D81B60] hover:bg-[#AD1457] text-white transition-transform duration-300 hover:scale-105"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Analyze Image
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="border-[#D81B60] text-[#D81B60] hover:bg-[#FCE4EC] transition duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Another Image
              </Button>

              <select
                onChange={(e) => setGender(e.target.value)}
                className="border px-3 py-2 rounded-md font-bold bg-accent animate-bounce-in text-[#D81B60] ring-1 ring-[#D81B60] focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Others</option>
              </select>

              <Button
                onClick={generateRecommendations}
                disabled={isAnalyzing}
                className="bg-[#D81B60] hover:bg-[#AD1457] text-white transition-transform duration-300 hover:scale-105"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Get Recommendations
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-6 animate-slide-in-right">
        <Card className="transition-shadow duration-500 hover:shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#D81B60] mb-4">
              How to Get Accurate Results
            </h2>
            <ul className="space-y-3">
              {[
                'Upload a clear, well-lit full-body photo',
                'Stand straight with arms slightly away from your body',
                'Wear form-fitting clothing for the most accurate measurements',
                'Use a plain background if possible',
                'Ensure your whole body is visible in the frame',
              ].map((tip, idx) => (
                <li className="flex items-start" key={idx}>
                  <div className="bg-[#FCE4EC] rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-[#D81B60]"></span>
                  </div>
                  <p className="text-neutral-700">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {bodyType && (
          <Card className="transition-opacity duration-700 animate-fade-in-up">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-[#D81B60] mb-4">
                Your Body Shape Analysis
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-[#D81B60]">Body Type</h3>
                  <p className="text-neutral-700">{bodyType.type}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#D81B60]">Description</h3>
                  <p className="text-neutral-700">{bodyType.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#D81B60]">Key Features</h3>
                  <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                    {bodyType.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  </div>
);

}

export default AnalysisPage;
