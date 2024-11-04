import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect } from "react";

const QrPopup = ({ toggle }) => {
  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      "qrcode",
      {
        fps: 10,
        qrbox: { width: 200, height: 150 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    const success = (res) => {
      alert(res);
    };

    qrScanner.render(success);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Attendance </h2>
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
        <div id="qrcode"></div>
      </div>
    </div>
  );
};

export default QrPopup;
