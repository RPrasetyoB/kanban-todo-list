// export const API_URL = "https://todo-api-18-140-52-65.rakamin.com";
export const API_URL = "http://localhost:3000/api/v1";

export const registerUser = async (value: RegisterUser) => {
  try {
    const response = await fetch(API_URL + `/auth/register`, {
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
    const response = await fetch(API_URL + `/todo`, {
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
    const response = await fetch(API_URL + `/todo`, {
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
    const response = await fetch(API_URL + `/item/todo/${id}`, {
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
    const newBody = { ...value, todo_id: id };
    const response = await fetch(API_URL + `/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBody),
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
export const updateTask = async (value: UpdateTask, taskId: number) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(API_URL + `/item/${taskId}`, {
      method: "PUT",
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
