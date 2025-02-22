import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function InProgress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
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
      const res = await axios.get("https://todo-list-one-inky-15.vercel.app/in-progress");
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
      .post("https://todo-list-one-inky-15.vercel.app/in-progress", task)
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

  const openModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Function to edit a task
  const updateTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const editedTitle = form.editedTitle.value;
    const editedDate = form.editedDate.value;
    const newTask = { title: editedTitle, dueDate: editedDate };
    console.log(newTask);
    axios
      .put(`https://todo-list-one-inky-15.vercel.app/in-progress/${editingTask._id}`, newTask)
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => console.log(err));
    closeModal();
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
        axios.delete(`https://todo-list-one-inky-15.vercel.app/in-progress/${id}`).then((res) => {
          console.log(res.data);
          refetch();
        });
      } else if (result.isDenied) {
        Swal.fire("Task was not deleted", "", "info");
      }
    });
  };

  // Function to handle drag and drop
  const handleDragEnd = async (result) => {
    // console.log(result);
    if (!result.destination) return;
    const updatedTasks = [...currentTasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    // setTasks(updatedTasks);
    // console.log("hi", updatedTasks);
    try {
      await axios.put("https://todo-list-one-inky-15.vercel.app/api/in-progress/reorder", {
        tasks: updatedTasks,
      });
      refetch(); 
    } catch (error) {
      console.error("Error updating task order:", error);
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

      <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasksList" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false} >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mt-6 w-full max-w-lg"
                  >
                    {currentTasks.length === 0 ? (
                      <p className="text-center text-stone-500">
                        No tasks yet. Start adding some!
                      </p>
                    ) : (
                      currentTasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={String(task?._id)}
                          index={index}
                        >
                          {(provided) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="my-3 p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
                              whileDrag={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                              layout
                            >
                              <div>
                                <h3 className="text-lg font-semibold text-stone-600">
                                  {task.title}
                                </h3>
                                <p className="text-sm text-stone-400">
                                  Due: {task.dueDate}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openModal(task)}
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
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
      {/* Edit Modal */}
      {isModalOpen && (
        <motion.div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target.id === "modal-background" && closeModal()}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-lg text-center font-semibold text-gray-700 mb-4">
              Update Task
            </h2>
            <form onSubmit={updateTask} className="space-y-4">
              <input
                name="editedTitle"
                placeholder="Task Title"
                className="w-full p-2 border rounded"
                defaultValue={editingTask.title}
                required
              />
              <input
                type="date"
                name="editedDate"
                className="w-full p-2 border rounded"
                defaultValue={editingTask.dueDate}
                required
              />
              <div className="flex justify-center gap-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-500 hover:bg-stone-700 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
