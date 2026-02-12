import { useParams } from "react-router-dom";
import cardsDetails from "@/Data/ThemesData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ThemeDetails = () => {
  const params = useParams();
  const { id } = params;

  const themeData = cardsDetails.find((item) => item.id === Number(id));

  if (!themeData) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <h1 className="text-black text-center mt-20 text-2xl font-semibold">
          Theme not found ❌
        </h1>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 px-6 py-32 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-purple-700 text-center">
          {themeData.title || `World Space Week ${themeData.year}`}
        </h1>

        {/* Theme */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
          Theme:{" "}
          <span className="italic text-gray-600">{themeData.Theme}</span>
        </h2>

        {/* Year */}
        <p className="text-lg mb-6 text-gray-500">Year: {themeData.year}</p>

        {/* Image */}
        <img
          src={themeData.Image}
          alt={themeData.Theme}
          className="w-[420px] rounded-2xl border border-purple-400 shadow-lg mb-8"
        />

        {/* Description */}
        {themeData.description && (
          <p className="max-w-3xl text-center text-gray-700 leading-relaxed mb-8">
            {themeData.description}
          </p>
        )}

        {/* Highlights */}
        {themeData.highlights && themeData.highlights.length > 0 && (
          <div className="max-w-2xl bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">
              Key Highlights 🚀
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {themeData.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ThemeDetails;
