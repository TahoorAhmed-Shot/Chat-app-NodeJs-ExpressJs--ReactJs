import "./App.css";
import io from "socket.io-client";
// import Index from "./component/Index";
import Chat from "./component/Chat";
import { useState } from "react";

const sokit = io.connect("http://10.0.0.37:80");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(true);
  const join = () => {
    if (name !== "" && room !== "") {
      sokit.emit("join_room", room);
      setShow(false);
    }
  };
  return (
    <>
      {show ? (
        <section className="text-black  ">
          <div className="container px-5 py-24 mx-auto my-32 ">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-900">
                Real Time Chat-Application
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Enter name And privet room id to join chat with 💕💕💕❤😍😜
              </p>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-black"
                >
                  Full Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  id="full-name"
                  name="name"
                  className="w-full bg-white bg-opacity-50 rounded border border-green-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <label htmlFor="email" className="leading-7 text-sm text-black">
                  Room
                </label>
                <input
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                  type="text"
                  id="room"
                  name="room"
                  className="w-full bg-white bg-opacity-50 rounded border border-green-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={join}
                className="text-white  bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                join
              </button>
            </div>
          </div>
        </section>
      ) : (
        <Chat sokit={sokit} user={name} room={room}></Chat>
      )}
    </>
  );
}

export default App;
