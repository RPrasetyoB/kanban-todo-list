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

export const createNewGroup = async (value: CreateGroup) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(API_URL + `/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const getGroup = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(API_URL + `/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const getItemList = async (id: number) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(API_URL + `/todos/${id}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const createNewTask = async (value: CreateTask, id: number) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(API_URL + `/todos/${id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
