import React from "react";
import "./assets/main.css";
import PlayerBoard from "./components/PlayerBoard";
import { ShipContext } from "./context/shipBattleContext";

interface IProps {
  name?: string;
}

interface IState {
  gameStarted?: boolean;
}

export default class App extends React.Component<IProps, IState> {
  context!: React.ContextType<typeof ShipContext>;
  constructor(props: any) {
    super(props);
    this.state = {
      gameStarted: false,
    };
  }

  startGame = (): void => {
    this.setState({
      gameStarted: true,
    });
  };

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center">
        <button
          className="mt-10 border-2 rounded-md py-2 text-[#fff] font-bold w-40 hover:scale-110 
        transition absolute bg-sky-500 hover:bg-sky-700"
          onClick={this.startGame}
        >
          Start game
        </button>
        <div className="flex h-screen w-screen items-center justify-around ">
          <PlayerBoard bgColor="#FF424E" whichPlayer={"Player 1"} />
          <PlayerBoard bgColor="#FC820A" whichPlayer={"Player 2"} />
        </div>
      </div>
    );
  }
}

App.contextType = ShipContext;
