import React from "react";
import "./assets/main.css";
import PlayerBoard from "./components/PlayerBoard";
import PlayerName from "./components/PlayerName";
import MemoTypedText from "./components/TypedText";
import { ShipContext } from "./context/shipBattleContext";

interface IProps {
  name?: string;
}

interface IState {
  gameStarted?: boolean;
}

export default class App extends React.Component<IProps, IState> {
  context!: React.ContextType<typeof ShipContext>;

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center">
        <button
          className="mt-10 border-2 rounded-md py-2 text-[#fff] font-bold w-40 hover:scale-110 
        transition absolute bg-sky-500 hover:bg-sky-700 cursor-pointer"
          onClick={() => this.context.setGameStarted(!this.context.gameStarted)}
        >
          {this.context.gameStarted ? "Restart" : "Start"}
        </button>
        {this.context.gameStarted ? (
          <div className="flex h-screen w-screen items-center justify-around ">
            <PlayerBoard bgColor="#FF424E" whichPlayer={"Player 1"} />
            <PlayerBoard bgColor="#FC820A" whichPlayer={"Player 2"} />
          </div>
        ) : (
          <MemoTypedText />
        )}
      </div>
    );
  }
}

App.contextType = ShipContext;
