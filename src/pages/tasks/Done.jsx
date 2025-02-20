import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Done() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: completedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/done");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  // Function to add a task
  const onSubmit = (data) => {
    console.log(data);
    const task = { title: data.title, dueDate: data.date };
    axios
      .post("http://localhost:5001/done", task)
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
            {...register("date", {
              required: "Date of Completion is Required",
            })}
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
        {completedTasks.length === 0 ? (
          <p className="text-center text-stone-500">
            No tasks yet. Start adding some!
          </p>
        ) : (
          completedTasks.map((task, index) => (
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
                <p className="text-sm text-stone-400">Completed: {task.dueDate}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-stone-500 hover:text-stone-600 p-2">
                  <Edit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-600 p-2">
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
