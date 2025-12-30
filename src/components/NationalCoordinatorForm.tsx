import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import {
	Flag,
	User,
	Users,
	MapPin,
	Phone,
	Globe,
	Building,
	Briefcase,
	Rocket,
	Calendar,
	Gift,
	FileText,
	Mail,
	Star,
} from "lucide-react"; // Import necessary icons
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Define the schema
const NationalCoordinatorSchema = Yup.object().shape({
	country: Yup.string().required("Required"),
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	gender: Yup.string().required("Required"),
	postalAddress: Yup.string().required("Required"),
	postalCodeTown: Yup.string().required("Required"),
	cellPhone: Yup.string().required("Required"),
	linkedinPage: Yup.string().url("Invalid URL").notRequired(),
	// typeOfCoordinators:Yup.string().required("Required"),
	// approved: Yup.boolean(),
	email: Yup.string().email("Invalid email").required("Required"),
	spaceOrganization: Yup.string().required("Required"),
	roleInOrganization: Yup.string().required("Required"),
	spaceWebPage: Yup.string().url("Invalid URL").notRequired(),
	currentJobEmployer: Yup.string().required("Required"),
	spaceInterest: Yup.string().required("Required"),
	eventExperience: Yup.string().required("Required"),
	contributionPlans: Yup.string().required("Required"),
	countryGoals: Yup.string().required("Required"),
	industryContacts: Yup.string().required("Required"),
	cv: Yup.mixed().nullable(), // Handle cv as an optional file
});

