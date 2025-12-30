import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navItems } from "./NavigationData";
import { useState } from "react";

const DesktopNavigation = () => {
	const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);

	return (
		<div className="hidden lg:block">
			<NavigationMenu>
				<NavigationMenuList className="space-x-2">
					{navItems.map((item, index) => (
						<NavigationMenuItem key={index}>
							<NavigationMenuTrigger className="bg-transparent text-white hover:text-[#9326E0] hover:bg-white transition-all duration-300 text-sm font-medium px-4 py-2 rounded-lg">
								{item.title}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="bg-[#220536] backdrop-blur-2xl border border-[#9326E0]/30 rounded-xl p-6 w-72 shadow-2xl shadow-[#9326E0]/20">
									<div className="space-y-3">
										{item.items.map((subItem, subIndex) => (
											<div
												key={subIndex}
												onMouseEnter={() =>
													setHoveredSubIndex(subIndex)
												}
												onMouseLeave={() =>
													setHoveredSubIndex(null)
												}
												className="relative"
											>
												<NavigationMenuLink asChild>
													<Link
														to={subItem.href}
														className="block px-4 py-3 text-white hover:bg-[#2d0a4a] hover:text-[#9326E0] hover:border-l-4 hover:border-[#9326E0] focus:bg-[#2d0a4a] focus:text-[#9326E0] focus:border-l-4 focus:border-[#9326E0] rounded-lg transition-all duration-200 text-sm font-medium"
													>
														{subItem.title}
														{/* <MoveRight className="ml-2 w-4 h-4" /> */}
													</Link>
												</NavigationMenuLink>

												{/* Subtitles div */}
												{hoveredSubIndex === subIndex &&
													subItem.titleSubItems && (
														<div className="absolute top-0 left-full bg-[#220536] backdrop-blur-2xl border border-[#9326E0]/30 rounded-xl p-6 w-72 shadow-2xl shadow-[#9326E0]/20">
															<div className="block px-4 py-3 text-white ">
																{subItem.titleSubItems.map(
																	(
																		subSubItem,
																		subSubIndex
																	) => (
																		<Link
																			key={
																				subSubIndex
																			}
																			to={
																				subSubItem.href
																			}
																			className="block px-3 py-2 text-white hover:text-[#9326E0] hover:bg-[#3a0e5a] rounded-md transition-all duration-200 text-sm"
																		>
																			<ol className="">
																				<li>
																					{
																						subSubItem.subTitles
																					}
																				</li>
																			</ol>{" "}
																		</Link>
																	)
																)}
															</div>
														</div>
													)}
											</div>
										))}
									</div>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default DesktopNavigation;
