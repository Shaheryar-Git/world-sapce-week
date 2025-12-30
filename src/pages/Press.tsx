import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Newspaper, Download, Users, Globe, Activity } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const mediaAssets = [
  {
    id: 1,
    title: "Click here to download WSW Logos",
    image: "Assets/wsw-logos-page-banner-1.jpg", // Replace with your logo image path
    link: "/hold-event/media-kit/logos",
  },
  {
    id: 2,
    title: "Click here to download WSW Poster",
    image: "Assets/New-Project-62.png", // Replace with your poster image path
    link: "/hold-event/poster",
  },
  {
    id: 3,
    title: "Latest Press Releases",
    image: "Assets/Mexico-Image-in-2019-02-Press-Release.jpg", // Replace with your poster image path
    link: "/media/news",
  },
];

const Press = () => {
  return (
    <div className="relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#220536] to-[#1a0429] relative">
        <ParticlesBackground count={150} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
            <Newspaper className="w-5 h-5 text-[#9326E0]" />
            <span className="text-white text-lg font-medium">Press</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
              About World Space Week
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            World Space Week (October 4–10) is the largest annual space event on
            Earth, declared by the United Nations in 1999. Coordinated by the
            World Space Week Association (WSWA) with the support of the UN
            Committee on the Peaceful Uses of Outer Space.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#220536] mb-10">
            The 2025 Theme: <span className="text-[#9326E0]">“Living in Space”</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Activity className="mx-auto text-[#9326E0] w-10 h-10 mb-4" />
              <h3 className="text-3xl font-bold text-[#220536]">15,000+</h3>
              <p className="text-gray-600">Events in 2024</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Globe className="mx-auto text-[#9326E0] w-10 h-10 mb-4" />
              <h3 className="text-3xl font-bold text-[#220536]">92</h3>
              <p className="text-gray-600">Countries Participate</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="mx-auto text-[#9326E0] w-10 h-10 mb-4" />
              <h3 className="text-3xl font-bold text-[#220536]">94M</h3>
              <p className="text-gray-600">Online Reach</p>
            </div>
          </div>

          <p className="text-gray-700 mt-10 text-lg font-medium">
            Sponsors include Lockheed Martin, Viasat, Airbus, General Dynamics and others.
          </p>
        </div>
      </section>

      {/* Media Assets Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#220536] text-center mb-12">
            Media Assets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mediaAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl overflow-hidden shadow-md bg-gray-50 hover:shadow-xl transition-all"
              >
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex items-center justify-between">
                 <a href={asset.link}>
                     <h3 className="text-lg font-semibold text-[#220536]">
                    {asset.title}
                  </h3>
                 </a>
                  <Download className="w-5 h-5" />
                    Download
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Press Releases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#220536] mb-8">
            Latest Press Releases
          </h2>
          <p className="text-gray-600">
            Coming soon — stay tuned for the latest news and announcements from
            World Space Week 2025.
          </p>
        </div>
      </section>

      {/* About WSWA and Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-[#220536]">
              About World Space Week Association
            </h2>
            <p className="text-gray-700 leading-relaxed">
              World Space Week Association (WSWA) is a non-profit that coordinates
              the UN-declared World Space Week, celebrated every October 4–10 in
              more than 90 countries. According to WSWA, it is the largest annual
              space event on Earth.
            </p>

            <h3 className="text-xl font-semibold text-[#9326E0] mt-6">
              Press Contact
            </h3>
            <p className="text-gray-700">
              Press inquiries:{" "}
              <a
                href="mailto:press@worldspaceweek.org"
                className="text-[#9326E0] underline"
              >
                press@worldspaceweek.org
              </a>
              <br />
              Website:{" "}
              <a
                href="https://www.worldspaceweek.org"
                className="text-[#9326E0] underline"
              >
                www.worldspaceweek.org
              </a>
              <br />
              Ilayda Edali – Operations & Communications<br />
              <a
                href="mailto:iedali@worldspaceweek.org"
                className="text-[#9326E0] underline"
              >
                iedali@worldspaceweek.org
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Be Part of Press List */}
      <section className="py-20 bg-[#220536] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Be Part of Our Press List</h2>
        <p className="text-lg mb-8">
          Would you like to receive World Space Week press releases and media
          updates directly in your inbox?
        </p>
        <a
          href="#"
          className="inline-block bg-[#9326E0] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7a20c2] transition-all"
        >
          Click Here
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
