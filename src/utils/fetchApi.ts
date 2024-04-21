export const API_URL = "https://todo-api-18-140-52-65.rakamin.com";

export const registerUser = async (value: RegisterUser) => {
  try {
    const response = await fetch(API_URL + `/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const loginUser = async (value: LoginUser) => {
  try {
    const response = await fetch(API_URL + `/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
