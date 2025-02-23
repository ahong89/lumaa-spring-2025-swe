import axios from "./axios";
import type { AxiosError } from "axios";

export async function fetchTasksAPI(jwt: string) {
  try {
    const response = await axios.get("/tasks", {
      headers: {
        Authorization: "Bearer " + jwt,
      }
    });
    return response;
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}

export async function addTaskAPI(jwt: string, title: string, description: string, isComplete: boolean) {
  try {
    const response = await axios.post("/tasks", {
        title: title,
        description: description,
        isComplete: isComplete,
      }, {
        headers: {
          Authorization: "Bearer " + jwt,
        },  
      }
    )
    return response;
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}

export async function updateTaskAPI(jwt: string, taskId: number, attribute: string, newValue: any) {
  try {
    const response = await axios.put(`/tasks/${taskId}`, {
      attribute: attribute,
      newValue: newValue,
    }, {
      headers: {
        Authorization: "Bearer " + jwt
      },
    })
    return response
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}

export async function removeTaskAPI(jwt: string, taskId: number) {
  try {
    const response = await axios.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: "Bearer " + jwt
      },
      data: {
        taskId: taskId,
      },
    })
    return response
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}
