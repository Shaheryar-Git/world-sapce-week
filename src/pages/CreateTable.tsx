import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTable = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const navigate = useNavigate();

	const submitUser = async (e) => {
		e.preventDefault();

		console.log("Submitting User:", { name, email, age });
		await axios.post(`${import.meta.env.VITE_API_URL}/createUser`, {
				name,
email,
				age,
			})
			.then((result) => {
				console.log("USER CREATED", result);
				navigate("/userTable");
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

	return (
		<div>
			<h2>Create User</h2>

			{/* Input fields */}
			<form onSubmit={submitUser}>
				<div style={{ marginBottom: "16px" }}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
						style={{ marginRight: "8px" }}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						style={{ marginRight: "8px" }}
					/>
					<input
						type="number"
						name="age"
						placeholder="Age"
						onChange={(e) => setAge(e.target.value)}
						style={{ marginRight: "8px" }}
					/>
					<button>Add User</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTable;
