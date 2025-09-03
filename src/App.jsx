import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 

function App() {
  const [text, setText] = useState('');

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

          <div className="flex justify-center items-center p-4 bg-white rounded-lg min-h-[200px]">
            {text ? (
              <QRCodeSVG
                value={text}
                size={180}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Your QR Code will appear here.
              </p>
            )}
          </div>
        </main>

      </div>
       <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Built for a fun one-day project.</p>
      </footer>
    </div>
  );
}

export default App;