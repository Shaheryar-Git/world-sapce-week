import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Newspaper, Calendar, User, ArrowRight, Clock } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const News = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const news = [
		{
			id: 1,
			title: "World Space Week 2025 Theme Announced", 
			excerpt:
				"The 2025 theme 'Space and Climate Change' will explore how space technology helps address environmental challenges.",
			author: "WSW Association",
			date: "June 20, 2024",
			category: "Announcement",
			readTime: "3 min read",
			image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop",
		},
		{
			id: 2,
			title: "Record Breaking Participation in WSW 2024",
			excerpt:
				"Over 6,000 events across 95 countries celebrated World Space Week 2024, making it the largest celebration yet.",
			author: "Media Team",
			date: "November 15, 2024",
			category: "Report",
			readTime: "5 min read",
			image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
		},
		{
			id: 3,
			title: "New Educational Resources Released",
			excerpt:
				"Comprehensive teaching materials for the 2025 theme are now available for educators worldwide.",
			author: "Education Committee",
			date: "May 28, 2024",
			category: "Education",
			readTime: "2 min read",
			image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=400&fit=crop",
		},
		{
			id: 4,
			title: "Partnership with International Space Agencies",
			excerpt:
				"WSW Association announces new collaborations with major space agencies to enhance educational outreach.",
			author: "Partnership Team",
			date: "May 10, 2024",
			category: "Partnership",
			readTime: "4 min read",
			image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop",
		},
	];

	const featuredNews = news[0];
	const regularNews = news.slice(1);

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section */}
			<section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
				
				{/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
						<Newspaper className="w-5 h-5 text-[#9326E0]" />
						<span className="text-white text-lg font-medium">
							Latest Updates
						</span>
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							Space News
						</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
						Stay updated with the latest World Space Week news and
						announcements
					</p>
				</div>
			</section>

			{/* Featured News */}
			<section className="py-16 bg-gradient-to-b from-[#0f0118] to-[#1a0429]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group">
						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div className="relative">
								<img
									src={featuredNews.image}
									alt={featuredNews.title}
									className="w-full h-64 lg:h-full object-cover"
								/>
								<div className="absolute top-4 left-4">
									<span className="bg-[#9326E0] text-white px-3 py-1 rounded-full text-sm font-medium">
										Featured
									</span>
								</div>
							</div>
							<div className="p-8 lg:p-12 flex flex-col justify-center">
								<div className="flex items-center gap-2 mb-4">
									<span className="bg-[#9326E0]/20 text-[#9326E0] px-3 py-1 rounded-full text-sm font-medium">
										{featuredNews.category}
									</span>
									<span className="text-gray-400 text-sm">
										•
									</span>
									<span className="text-gray-400 text-sm">
										{featuredNews.readTime}
									</span>
								</div>
								<h2 className="text-3xl font-bold text-white mb-4 group-hover:text-[#9326E0] transition-colors duration-300">
									{featuredNews.title}
								</h2>
								<p className="text-gray-300 text-lg mb-6">
									{featuredNews.excerpt}
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<User className="w-5 h-5 text-[#9326E0]" />
										<span className="text-gray-300 text-sm">
											{featuredNews.author}
										</span>
										<span className="text-gray-400 text-sm">
											•
										</span>
										<Calendar className="w-4 h-4 text-[#8c38c7]" />
										<span className="text-gray-400 text-sm">
											{featuredNews.date}
										</span>
									</div>
									<button className="flex items-center gap-2 text-[#9326E0] hover:text-[#8c38c7] transition-colors duration-300 font-medium">
										Read More{" "}
										<ArrowRight className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Regular News */}
			<section className="py-16 bg-gradient-to-b from-[#1a0429] to-[#220536]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularNews.map((article) => (
							<div
								key={article.id}
								className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group"
							>
								<div className="relative">
									<img
										src={article.image}
										alt={article.title}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute top-4 left-4">
										<span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
											{article.category}
										</span>
									</div>
								</div>

								<div className="p-6">
									<div className="flex items-center gap-2 mb-3">
										<Clock className="w-4 h-4 text-[#8c38c7]" />
										<span className="text-gray-400 text-sm">
											{article.readTime}
										</span>
									</div>
									<h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9326E0] transition-colors duration-300">
										{article.title}
									</h3>
									<p className="text-gray-300 text-sm mb-4">
										{article.excerpt}
									</p>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2">
											<User className="w-4 h-4 text-[#9326E0]" />
											<span className="text-gray-400 text-sm">
												{article.author}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4 text-[#8c38c7]" />
											<span className="text-gray-400 text-sm">
												{article.date}
											</span>
										</div>
									</div>
									<button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
										Read Article
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default News;
