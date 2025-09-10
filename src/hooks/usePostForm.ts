import { useEffect, useState } from "react";
import { refreshToken } from "./useApi";

export function usePostForm<T>(
  endpoint: string,
  method?: "POST"
  // isToken?: boolean
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Change error to be a string for the message
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (method !== "POST") {
      getData();
    }

    async function getData() {
      setIsLoading(true);
      try {
        // const apiUrl = `${import.meta.env.VITE_API_URL}`;
        const apiUrl = "http://www.ouzon.somee.com/api/";
        console.log(`${apiUrl}${endpoint}`);
        const response = await fetch(`${apiUrl}${endpoint}`);

        if (!response.ok) {
          if (response.status === 401) {
            await refreshToken();
          }
          const errorData = await response.json();
          const errorMessage = errorData?.message || "Something went wrong";
          setError(errorMessage);
          console.error("usePostForm Error:", errorMessage);
          setIsLoading(false);
          return;
        }

        const responseData = await response.json();
        setIsLoading(false);
        setError(null);
        setData(responseData);
      } catch (err) {
        setIsLoading(false);
        setError("An unexpected error occurred");
        console.error("usePostForm Exception: ", err);
      }
    }
  }, [endpoint, method]);

  async function postData(body: FormData) {
    setIsLoading(true);
    try {
      // const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const apiUrl = "http://www.ouzon.somee.com/api/";
      console.log(localStorage.getItem("accessToken"));
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      };

      const response = await fetch(`${apiUrl}${endpoint}`, requestOptions);

      if (!response.ok) {
        if (response.status === 403) {
          await refreshToken();
        }
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Something went wrong";
        setError(errorMessage);
        console.error("usePostForm Error:", errorMessage);
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
      console.error("usePostForm Exception: ", err);
    }
  }

  return { postData, isLoading, error, data };
}
