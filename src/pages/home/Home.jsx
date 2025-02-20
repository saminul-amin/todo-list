import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "@fontsource/coiny";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const features = [
  "Collaborative Note Editing",
  "Folder Organization",
  "Real-time Syncing",
  "Secure & Private Notes",
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-500 to-stone-600 text-white flex flex-col items-center p-8">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mt-16"
      >
        Welcome to{" "}
        <span className="text-stone-300" style={{ fontFamily: "Coiny, serif" }}>
          D'Oh List
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-stone-300 mt-4 max-w-2xl text-center"
      >
        Your ultimate collaborative note-taking app. Organize, edit, and share
        your thoughts effortlessly.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8"
      >
        <Link to={user?.email ? "/tasks" : "/signup"}>
          <button className="px-6 py-3 text-lg font-semibold bg-stone-300 text-black rounded-xl shadow-lg hover:bg-stone-400">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center space-x-4 bg-stone-600 p-4 rounded-xl shadow-lg"
          >
            <FaCheckCircle className="text-stone-300 text-2xl" />
            <p className="text-lg font-medium text-stone-200">{feature}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
