import React from "react";
import { useState } from "react";
import { useEffect } from "react";
function Chat({ user, room, sokit }) {

  const [currentMessage, setMessage] = useState("");
  const [datas, setData] = useState([]);
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      let messageData = {
        room: room,
        name: user,
        message: currentMessage,
        time: new Date().getHours(Date.now()) + ":" + new Date().getMinutes(),
      };
      await sokit.emit("send_message", messageData);
      setData((list) => [...list, messageData]);
    }
    setMessage("");
  };
  useEffect(() => {
    sokit.on("receive-message", (data) => {
      setData((list) => [...list, data]);
    });
   
  }, [sokit]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {datas.map((key) => {
              return (
                <div>
                  {user === key.name ? (
                    <div className="flex w-full mt-4 space-x-3  max-w-xs ml-auto justify-end">
                      <div>
                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{key.message}</p>
                        </div>
                        <p className="text-sm">{key.time}</p>
                      </div>

                      <p className=" text-sm  text-green-700 ">
                        {user === key.name ? "you" : "her"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full mt-4 space-x-3  max-w-xs mr-auto justify-start">
                      <div>
                        <div className="bg-green-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{key.message}</p>
                        </div>
                        <p className="text-sm">{key.time}</p>
                      </div>

                      <p className=" text-sm text-green-700">
                        {user === key.name ? "you" : "her"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="bg-blue-400 p-4">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
                sokit.emit("typing");
              }}
              value={currentMessage}
              className="flex items-center h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
            />
          </div>
          <button
            onClick={sendMessage}
            className="py-1 px-2  bg-green-700  justify-center flex mx-1  text-slate-100 rounded-md  my-2 "
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
