// import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link} from "react-router-dom";

const Logos = () => {
  return (
    <div className="bg-white text-[#1a1a1a]">
    <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <img
         src="/assets/wsw-logos-page-banner.jpg"
          alt="World Space Week Logos Hero"
          // layout="fill"
          // objectFit="cover"
          // className="brightness"
        />
       
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-lg leading-relaxed space-y-6">
        <p>
          Using the World Space Week logo helps your materials stand out, and connects them to the world’s largest space event!
        </p>

        <p>
          You can also use your country’s WSW logo to represent your national contribution within this global celebration. It reinforces where the event is taking place while keeping it tied to the international campaign.
        </p>

        <p>
          Did you know that events that use official WSW branding are more likely to be featured on our website, social media, and in our annual report? Make your event easy to find and showcase this year!
        </p>

        <div>
          <Link
            to="#"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/40 transition-all duration-300"
          >
            Click here to download WSW Logos
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-[#9327e0]">
          <p className="mb-4">
            <strong>World Space Week (WSW) logo is the service mark of World Space Week Association.</strong> All rights are reserved except as follows:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Any organization may use the WSW logo to promote any event which has been entered into the WSW calendar with the exception noted below.
            </li>
            <li>
              All approved WSW National and Local Coordinators may use the WSW logo to promote WSW, with the exception noted below.
            </li>
            <li>
              No entity, including those listed above, may use the WSW logo on any product for sale, or use the WSW logo to promote any product or service for sale, without a license from World Space Week Association. For licensing inquiries, please contact the Association.
            </li>
          </ul>
        </div>

        <p className="mt-6">
          Curious about how we developed the new logo and its connection to space? <Link to="#" className="text-[#9327e0] underline hover:text-[#204d74]">Read the full story here.</Link>
        </p>
      </section>
      <Footer/>
    </div>
  );
}

export default Logos;