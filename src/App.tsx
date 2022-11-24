import React from "react";
import "./assets/main.css";
import ArrangementBoard from "./components/ArrangementBoard";
import GameBoard from "./components/GameBoard";
import MemoTypedText from "./components/TypedText";
import Winner from "./components/Winner";
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
          onClick={() => this.context.restartGame()}
        >
          {this.context.gameStarted ? "Restart" : "Start"}
        </button>
        {this.context.gameStarted ? (
          <div className="flex h-screen w-screen items-center justify-around flex-wrap">
            {this.context.choosingPlayer === "bothChosen" ? (
              <>
                <GameBoard whichPlayer="Player 1" />
                <GameBoard whichPlayer="Player 2" />
              </>
            ) : (
              <>
                <ArrangementBoard bgColor="#FF424E" whichPlayer={"Player 1"} />
                <ArrangementBoard bgColor="#FC820A" whichPlayer={"Player 2"} />
              </>
            )}
          </div>
        ) : (
          <MemoTypedText />
        )}
        {this.context.winner ? <Winner /> : ""}
      </div>
    );
  }
}

App.contextType = ShipContext;
