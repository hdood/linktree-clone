import { GoogleOAuthProvider } from "google-oauth-gsi";

export const googleProvider = new GoogleOAuthProvider({
	clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	onScriptLoadError: () => console.log("onScriptLoadError"),
	onScriptLoadSuccess: () => console.log("onScriptLoadSuccess"),
});
