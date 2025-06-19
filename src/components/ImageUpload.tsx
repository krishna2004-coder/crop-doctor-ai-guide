
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { camera, image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

export const ImageUpload = ({ onImageUpload, isLoading }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    onImageUpload(file);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <camera className="mr-2" size={24} />
        Upload Plant Image
      </h2>
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-green-500 bg-green-50' : 'border-green-300'}
          ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:border-green-500 hover:bg-green-50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        {uploadedImage ? (
          <div className="space-y-4">
            <img 
              src={uploadedImage} 
              alt="Uploaded plant" 
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            <p className="text-green-600 font-medium">Image uploaded successfully!</p>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                openFileSelector();
              }}
              variant="outline"
              className="border-green-300 text-green-600 hover:bg-green-50"
            >
              Upload Different Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <image size={48} className="mx-auto text-green-400" />
            <div>
              <p className="text-lg font-medium text-green-700 mb-2">
                Drag and drop your plant image here
              </p>
              <p className="text-green-600 mb-4">
                or click to browse your files
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Choose Image
              </Button>
            </div>
            <p className="text-sm text-green-500">
              Supported formats: JPG, PNG, GIF (max 10MB)
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </Card>
  );
};
