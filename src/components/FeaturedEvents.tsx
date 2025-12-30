import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedEvents = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Space Technology Exhibition",
      location: "Washington, DC, USA",
      date: "October 4-6, 2025",
      time: "9:00 AM - 6:00 PM",
      attendees: 1200,
      description:
        "Discover the latest innovations in space technology and meet industry leaders from around the world.",
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      category: "Exhibition",
      featured: true,
    },
    {
      id: 2,
      title: "Stargazing Night & Astronomy Workshop",
      location: "London, UK",
      date: "October 7, 2025",
      time: "7:00 PM - 11:00 PM",
      attendees: 500,
      description:
        "Join professional astronomers for an evening of celestial observation ",
      image:
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop",
      category: "Public Event",
    },
    {
      id: 3,
      title: "Youth Space Challenge Competition",
      location: "Tokyo, Japan",
      date: "October 8-10, 2025",
      time: "10:00 AM - 4:00 PM",
      attendees: 800,
      description:
        "Students compete in space-themed challenges and learn directly from space industry professionals.",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
      category: "Educational",
    },
    {
      id: 4,
      title: "Mars Mission Symposium",
      location: "Berlin, Germany",
      date: "October 9, 2025",
      time: "9:00 AM - 5:00 PM",
      attendees: 300,
      description:
        "Scientists explore Mars missions, highlighting innovation, technology, exploration, research, and sustainability.",
      image:
        "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop",
      category: "Conference",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Featured Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#FEC53A] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting World Space Week events happening around the
              globe. Join thousands of participants in celebrating space
              exploration.
            </p>
          </div>

          {/* Featured Event */}
          <div className="mb-16">
            {featuredEvents
              .filter((event) => event.featured)
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-[#9327e0] text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Featured Event
                        </span>
                      </div>
                    </div>

                    <div className="p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="bg-[#9327e0]/10 text-[#9327e0] px-3 py-1 rounded-full text-sm font-medium">
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#9327e0] transition-colors duration-300">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {event.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="h-5 w-5 mr-3 text-[#9327e0]" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-5 w-5 mr-3 text-[#9327e0]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-5 w-5 mr-3 text-[#9327e0]" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Users className="h-5 w-5 mr-3 text-[#9327e0]" />
                          <span>
                            {event.attendees.toLocaleString()} expected
                            attendees
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/events/${event.id}`}
                        className="group/btn inline-flex items-center bg-gradient-to-r from-[#9327e0] to-[#204d74] hover:from-[#9327e0]/90 hover:to-[#204d74]/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 w-fit"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Other Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredEvents
              .filter((event) => !event.featured)
              .map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[#9327e0] px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9327e0] transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-[#9327e0]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-[#9327e0]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="h-4 w-4 mr-2 text-[#9327e0]" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    <Link
                      to={`/events/${event.id}`}
                      className="group/btn w-full bg-[#9327e0] hover:bg-[#9327e0]/90 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/events"
              className="group inline-flex items-center border-2 border-[#9327e0] text-[#9327e0] hover:bg-[#9327e0] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>  
    </section>
  );
};

export default FeaturedEvents;
