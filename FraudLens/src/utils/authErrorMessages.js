const authErrorMessages = {
  "auth/invalid-credential": "The email or password you entered is incorrect. Please try again.",
  "auth/user-not-found": "No account was found for that email. Please sign up or try a different email.",
  "auth/wrong-password": "The password you entered is incorrect. Please try again.",
  "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
  "auth/weak-password": "Please choose a stronger password with at least 6 characters.",
  "auth/too-many-requests": "Too many attempts were made. Please wait a moment and try again.",
  "auth/network-request-failed": "A network error occurred. Please check your connection and try again.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
};

export function getAuthErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";

  if (typeof error === "string") {
    return authErrorMessages[error] || error;
  }

  const code = error?.code;
  if (typeof code === "string" && authErrorMessages[code]) {
    return authErrorMessages[code];
  }

  const message = error?.message;
  if (typeof message === "string") {
    return message.replace(/^Firebase:\s*/i, "").replace(/^Error:\s*/i, "");
  }

  return "Something went wrong. Please try again.";
}
