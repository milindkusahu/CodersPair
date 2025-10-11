import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const userId = user?._id;

  // Fetch connections if not available
  useEffect(() => {
    const fetchConnections = async () => {
      if (!connections || connections.length === 0) {
        try {
          setLoading(true);
          const res = await axios.get(`${BASE_URL}/user/connections`);
          dispatch(addConnections(res?.data?.data));
        } catch (error) {
          console.error("Error fetching connections:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConnections();
  }, [connections, dispatch]);

  // Find the target user from connections
  const targetUser = connections?.find((conn) => conn._id === targetUserId);

  useEffect(() => {
    if (!userId || !targetUser) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { userId, targetUserId });

    socketRef.current.on("messageReceived", ({ firstName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, text, timestamp: new Date() },
      ]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, targetUserId, targetUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage,
      });

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading || (!targetUser && (!connections || connections.length === 0))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-base-content/70 mb-4">
          This user might not be in your connections.
        </p>
        <button
          onClick={() => navigate("/connections")}
          className="btn btn-primary"
        >
          Back to Connections
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-16 bottom-0 flex flex-col bg-base-200">
      {/* Chat Header */}
      <div className="bg-base-300 shadow-md p-4 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => navigate("/connections")}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={targetUser.photoUrl || "/default-avatar.png"}
              alt={`${targetUser.firstName} ${targetUser.lastName}`}
            />
          </div>
        </div>

        <div>
          <h2 className="font-bold">
            {targetUser.firstName} {targetUser.lastName}
          </h2>
          <p className="text-xs text-base-content/70">
            {targetUser.isPremium && (
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium
              </span>
            )}
            {!targetUser.isPremium && "Active now"}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 text-base-content/30 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-base-content/70">
              No messages yet
            </h3>
            <p className="text-sm text-base-content/50 mt-2">
              Start the conversation with {targetUser.firstName}!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isCurrentUser = message.firstName === user.firstName;
              return (
                <div
                  key={index}
                  className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt={message.firstName}
                        src={
                          isCurrentUser
                            ? user.photoUrl || "/default-avatar.png"
                            : targetUser.photoUrl || "/default-avatar.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {message.firstName}
                    <time className="text-xs opacity-50 ml-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      isCurrentUser ? "chat-bubble-primary" : ""
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="bg-base-300 p-4 border-t border-base-content/10 flex-shrink-0">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="textarea textarea-bordered flex-1 resize-none"
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="btn btn-primary btn-square"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
