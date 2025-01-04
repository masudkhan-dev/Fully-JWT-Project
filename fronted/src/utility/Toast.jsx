/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Info, Bell, Sparkles } from "lucide-react";

const ToastContext = createContext(null);

const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.id);
    case "UPDATE_TOAST":
      return state.map((toast) =>
        toast.id === action.id ? { ...toast, ...action.updates } : toast
      );
    default:
      return state;
  }
};

// eslint-disable-next-line react/display-name
const Toast = React.memo(
  ({
    id,
    title,
    message,
    type = "default",
    duration = 5000,
    onRemove,
    action,
  }) => {
    const variants = {
      initial: {
        x: 50,
        y: 0,
        opacity: 0,
        scale: 0.8,
        rotate: 2,
      },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
      },
      exit: {
        x: 50,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 1, 1],
        },
      },
    };

    const getToastStyles = () => {
      switch (type) {
        case "success":
          return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 dark:from-green-950/50 dark:to-emerald-950/50 dark:border-green-900";
        case "error":
          return "bg-gradient-to-r from-red-50 to-rose-50 border-red-100 dark:from-red-950/50 dark:to-rose-950/50 dark:border-red-900";
        case "warning":
          return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100 dark:from-yellow-950/50 dark:to-amber-950/50 dark:border-yellow-900";
        case "info":
          return "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100 dark:from-blue-950/50 dark:to-cyan-950/50 dark:border-blue-900";
        case "magic":
          return "bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 border-purple-100 dark:from-purple-950/50 dark:via-fuchsia-950/50 dark:to-pink-950/50 dark:border-purple-900";
        default:
          return "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-100 dark:from-slate-950/50 dark:to-gray-950/50 dark:border-slate-800";
      }
    };

    const IconComponent = () => {
      const iconProps = {
        className: `${
          type === "success"
            ? "text-green-500"
            : type === "error"
            ? "text-red-500"
            : type === "warning"
            ? "text-yellow-500"
            : type === "info"
            ? "text-blue-500"
            : type === "magic"
            ? "text-purple-500"
            : "text-slate-500"
        } h-5 w-5`,
      };

      const iconMap = {
        success: <Check {...iconProps} />,
        error: <X {...iconProps} />,
        warning: <AlertTriangle {...iconProps} />,
        info: <Info {...iconProps} />,
        magic: <Sparkles {...iconProps} />,
        default: <Bell {...iconProps} />,
      };

      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          {iconMap[type]}
        </motion.div>
      );
    };

    return (
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`
        group relative overflow-hidden rounded-lg border px-6 py-4
        shadow-lg backdrop-blur-sm
        ${getToastStyles()}
      `}
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>

        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 pt-1">
            <IconComponent />
          </div>

          <div className="flex-1 space-y-1">
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-semibold text-slate-900 dark:text-slate-100"
              >
                {title}
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                {message}
              </motion.div>
            )}

            {action && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-2"
              >
                {action}
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(id)}
            className="absolute right-2 top-2 rounded-full p-1 text-slate-500 opacity-0 transition-opacity hover:text-slate-900 group-hover:opacity-100 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>

        {duration !== Infinity && (
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            onAnimationComplete={() => onRemove(id)}
            className={`
            absolute bottom-0 left-0 right-0 h-1 
            ${
              type === "success"
                ? "bg-green-200 dark:bg-green-800"
                : type === "error"
                ? "bg-red-200 dark:bg-red-800"
                : type === "warning"
                ? "bg-yellow-200 dark:bg-yellow-800"
                : type === "info"
                ? "bg-blue-200 dark:bg-blue-800"
                : type === "magic"
                ? "bg-purple-200 dark:bg-purple-800"
                : "bg-slate-200 dark:bg-slate-700"
            }
            origin-left
          `}
          />
        )}

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
          }}
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </motion.div>
    );
  }
);

// eslint-disable-next-line react/display-name
const ToastContainer = React.memo(({ toasts, onRemove }) => (
  <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]">
    <AnimatePresence mode="popLayout">
      {toasts.map((toast) => (
        <Toast key={toast.id} onRemove={onRemove} {...toast} />
      ))}
    </AnimatePresence>
  </div>
));

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const toast = useCallback((options) => {
    const id = Date.now();
    dispatch({ type: "ADD_TOAST", toast: { id, duration: 5000, ...options } });
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", id });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={dismiss} />
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
