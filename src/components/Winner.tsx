import React, { Component } from "react";
import { ShipContext } from "../context/shipBattleContext";

export default class Winner extends Component {
  context!: React.ContextType<typeof ShipContext>;
  render() {
    return (
      <div className="absolute h-[100vh] w-[100%] bg-slate-600 bg-opacity-60 flex flex-col justify-center items-center">
        <h2 className="text-white text-[32px]">
          Winner is {this.context.winner}
        </h2>
        <button
          className="mt-10 border-2 rounded-md py-2 text-[#fff] font-bold w-40 hover:scale-110 
        transition bg-sky-500 hover:bg-sky-700 cursor-pointer"
          onClick={() => {
            this.context.restartGame();
          }}
        >
          Restart
        </button>
      </div>
    );
  }
}

Winner.contextType = ShipContext;
