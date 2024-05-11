const taskList = [
  {
    id: 1,
    name: "Redesign page",
    done: null,
    todo_id: 1,
    created_at: "2021-04-21T00:12:06.116Z",
    updated_at: "2021-04-21T00:12:06.116Z",
    progress_percentage: null,
  },
  {
    id: 2,
    name: "Redesign page part 2",
    done: null,
    todo_id: 1,
    created_at: "2021-04-21T00:14:38.397Z",
    updated_at: "2021-04-21T00:14:38.397Z",
    progress_percentage: 100,
  },
];

const todos = [
  {
    id: 1,
    title: "Group Task 1",
    items: taskList,
    created_by: "1",
    created_at: "2021-04-20T23:47:50.046Z",
    updated_at: "2021-04-20T23:47:50.046Z",
  },
  {
    id: 2,
    title: "Group Task 2",
    items: [],
    created_by: "1",
    created_at: "2021-04-21T00:04:23.906Z",
    updated_at: "2021-04-21T00:04:23.906Z",
  },
];

export { taskList, todos };
