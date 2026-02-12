import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const CoordinatorInfo = ({ coordinators }) => {
	const location = useLocation();
	const countryName = (location.state?.countryName as string) || "No Country";
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	console.log("coordinators:", coordinators);

	return (
		<Card className="mb-6 mt-8">
			<CardHeader>
				<CardTitle className="text-lg text-space-primary">
					National Coordinator :
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{loading && <p>Loading coordinator...</p>}
				{error && <p className="text-red-500">{error}</p>}
				{coordinators && coordinators.length > 0 ? (
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-space-primary text-black">
								<th className="border p-2">Country</th>
								<th className="border p-2">Name</th>
								<th className="border p-2">Email</th>
								<th className="border p-2">Local WSW Websites</th>
							</tr>
						</thead>
						<tbody>
							{coordinators.map((coordinator) => (
								<tr key={coordinator.id} className="border">
									<td className="border p-2">
										{countryName}
									</td>
									<td className="border p-2">
										{coordinator.firstName}{" "}
										{/* {coordinator.lastName} */}
									</td>
									<td className="border p-2">
										{coordinator.email}
									</td>
									<td className="border p-2">
										{coordinator.spaceWebPage}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="text-space-text">
						No coordinator Found.
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default CoordinatorInfo;
