import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

function App() {
  const [text, setText] = useState('');

  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    
    if (qrCodeRef.current) {
      
      const svgElement = qrCodeRef.current.querySelector('svg');

      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const svgSize = svgElement.getBoundingClientRect();

      
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;

      
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svgElement);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        
        <header className="text-center mb-6">
           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
            QR Code Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter text or a URL to generate a QR code instantly.
          </p>
        </header>

        <main>
          <div className="mb-6">
            <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Text or URL
            </label>
            <textarea
              id="qr-input"
              rows="3"
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="e.g., https://www.google.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div ref={qrCodeRef} className="flex justify-center items-center p-4 bg-white rounded-lg min-h-[200px]">
            {text ? (
              <QRCodeSVG
                value={text}
                size={180}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={true} 
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Your QR Code will appear here.
              </p>
            )}
          </div>

          {text && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <Download size={18} />
                Download PNG
              </button>
            </div>
          )}
        </main>

      </div>

      <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Created by Yash</p>
      </footer>
    </div>
  );
}

export default App;