import { useParams } from "react-router-dom";
import { Mail } from "lucide-react";
import coordinators from "@/Data/Coordinators";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CoordinatorDetails = () => {
  const { id } = useParams();

  const coordinator = coordinators.find(
    (item) => item.id === Number(id)
  );

  if (!coordinator) {
    return (
      <div className="text-center text-red-500 text-xl mt-20">
        Coordinator not found
      </div>
    );
  }

  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-10 py-40">
        <div className="bg-white rounded-3xl shadow-xl p-14">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">

            {/* Profile Image */}
            <img
              src="/images/profile-placeholder.png"
              alt={coordinator.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-[#9326E0]"
            />

            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-[#204d74]">
                {coordinator.name}
              </h1>

              <p className="text-lg text-[#9326E0] font-semibold mt-2">
                {coordinator.role || "Coordinator"}
              </p>

              <div className="flex items-center mt-4">
                <img
                  src={`https://flagsapi.com/${coordinator.code}/flat/64.png`}
                  alt={coordinator.country}
                  className="w-10 h-10 mr-3"
                />
                <span className="text-gray-700 text-lg">
                  {coordinator.country} · {coordinator.region}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#204d74] mb-2">
                Contact Information
              </h3>

              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-3 text-[#9326E0]" />
                <a
                  href={`mailto:${coordinator.email}`}
                  className="hover:text-[#9326E0]"
                >
                  {coordinator.email}
                </a>
              </div>
            </div>

            {/* Secondary Coordinator */}
            {coordinator.name2 && (
              <div>
                <h3 className="text-xl font-semibold text-[#204d74] mb-2">
                  Additional Coordinator
                </h3>

                <p className="text-gray-800 font-semibold">
                  {coordinator.name2}
                </p>

                {coordinator.Role2 && (
                  <p className="text-gray-600">{coordinator.Role2}</p>
                )}

                {coordinator.email2 && coordinator.email2 !== "None" && (
                  <p className="text-gray-600">
                    {coordinator.email2}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CoordinatorDetails;
