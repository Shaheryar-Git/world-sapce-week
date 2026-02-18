import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
	id:String;
	name: string;
	email: string;
	password?: string;
	terms?: boolean;
}

type UserResponse = {
	state: boolean;
	message: string;
	backendMsg?: string;
};

interface AuthContextType {
	user: User | null;
	login: (id: String, email: string, password: string) => Promise<boolean>;
	signup: (
		name: string,
		email: string,
		password: string,
		registerAs: string
	) => Promise<UserResponse>;
	logout: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuth must be used within an AuthProvider");
	return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchSession = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setUser(null);
				setIsLoading(false);
				return;
			}
			const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log("Session data fetched:", data);
				if (data.user) {
					setUser(data.user);
				} else {
					setUser(null);
					console.warn("No user data in session response:", data);
				}
			} else if (res.status === 401) {
				console.warn("Unauthorized: No active session");
				localStorage.removeItem("token");
				setUser(null);
			} else {
				console.warn("Session check failed with status:", res.status);
				setUser(null);
			}
		} catch (err) {
			console.error("Session check failed:", err);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log("Running fetchSession on mount...");
		fetchSession();
	}, []);

	const login = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) throw new Error("Login failed");
			const data = await res.json();
			localStorage.setItem("token", data?.token || "");
			await fetchSession();
			return true;
		} catch (err) {
			console.error("Login error:", err);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const signup = async (
		name: string,
		email: string,
		password: string,
		registerAs: string
	): Promise<UserResponse> => {
		setIsLoading(true);
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/createUser`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name, email, password, registerAs }),
				}
			);
			if (!res.ok) {
				const errorData = await res.json();
				return {
					state: false,
					message: "Signup failed",
					backendMsg: errorData.message || "An error occurred",
				};
			}
			const data = await res.json();
			console.log("Signup data:", data);
			localStorage.setItem("token", data?.token || "");
			await fetchSession();
			return { state: true, message: "Signup successful" };
		} catch (err) {
			console.error("Signup error:", err);
			return { state: false, message: err.message || "Signup failed" };
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			const token = localStorage.getItem("token");
			await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (err) {
			console.error("Logout failed:", err);
		} finally {
			localStorage.removeItem("token");
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, signup, logout, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};
