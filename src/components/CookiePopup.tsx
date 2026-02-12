import { useEffect, useState } from "react";

const CookiePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookieAccepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-0  transform -translate-x-1/2 bg-white shadow-lg border rounded-lg p-5 w-[90%] max-w-md z-50">
      <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
      <p className="text-sm text-gray-600 mb-4">
        We use cookies to enhance your browsing experience, analyze traffic,
        and serve personalized content.
      </p>

      <div className="flex justify-end gap-4">
         <button
          onClick={handleAccept}
           className="px-5 py-2 text-sm font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Accept All
        </button>
        <button
          onClick={handleReject}
         className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Reject All
        </button>
        <button
        //   onClick={handleAccept}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Preferences
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
