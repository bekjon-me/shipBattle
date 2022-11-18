import React, { ReactElement } from "react";

interface initialStateType {
  player1: string;
  player2: string;
  choosingPlayer: string;
  setPlayer1: (newName: string) => void;
  setPlayer2: (newName: string) => void;
  setChoosingPlayer: (player: string) => void;
}

const initialState: initialStateType = {
  player1: "Player 1",
  player2: "Player 2",
  choosingPlayer: "Player 1",
  setPlayer1: (newName) => {},
  setPlayer2: (newName) => {},
  setChoosingPlayer: (newName) => {},
};

export const ShipContext = React.createContext<initialStateType>(initialState);

export default class ShipProvider extends React.Component<
  any,
  initialStateType
> {
  state = initialState;

  setPlayer1 = (newName: string): void => {
    this.setState({ player1: newName });
  };
  setPlayer2 = (newName: string): void => {
    this.setState({ player2: newName });
  };

  setChoosingPlayer = (player: string): void => {
    this.setState({ choosingPlayer: player });
  };

  render(): React.ReactNode {
    const { player1, player2, choosingPlayer } = this.state;
    const { setPlayer1, setPlayer2, setChoosingPlayer } = this;
    return (
      <ShipContext.Provider
        value={{
          player1,
          player2,
          choosingPlayer,
          setPlayer1,
          setPlayer2,
          setChoosingPlayer,
        }}
      >
        {this.props.children}
      </ShipContext.Provider>
    );
  }
}
