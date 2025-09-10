import { useEffect, useState } from "react";

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.error("No refresh token available.");
    return null;
  }

  try {
    const apiUrl = "http://www.ouzon.somee.com/api/";
    const response = await fetch(`${apiUrl}Accounts/RefreshToken`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("lang") || " ",
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (!response.ok) {
      console.error("Failed to refresh token.");
      return null;
    }

    const data = await response.json();
    if (data?.accessToken && data?.refreshToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data.accessToken;
    } else {
      console.error("Failed to retrieve new access token.");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

export function useApi<T>(
  endpoint: string,
  method?: "POST" | "DELETE" | "GET" | "PATCH",
  isToken?: boolean,
  noResponse?: boolean,
  dependencies?: any[],
  contentType: string = "application/json"
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(
    () => {
      if (method != "POST" && method != "DELETE" && method != "PATCH") {
        getData();
      }

      async function getData() {
        setIsLoading(true);
        try {
          // const apiUrl = `${import.meta.env.VITE_API_URL}`;
          const apiUrl = "http://www.ouzon.somee.com/api/";
          let token;
          let requestOptions;
          if (isToken) {
            token = localStorage.getItem("accessToken");

            requestOptions = {
              headers: {
                Authorization: `Bearer ${token}`,
                "Accept-Language":
                  localStorage.getItem("lang") === "en" ? "en" : " ",
              },
            };
          } else {
            requestOptions = {
              headers: {
                "Accept-Language":
                  localStorage.getItem("lang") === "en" ? "en" : " ",
              },
            };
          }

          fetch(`${apiUrl}${endpoint}`, requestOptions)
            .then(async (res) => {
              if (res.status === 403) {
                await refreshToken();
              }
              setIsLoading(false);
              setError(false);
              setData(await res.json());
            })
            .catch((err) => {
              setIsLoading(false);
              setError(true);
              console.log("useApi Error: ", err);
            });
        } catch (error) {
          setIsLoading(false);
          setError(true);
          console.log("useApi Exception: ", error);
        }
      }
    },
    dependencies ? [endpoint, method, ...dependencies] : [endpoint, method]
  );

  async function postData(body: object) {
    let token;
    if (isToken) {
      token = localStorage.getItem("accessToken");
    }

    setIsLoading(true);
    try {
      // const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const apiUrl = "http://www.ouzon.somee.com/api/";
      console.log(`${apiUrl}${endpoint}`);
      let headers = {};
      if (token) {
        headers = {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
          "Accept-Language": " ",
        };
      } else {
        headers = {
          "Content-Type": "application/json",
          "Accept-Language": " ",
        };
      }
      console.log(headers);
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      fetch(`${apiUrl}${endpoint}`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
          setIsLoading(false);
          setError(false);
          if (!noResponse) {
            setData(await res.json());
          }
          // console.log(data, "data fetch");
          // console.log(res.json(), "res.json fetch");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          console.log("useApi Error: ", err);
        });
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log("useApi Exception: ", error);
    }
  }

  async function deleteData(id: number) {
    setIsLoading(true);
    try {
      // const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const apiUrl = "http://www.ouzon.somee.com/api/";
      let headers = {};
      if (isToken) {
        const token = localStorage.getItem("accessToken");
        headers = {
          Authorization: `Bearer ${token}`,
          "Accept-Language": " ",
        };
      } else {
        headers = { "Accept-Language": " " };
      }
      const requestOptions = {
        method: "DELETE",
        headers: headers,
      };
      fetch(`${apiUrl}${endpoint}/${id}`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
          setIsLoading(false);
          setError(false);
          setData(await res.json());
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          console.log("useApi Error: ", err);
        });
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log("useApi Exception: ", error);
    }
  }

  async function patchForm(body: FormData) {
    setIsLoading(true);
    const apiUrl = "http://www.ouzon.somee.com/api/";
    try {
      console.log(`${apiUrl}${endpoint}`);
      let headers = {};
      if (isToken) {
        const token = localStorage.getItem("accessToken");
        headers = {
          Authorization: `Bearer ${token}`,
          "Accept-Language": " ",
        };
        console.log(headers);
      } else {
        headers = { "Accept-Language": " " };
        console.log("headersSssssssssssssSS:", headers);
      }
      const requestOptions = {
        method: "PATCH",
        body: body,
        headers: headers,
      };
      console.log(requestOptions);
      fetch(`${apiUrl}${endpoint}`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
          setIsLoading(false);
          setError(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          console.log("useApi Error: ", err);
        });
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log("useApi Exception: ", error);
    }
  }

  async function patchData(body: object) {
    setIsLoading(true);
    try {
      // const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const apiUrl = "http://www.ouzon.somee.com/api/";
      console.log(`${apiUrl}${endpoint}`);
      let headers = {};

      if (isToken) {
        const token = localStorage.getItem("accessToken");
        headers = {
          "Content-Type": "application/json",
          "Accept-Language": " ",
          Authorization: `Bearer ${token}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
          "Accept-Language": " ",
        };
      }
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };
      fetch(`${apiUrl}${endpoint}`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
          setIsLoading(false);
          setError(false);
          setData(await res.json());
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          console.log("useApi Error: ", err);
        });
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log("useApi Exception: ", error);
    }
  }

  return { patchData, patchForm, deleteData, postData, isLoading, error, data };
}
