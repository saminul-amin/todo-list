import { Link, Outlet, useLocation } from "react-router-dom";

export default function Tasks() {
  const location = useLocation().pathname;

  return (
    <div>
      <div className="py-12 flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-stone-300">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-md w-6/12 min-h-screen">
          <div className="container mx-auto max-w-6xl grid grid-cols-3 gap-4">
            <Link
              to="todo"
              className={`text-center pb-4 ${
                location.endsWith("todo") && "border-b-4 border-stone-500"
              }`}
            >
              <button>To-Do</button>
            </Link>
            <Link
              to="in-progress"
              className={`text-center ${
                location.endsWith("in-progress") &&
                "border-b-4 border-stone-500"
              }`}
            >
              <button>In Progress</button>
            </Link>
            <Link
              to="done"
              className={`text-center ${
                location.endsWith("done") && "border-b-4 border-stone-500"
              }`}
            >
              <button>Done</button>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
