import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_ACCEPTED_KEY = "cookiesAccepted";
const COOKIE_PREFERENCES_KEY = "cookiePreferences";

const CookiePopup = () => {
  const [show, setShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookieAccepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);
    const storedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);


    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs) as Partial<CookiePreferences>;
        setPreferences((prev) => ({
          necessary: true, // always on
          analytics: parsed.analytics ?? prev.analytics,
          marketing: parsed.marketing ?? prev.marketing,
        }));
      } catch {
        // ignore parsing errors and fall back to defaults
      }
    }

    if (!cookieAccepted) {
      setShow(true);
    } else {
      console.log("CookiePopup - Already accepted, hiding popup");
    }
  }, []);

  const savePreferencesAndClose = (updated: CookiePreferences) => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated));
    localStorage.setItem(COOKIE_ACCEPTED_KEY, "true");
    setShow(false);
  };

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(updated);
    savePreferencesAndClose(updated);
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "necessary") {
      // Necessary cookies must always stay on
      return;
    }

    setPreferences((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  const handleSavePreferences = () => {
    const updated: CookiePreferences = {
      ...preferences,
      necessary: true,
    };
    savePreferencesAndClose(updated);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center px-4 pb-4">
      <div className="w-full max-w-3xl bg-white shadow-lg border rounded-lg p-5">
        <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
        <p className="text-sm text-gray-600 mb-4">
          We use cookies to enhance your browsing experience, analyze traffic,
          and serve personalized content. You can choose which categories to
          allow.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowOptions((prev) => !prev)}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            More Options
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="ml-auto px-5 py-2 text-sm font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Accept All Cookies
          </button>
        </div>

        {showOptions && (
          <div className="mt-4 border-t pt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Necessary cookies
                </p>
                <p className="text-xs text-gray-500">
                  Required for the website to function properly and cannot be
                  turned off.
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 cursor-not-allowed"
              >
                <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow translate-x-5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Analytics cookies
                </p>
                <p className="text-xs text-gray-500">
                  Help us understand how our site is used so we can improve it.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("analytics")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  preferences.analytics ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    preferences.analytics ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Marketing cookies
                </p>
                <p className="text-xs text-gray-500">
                  Used to show you relevant advertising on other websites.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("marketing")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  preferences.marketing ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    preferences.marketing ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Save Preferences
              </button>
              {/* <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 text-sm font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                Accept All Cookies
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookiePopup;
