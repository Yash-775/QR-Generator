import { useState, useRef, useEffect } from 'react'; 
import { QRCodeSVG } from 'qrcode.react';
import { Download, Upload, ImageOff } from 'lucide-react'; 

function App() {
  const [text, setText] = useState('https://react.dev/');
  const qrCodeRef = useRef(null);

  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('M'); 


  const [logoImage, setLogoImage] = useState(null); 

  
  useEffect(() => {
    if (logoImage) {
      setLevel('H'); 
    } else {
      setLevel('M'); 
    }
  }, [logoImage]); 


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
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        
        if (logoImage) {
          const logo = new Image();
          logo.src = logoImage;
          logo.onload = () => {
            const logoWidth = 48; 
            const logoHeight = 48; 
            const x = (canvas.width - logoWidth) / 2;
            const y = (canvas.height - logoHeight) / 2;
            ctx.drawImage(logo, x, y, logoWidth, logoHeight);

            const link = document.createElement('a');
            link.download = 'qrcode_with_logo.png'; 
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };
        } else {
          
          const link = document.createElement('a');
          link.download = 'qrcode.png';
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/png')) { 
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    } else {
      alert('Please upload a PNG image file.');
      setLogoImage(null); 
    }
  };

  
  const handleRemoveLogo = () => {
    setLogoImage(null);
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) fileInput.value = '';
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

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size: {size}px</label>
              <input type="range" id="size" min="128" max="512" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
            <div>
               <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Error Correction</label>
               <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                 <option value="L">Low</option>
                 <option value="M">Medium</option>
                 <option value="Q">Quartile</option>
                 <option value="H">High</option>
               </select>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="fgColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <input type="color" id="fgColor" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded-md cursor-pointer" />
            </div>
             <div className="flex items-center gap-3">
              <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Background</label>
              <input type="color" id="bgColor" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-md cursor-pointer" />
            </div>

            <div className="col-span-2 mt-2">
                <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Logo (PNG only)</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/png"
                        onChange={handleLogoUpload}
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
                    />
                    {logoImage && (
                        <button
                            onClick={handleRemoveLogo}
                            className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                            title="Remove logo"
                        >
                            <ImageOff size={20} />
                        </button>
                    )}
                </div>
                {logoImage && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Logo applied. Error Correction set to High.
                    </div>
                )}
            </div>

          </div> 


          <div ref={qrCodeRef} className="flex justify-center items-center p-4 bg-white rounded-lg min-h-[200px]" style={{ background: bgColor }}>
            {text ? (
              <QRCodeSVG
                value={text}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level={level}
                includeMargin={true}
                imageSettings={
                  logoImage
                    ? {
                        src: logoImage,
                        height: 48,
                        width: 48,
                        x: undefined, 
                        y: undefined, 
                        excavate: true,
                      }
                    : undefined 
                }
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