import React from "react";
import Tetrahedron from "../../../game/components/Pieces/Tetrahedron";

const Header = () => {
    return (
        <header className="py-5 bg-black text-white text-center flex flex-row justify-between">
            <div className="h-8 w-8 ml-8 mr-8 mt-auto mb-auto">
                <Tetrahedron />
            </div>
            <h1 className="font-bold text-2xl">
                <a href="/">Prometheus Concept</a>
            </h1>
            <div className="h-8 w-8 ml-8 mr-8 mt-auto mb-auto">
                <Tetrahedron />
            </div>
        </header>
    );
}

export default Header;
