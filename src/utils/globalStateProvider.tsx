import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface Props {
  children: ReactNode;
}

export interface Task {
  id: number;
  name: string;
  done: boolean;
  todo_id: number;
  created_at: string;
  updated_at: string;
  progress_percentage: number;
}

export interface Todo {
  ID: number;
  title: string;
  items: Task[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface ContextProps {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  taskList: Task[];
  setTaskList: Dispatch<SetStateAction<Task[]>>;
  dataChanged: boolean;
  setDataChanged: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextProps = {
  todoList: [],
  setTodoList: () => {},
  taskList: [],
  setTaskList: () => {},
  dataChanged: true,
  setDataChanged: () => {},
};

export const PublicData = createContext<ContextProps>(defaultValue);

const GlobalState = ({ children }: Props) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [dataChanged, setDataChanged] = useState<boolean>(true);

  return (
    <PublicData.Provider
      value={{
        todoList,
        setTodoList,
        taskList,
        setTaskList,
        dataChanged,
        setDataChanged,
      }}
    >
      {children}
    </PublicData.Provider>
  );
};

export default GlobalState;
