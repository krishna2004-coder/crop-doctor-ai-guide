
export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-green-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-green-800">PlantDoctor AI</h1>
              <p className="text-sm text-green-600">Smart Plant Disease Detection</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">Home</a>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">About</a>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">Help</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
