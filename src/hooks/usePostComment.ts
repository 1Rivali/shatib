import { useState } from "react";
import { refreshToken } from "./useApi";

export function usePostComment<T>(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Change error to be a string for the message
  const [data, setData] = useState<T | null>(null);

  async function postData(body: FormData) {
    console.log(body);

    setIsLoading(true);
    try {
      // const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const apiUrl = "https://www.ouzon.somee.com/api/";
      const token = localStorage.getItem("accessToken");
      const requestOptions = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      };
      console.log(requestOptions);

      const response = await fetch(`${apiUrl}${endpoint}`, requestOptions);

      if (!response.ok) {
        if (response.status === 401) {
          await refreshToken();
        }
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.message || "Something went wrong";
        setError(errorMessage);
        console.error("usePostComment Error:", errorMessage);
        setIsLoading(false);
        return;
      }

      // Safely parse the JSON response
      const responseText = await response.text();
      const responseData = responseText ? JSON.parse(responseText) : {};
      setIsLoading(false);
      setError(null);
      setData(responseData);
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred");
      console.error("usePostComment Exception: ", err);
    }
  }

  return { postData, isLoading, error, data };
}
