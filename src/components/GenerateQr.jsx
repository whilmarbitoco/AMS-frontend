import QRCode from "react-qr-code";
import Button from "./Button";
import { createElement, useRef, useState } from "react";
import * as htmlToPng from "html-to-image";

const GenerateQr = ({ toggle, data }) => {
  const [qrData, setQrData] = useState(JSON.stringify(data));
  const qrCodeRef = useRef(null);

  const handleDownload = async () => {
    htmlToPng
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = data.lastname + ".png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-gray-800">Qr Code </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            type="button"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center flex-col w-full">
          <QRCode value={qrData} ref={qrCodeRef} />
          <Button name="Download" onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default GenerateQr;
