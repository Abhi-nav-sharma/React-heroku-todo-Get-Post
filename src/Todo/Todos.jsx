import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";

const getTodos = () => {
  const config = {
    url: "https://json-server-mocker-kittu.herokuapp.com/tasks",
    method: "get"
  };
  return axios(config);
};

const createTodo = (title) => {
  const payload = {
    title,
    status: false
  };
  const config = {
    url: "https://json-server-mocker-kittu.herokuapp.com/tasks",
    method: "post",
    data: payload
  };
  return axios(config);
};

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todos]);

  const updateTodo = (id, status) => {
    return axios({
      url: `https://json-server-mocker-kittu.herokuapp.com/tasks/${id}`,
      method: "patch",
      data: {
        status: status
      }
    });
  };
  const markEverythingComplete = async () => {
    try {
      const ids = todos.map((item) => item.id);
      const requests = [];
      ids.forEach((id) => {
        requests.push(updateTodo(id, false));
        //Array of promises
      });
      const results = await Promise.allSettled(requests);
      console.log(results);
    } catch (err) {}
  };

  const onSubmit = (title) => {
    setIsLoading(true);
    createTodo(title)
      .then((res) => {
        console.log("Success");
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <div>....Loading</div>;
  }

  return (
    <div>
      <TodoInput onSubmit={onSubmit} />
      <div>
        {todos.map((item) => {
          return (
            <div key={item.id}>
              <div>
                {item.title}-{item.status ? "Done" : "Not Done"}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={markEverythingComplete}>Mark All Complete</button>
      </div>
    </div>
  );
}
