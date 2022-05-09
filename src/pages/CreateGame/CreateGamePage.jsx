import React from "react";

const CreateGamePage = () => {
    return(
        <div className="app p-8 flex flex-col justify-center items-center h-screen">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username" />
            </div>
        </div>
    );
}

export default CreateGamePage;
