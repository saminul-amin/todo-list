import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";

export default function InProgress() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: currentTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentTasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5001/in-progress");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  //   console.log(currentTasks);

  // Function to add a task
  const onSubmit = (data) => {
    console.log(data);
    const task = { title: data.title, dueDate: data.date };
    axios
      .post("http://localhost:5001/in-progress", task)
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
    // console.log(id);
    Swal.fire({
      title: "Are you sure you want to delete the task?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete it",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        axios.delete(`http://localhost:5001/in-progress/${id}`).then((res) => {
          console.log(res);
          refetch();
        });
      } else if (result.isDenied) {
        Swal.fire("Task was not deleted", "", "info");
      }
    });
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
            {...register("date", { required: "Due Date is Required" })}
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
        {currentTasks.length === 0 ? (
          <p className="text-center text-stone-500">
            No tasks yet. Start adding some!
          </p>
        ) : (
          currentTasks.map((task, index) => (
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
                  onClick={() => handleEdit(task._id)}
                  className="text-stone-500 hover:text-stone-600 p-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
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
