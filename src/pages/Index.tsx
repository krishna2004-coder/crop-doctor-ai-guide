
import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { DiagnosisResult } from '@/components/DiagnosisResult';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export interface DiagnosisData {
  diagnosis: string;
  cause: string;
  solution: string;
  prevention: string;
}

const Index = () => {
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (imageFile: File) => {
    setIsLoading(true);
    setDiagnosisResult(null);
    
    try {
      // Convert image to base64
      const base64Image = await convertToBase64(imageFile);
      
      // Call OpenAI API
      const result = await analyzePlantImage(base64Image);
      setDiagnosisResult(result);
    } catch (error) {
      console.error('Error analyzing plant image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const analyzePlantImage = async (base64Image: string): Promise<DiagnosisData> => {
    // This would normally call your backend API
    // For now, we'll simulate the API response
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      diagnosis: "Leaf Blight Disease detected on tomato plant",
      cause: "Fungal infection caused by excessive moisture and poor air circulation",
      solution: "Apply copper-based fungicide (Copper Oxychloride 50% WP) at 2g per liter of water. Spray early morning or evening every 7-10 days for 3 weeks.",
      prevention: "Ensure proper plant spacing (2-3 feet apart), avoid overhead watering, improve drainage, and remove infected leaves immediately."
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              🌱 Plant Disease Diagnosis
            </h1>
            <p className="text-lg text-green-600 mb-6">
              Upload a photo of your plant to get instant diagnosis and treatment recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ImageUpload 
                onImageUpload={handleImageUpload}
                isLoading={isLoading}
              />
            </div>
            
            <div>
              {isLoading && (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-green-600 font-medium">Analyzing your plant...</p>
                </div>
              )}
              
              {diagnosisResult && (
                <DiagnosisResult data={diagnosisResult} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;
