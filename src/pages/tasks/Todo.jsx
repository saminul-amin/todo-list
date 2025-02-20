import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Todo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   const [tasks, setTasks] = useState([]);
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/todo");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  console.log(tasks);

  // Function to add a task
  const onSubmit = (data) => {
    // setTasks([...tasks, { ...data, id: Date.now() }]);
    console.log(data);
    const task = { title: data.title, dueDate: data.date };
    axios
      .post("http://localhost:5001/todo", task)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your task has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        reset();
      })
      .catch((err) => console.log(err));
  };

  // Function to delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to edit a task (simple inline edit prompt for now)
  const handleEdit = (id) => {
    const newTitle = prompt("Enter new task title:");
    if (newTitle) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    }
  };

  return (
    <div className="min-h-screen mt-8 bg-stone-100 p-6 flex flex-col items-center rounded-xl">
      <motion.div
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-stone-500 text-center mb-4">
          To-Do List
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: "Task Title is Required" })}
            placeholder="Task Title"
            className="w-full p-2 border border-stone-500 rounded-md focus:ring-stone-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
          <input
            type="date"
            {...register("dueDate", { required: "Due Date is Required" })}
            className="w-full p-2 border border-stone-500 rounded-md focus:ring-stone-500"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-stone-500 hover:bg-stone-600 text-white p-2 rounded-md"
          >
            Add Task
          </button>
        </form>
      </motion.div>

      <div className="mt-6 w-full max-w-lg">
        {tasks.length === 0 ? (
          <p className="text-center text-stone-500">
            No tasks yet. Start adding some!
          </p>
        ) : (
          tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="my-3 p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-stone-600">
                  {task.title}
                </h3>
                <p className="text-sm text-stone-400">Due: {task.dueDate}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-stone-500 hover:text-stone-600 p-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
