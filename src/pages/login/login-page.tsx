import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginState } from "@/hooks/use-login-state";
import type { LoginRequest } from "@/types/auth.types";
import { toast } from "sonner";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const { login, isLoading, isLoggedIn } = useLoginState();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const loginRequest: LoginRequest = {
				email,
				password,
			};
			await login(loginRequest);
			navigate("/");
		} catch {
			toast.error("Kullanıcı adı veya şifre hatalı tekrar deneyiniz!");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormDisabled = isLoading || isSubmitting;

	return (
		<div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-10">
			<Card className="w-full max-w-md shadow-card-offset border border-black">
				<CardHeader className="text-center space-y-2">
					<CardTitle className="text-3xl font-bold text-foreground">
						Hesabınıza giriş yapın
					</CardTitle>
					<CardDescription className="text-text-secondary/70 font-bold">
						Admin paneline erişim için e-posta adresinizi ve şifrenizi girin.
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-semibold">
								E-posta
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="E-postanızı girin"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={isFormDisabled}
								className="h-10 border border-black placeholder:text-text-secondary/70 placeholder:font-semibold"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password" className="text-sm font-semibold">
								Şifre
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="Şifrenizi girin"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={isFormDisabled}
								className="h-10 border border-black placeholder:text-text-secondary/70 placeholder:font-semibold"
							/>
						</div>

						{error && <p className="text-sm text-destructive mt-1">{error}</p>}
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<div className="relative w-full group">
							<Button
								type="submit"
								className="w-full h-11 bg-primary text-primary-foreground font-semibold"
								disabled={isFormDisabled}
								aria-busy={isFormDisabled}
							>
								{isFormDisabled ? "Giriş yapılıyor..." : "Giriş Yap"}
							</Button>
							<span className="absolute inset-0 rounded-sm border border-primary translate-x-1 translate-y-1 z-0 pointer-events-none "></span>
						</div>
					</CardFooter>
				</form>

				<div className="text-center pb-6">
					<p className="text-xs text-muted-foreground">2025 © BehaviorWatch</p>
				</div>
			</Card>
		</div>
	);
}
