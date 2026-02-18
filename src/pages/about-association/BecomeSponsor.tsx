import React from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BecomeSponsor = () => {
	return (
		<div className="bg-[#220536] text-white">
			<Navigation />


            <section className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center">
				<img
					src="/assets/Sponsor-Page.jpg"
					alt="Become a Sponsor"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-[#220536]/50 "></div>
			</section>

		
			{/* Info Section */}
			<section className="py-20 px-6 sm:px-10 lg:px-32 bg-[#2a0a42] space-y-10">
                <div className="relative  text-center">
					<h1 className="text-5xl  sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
						Become a Sponsor
					</h1>
				</div>
				{[
					"World Space Week Association is a non-profit organization which supports the UN in the global coordination of World Space Week. The Association is supported solely by donations of aerospace companies and other members of the global space community.",
					"World Space Week provides general benefits for the global space industry, such as building the workforce of tomorrow, educating the public and government leaders about space, and demonstrating public support for space activities. It also provides specific benefits for sponsors, such as recognition before numerous global space leaders and with the 4,000+ organizations which participate annually in World Space Week.",
					"As a registered 501(c)3 charity, the Association helps companies meet their education, public outreach and Corporate Social Responsibility goals in an efficient manner.",
					"For information on becoming a global World Space Week sponsor, please download our sponsor table (pdf). We offer our donors different levels of engagement.",
					"The Association also implements for sponsors tailored programs building on the World Space Week platform which efficiently reach targeted audiences. Targeted sponsorship is available on the WSW poster, teacher materials, and special events designed to meet sponsor needs. Targeted audience can include government space leaders, communities surrounding company locations, and students as potential future employees. Please contact us to discuss.",
					"In addition to supporters of World Space Week Association at the global level, please consider supporting our independent National Coordinators.",
					"For more information about World Space Week and the Association, please see our latest Annual Report. Please contact us for more information on how you can leverage the largest space event on Earth to efficiently reach your education, outreach and CSR goals.",
				].map((text, index) => (
					<div
						key={index}
						className="bg-[#3a1057] p-8 rounded-2xl shadow-md"
					>
						<p className="text-lg leading-relaxed">
							<span className="font-semibold text-[#d9bfff] mr-2">{index + 1})</span>
							{text}
						</p>
					</div>
				))}
			</section>

			<Footer />
		</div>
	);
};

export default BecomeSponsor;
