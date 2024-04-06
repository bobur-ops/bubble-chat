/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<{ value: string; id: number }[]>([]);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleKeyPress = useCallback(
    (event: any) => {
      switch (event.key) {
        case "Enter":
          if (newMessage === "") return;

          // eslint-disable-next-line no-case-declarations
          const newId = generateRandomId();
          setMessages((prev) => [...prev, { value: newMessage, id: newId }]);
          setNewMessage("");
          setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== newId));
          }, 12000);
          break;
        case "Backspace":
          setNewMessage((prev) => prev.slice(0, -1));
          break;

        default:
          if (event.key.length === 1) {
            setNewMessage((prev) => prev + event.key);
          }
          break;
      }
    },
    [newMessage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 0,
      }}
    >
      <div style={{ height: "60vh" }} className="yours messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`message ${index === messages.length - 1 && "last"}`}
            >
              {message.value}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="yours messages" style={{ marginTop: 0, height: 48 }}>
        <AnimatePresence>
          {newMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="message last"
            >
              {newMessage}
              <span className="cursor"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