const NationalCoordinatorForm = () => {
	const [scrollY, setScrollY] = useState(0);
	const navigate = useNavigate();
	const countryList = [
		"All Countries",
		...Object.values(countries.getNames("en", { select: "official" })),
	];
	countries.registerLocale(enLocale);

	const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			if (key === "cv" && values[key]) {
				formData.append("cv", values[key]);
			} else {
				formData.append(key, values[key]);
			}
		});

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/coordinatorForm`,
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Application submitted:", response.data);
			toast.success("Application submitted successfully!");
			navigate("/");
		} catch (err) {
			console.error("Error:", err.response?.data || err.message);
			toast.error(
				err.response?.data?.message || "Failed to submit application"
			);
			if (err.response?.data?.message) {
				setFieldError("cv", err.response.data.message);
			}
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-[#220536] flex items-center justify-center">
			<section className="relative py-20 hero-gradient overflow-hidden max-w-4xl w-full px-4">
				<div className="glass-dark rounded-2xl p-8 shadow-2xl animate-scale-in">
					<Formik
						initialValues={{
							country: "",
							firstName: "",
							lastName: "",
							gender: "",
							postalAddress: "",
							postalCodeTown: "",
							cellPhone: "",
							linkedinPage: "",
							// typeOfCoordinators:"",
							// approved: false,
							email: "",
							spaceOrganization: "",
							roleInOrganization: "",
							spaceWebPage: "",
							currentJobEmployer: "",
							spaceInterest: "",
							eventExperience: "",
							contributionPlans: "",
							countryGoals: "",
							industryContacts: "",
							cv: null,
						}}
						validationSchema={NationalCoordinatorSchema}
						onSubmit={handleSubmit}
					>
						{({ setFieldValue, errors, touched, isSubmitting }) => (
							<Form className="space-y-6">
								<div className="text-center">
									<div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2 mb-6 transition-all duration-500 group">
										<Rocket className="w-4 h-4 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
										<span className="text-white text-sm font-medium">
											National Coordinator Application
										</span>
										<Star className="w-4 h-4 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
									</div>
									<h1 className="text-3xl font-bold text-white mb-2">
										Apply Now
									</h1>
									<p className="text-gray-300">
										Become a National Coordinator for World
										Space Week
									</p>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									{/* Country */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Country
										</label>
										<div className="relative flex-1">
											<Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												as="select"
												name="country"
												className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#220536]/50 border ${
													errors.country &&
													touched.country
														? "border-red-500"
														: "border-white/20"
												} text-white focus:outline-none focus:ring-2 focus:ring-[#9327e0] transition-all duration-300 text-sm sm:text-base h-full`}
											>
												<option value="" disabled>
													Select country
												</option>
												{countryList.map((country) => (
													<option
														key={country}
														value={country}
													>
														{country}
													</option>
												))}
											</Field>
										</div>
										<ErrorMessage
											name="country"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* First Name */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											First Name
										</label>
										<div className="relative flex-1">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="firstName"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.firstName &&
													touched.firstName
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter first name"
											/>
										</div>
										<ErrorMessage
											name="firstName"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Last Name */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Last Name
										</label>
										<div className="relative flex-1">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="lastName"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.lastName &&
													touched.lastName
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter last name"
											/>
										</div>
										<ErrorMessage
											name="lastName"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Gender */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Gender
										</label>
										<div className="relative flex-1">
											<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												as="select"
												name="gender"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.gender &&
													touched.gender
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
											>
												<option value="" disabled>
													Select gender
												</option>
												<option value="Male">
													Male
												</option>
												<option value="Female">
													Female
												</option>
												<option value="Other">
													Other
												</option>
											</Field>
										</div>
										<ErrorMessage
											name="gender"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Postal Address */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Postal Address
										</label>
										<div className="relative flex-1">
											<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="postalAddress"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.postalAddress &&
													touched.postalAddress
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter postal address"
											/>
										</div>
										<ErrorMessage
											name="postalAddress"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Postal Code & Town */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Postal Code & Town
										</label>
										<div className="relative flex-1">
											<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="postalCodeTown"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.postalCodeTown &&
													touched.postalCodeTown
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter postal code & town"
											/>
										</div>
										<ErrorMessage
											name="postalCodeTown"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Cell Phone */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Cell Phone
										</label>
										<div className="relative flex-1">
											<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="cellPhone"
												type="tel"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.cellPhone &&
													touched.cellPhone
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="(123) 456-7890"
											/>
										</div>
										<ErrorMessage
											name="cellPhone"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* LinkedIn Page */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											LinkedIn Page
										</label>
										<div className="relative flex-1">
											<Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="linkedinPage"
												type="url"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.linkedinPage &&
													touched.linkedinPage
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="https://linkedin.com/in/username"
											/>
										</div>
										<ErrorMessage
											name="linkedinPage"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Email */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Email
										</label>
										<div className="relative flex-1">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="email"
												type="email"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.email &&
													touched.email
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="contact@example.com"
											/>
										</div>
										<ErrorMessage
											name="email"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Space Organization */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Space Organization
										</label>
										<div className="relative flex-1">
											<Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="spaceOrganization"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.spaceOrganization &&
													touched.spaceOrganization
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter organization"
											/>
										</div>
										<ErrorMessage
											name="spaceOrganization"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Role in Organization */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Role in Organization
										</label>
										<div className="relative flex-1">
											<Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="roleInOrganization"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.roleInOrganization &&
													touched.roleInOrganization
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter role"
											/>
										</div>
										<ErrorMessage
											name="roleInOrganization"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Space Web Page */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Space Web Page
										</label>
										<div className="relative flex-1">
											<Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="spaceWebPage"
												type="url"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.spaceWebPage &&
													touched.spaceWebPage
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="http://www.example.com"
											/>
										</div>
										<ErrorMessage
											name="spaceWebPage"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Current Job Employer */}
									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Current Job Employer
										</label>
										<div className="relative flex-1">
											<Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="currentJobEmployer"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.currentJobEmployer &&
													touched.currentJobEmployer
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full`}
												placeholder="Enter employer"
											/>
										</div>
										<ErrorMessage
											name="currentJobEmployer"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									<div className="flex flex-col h-full">
										<label className="block text-sm font-medium text-white mb-2">
											Type of Coordinator
										</label>
										<div className="relative flex-1">
											<Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												as="select"
												name="typeOfCoordinators"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.typeOfCoordinators &&
													touched.typeOfCoordinators
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 h-full appearance-none`}
												placeholder="Select Type of Coordinator"
											>
												<option value="" disabled>
													Select Type of Coordinator
												</option>
												<option value="WSW Coordinator">
													WSW Coordinator
												</option>
												<option value="Regional Coordinator">
													Regional Coordinator
												</option>
											</Field>
										</div>
										<ErrorMessage
											name="typeOfCoordinators"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Space Interest */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											Space Interest
										</label>
										<div className="relative">
											<Rocket className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
											<Field
												as="textarea"
												name="spaceInterest"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.spaceInterest &&
													touched.spaceInterest
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 min-h-[100px]`}
												placeholder="Describe your interest in space"
											/>
										</div>
										<ErrorMessage
											name="spaceInterest"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Event Experience */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											Event Experience
										</label>
										<div className="relative">
											<Calendar className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
											<Field
												as="textarea"
												name="eventExperience"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.eventExperience &&
													touched.eventExperience
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 min-h-[100px]`}
												placeholder="Describe your event experience"
											/>
										</div>
										<ErrorMessage
											name="eventExperience"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Contribution Plans */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											Contribution Plans
										</label>
										<div className="relative">
											<Gift className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
											<Field
												as="textarea"
												name="contributionPlans"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.contributionPlans &&
													touched.contributionPlans
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 min-h-[100px]`}
												placeholder="Describe your contribution plans"
											/>
										</div>
										<ErrorMessage
											name="contributionPlans"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Country Goals */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											Country Goals
										</label>
										<div className="relative">
											<Flag className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
											<Field
												as="textarea"
												name="countryGoals"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.countryGoals &&
													touched.countryGoals
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 min-h-[100px]`}
												placeholder="Describe your country goals"
											/>
										</div>
										<ErrorMessage
											name="countryGoals"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* Industry Contacts */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											Industry Contacts
										</label>
										<div className="relative">
											<Users className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
											<Field
												as="textarea"
												name="industryContacts"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.industryContacts &&
													touched.industryContacts
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 min-h-[100px]`}
												placeholder="Describe your industry contacts"
											/>
										</div>
										<ErrorMessage
											name="industryContacts"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>

									{/* CV */}
									<div className="flex flex-col h-full col-span-1 sm:col-span-2">
										<label className="block text-sm font-medium text-white mb-2">
											CV
										</label>
										<div className="relative">
											<input
												id="cv"
												name="cv"
												type="file"
												accept=".pdf,.doc,.docx"
												onChange={(event) => {
													setFieldValue(
														"cv",
														event.currentTarget
															.files[0]
													);
												}}
												className={`w-full pl-10 pr-12 py-3 bg-[#220536]/50 border ${
													errors.cv && touched.cv
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
											/>
											<FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										</div>
										<ErrorMessage
											name="cv"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>
								</div>
								<button
									type="submit"
									className="w-full py-3 bg-gradient-to-r from-[#9327e0] to-[#204d74] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#9327e0]/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={isSubmitting}
								>
									Submit Application
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</section>
		</div>
	);
};

export default NationalCoordinatorForm;
