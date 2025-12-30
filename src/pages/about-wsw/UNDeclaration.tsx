import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Download, Calendar, Globe } from "lucide-react";
import { useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";

const UNDeclaration = () => {
	return (
		<div className="relative overflow-hidden">
			<Navigation />

			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-[#220536] to-[#1a0429]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
						<FileText className="w-5 h-5 text-[#9326E0]" />
						<span className="text-white text-lg font-medium">
							UN Resolution
						</span>
					</div>

					{/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							UN Declaration
						</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
						The United Nations General Assembly Resolution that
						established World Space Week
					</p>
				</div>
			</section>

			{/* Declaration Content */}
			<section className="py-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-gray-50 rounded-2xl p-8 mb-12">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-16 h-16 bg-[#9327e0] rounded-full flex items-center justify-center">
								<Globe className="w-8 h-8 text-white" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-[#204d74]">
									United Nations General Assembly Resolution
									54/68
								</h2>
								<div className="flex items-center gap-2 text-gray-600">
									<Calendar className="w-4 h-4" />
									<span>Adopted on December 6, 1999</span>
								</div>
							</div>
						</div>

						<div className="prose prose-lg max-w-none">
							<h3 className="text-xl font-semibold text-[#9327e0] mb-4">
								Resolution Text
							</h3>

							<p className="text-gray-700 mb-6">
								The General Assembly, recalling its resolution
								51/115 of 13 December 1996 on international
								cooperation in the peaceful uses of outer space,
								and taking note of the report of the
								Secretary-General on the implementation of the
								recommendations of the Third United Nations
								Conference on the Exploration and Peaceful Uses
								of Outer Space,
							</p>

							<p className="text-gray-700 mb-6">
								Convinced that the exploration and use of outer
								space for peaceful purposes are in the interest
								of all mankind and that the benefits derived
								from such activities should be shared by all
								countries,
							</p>

							<p className="text-gray-700 mb-6">
								Recognizing the substantial contribution of
								space science and technology and their
								applications to sustainable development,
							</p>

							<p className="text-gray-700 mb-6">
								Noting that 4 October 1957 marked the beginning
								of the space age with the launch of the first
								artificial satellite,
							</p>

							<p className="text-gray-700 mb-6">
								Noting also that 10 October 1967 marked the
								entry into force of the Treaty on Principles
								Governing the Activities of States in the
								Exploration and Use of Outer Space, including
								the Moon and Other Celestial Bodies,
							</p>

							<div className="bg-[#9327e0]/10 border-l-4 border-[#9327e0] p-6 my-8">
								<h4 className="font-bold text-[#204d74] mb-3">
									Key Declaration Points:
								</h4>
								<ol className="list-decimal list-inside space-y-3 text-gray-700">
									<li>
										Declares that World Space Week shall be
										observed each year at the international
										level from 4 to 10 October;
									</li>
									<li>
										Invites all States to celebrate World
										Space Week in order to:
									</li>
									<ul className="list-disc list-inside ml-6 mt-2 space-y-1">
										<li>
											Celebrate at the international level
											the contributions of space science
											and technology to the betterment of
											the human condition;
										</li>
										<li>
											Foster international cooperation in
											space outreach and education;
										</li>
										<li>
											Demonstrate the public support for
											space programs;
										</li>
										<li>
											Educate the public about space
											activities;
										</li>
										<li>
											Foster international cooperation in
											space outreach and education.
										</li>
									</ul>
								</ol>
							</div>

							<h3 className="text-xl font-semibold text-[#9327e0] mb-4">
								Significance
							</h3>
							<p className="text-gray-700 mb-6">
								This resolution officially established World
								Space Week as the largest annual space event on
								Earth. The dates chosen commemorate two pivotal
								moments in space history: the launch of Sputnik
								I (October 4, 1957) and the signing of the Outer
								Space Treaty (October 10, 1967).
							</p>

							<p className="text-gray-700 mb-6">
								The resolution emphasizes the peaceful uses of
								outer space and the importance of international
								cooperation in space exploration and education.
								It recognizes that space activities should
								benefit all of humanity and that public
								education about space science and technology is
								crucial for continued progress.
							</p>
						</div>

						<div className="mt-8 pt-6 border-t border-gray-200">
							<button className="bg-gradient-to-r from-[#9327e0] to-[#8c38c7] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9327e0]/25 transition-all duration-300 flex items-center gap-2">
								<Download className="w-5 h-5" />
								Download Full Resolution (PDF)
							</button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default UNDeclaration;
