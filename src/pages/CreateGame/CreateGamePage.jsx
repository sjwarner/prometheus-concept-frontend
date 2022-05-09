import React, {useState} from "react";
import axios from "axios";

const CreateGamePage = () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState(undefined);

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createParty = (username) => {
        if (!username) {
            setErrorMessage("Username must be set");
            setHasError(true);
            return;
        }

        setHasError(false);
        setIsLoading(true)

        axios
            .get(`${baseUrl}/createNamespace`)
            .then((res) => {
                setIsLoading(false);
                setRoomCode(res.data.namespace);
                // joinParty();
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
                setErrorMessage("Error creating room, server is unreachable")
                setHasError(true );
            });
    }

    return(
        <div className="app p-8 flex flex-col justify-center items-center h-screen">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username" onChange={(evt) => setUsername(evt.target.value)} />
                {hasError && (
                    <div className="mt-4">{errorMessage}</div>
                )}
                {!isLoading && !roomCode && (
                    <button className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            onClick={() => createParty(username)}>
                        Create game
                    </button>
                )}

                {roomCode && (
                    <div>
                        <p>
                            ROOM CODE: <br></br> <br></br>
                            <b className="" onClick={() => {}}>
                                {roomCode}
                            </b>
                        </p>
                        {/*{this.state.copied ? <p>Copied to clipboard</p> : null}*/}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateGamePage;
