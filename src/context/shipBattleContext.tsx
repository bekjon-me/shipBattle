import React, { ReactElement } from "react";

interface initialStateType {
  gameStarted: boolean;
  player1: string;
  player2: string;
  choosingPlayer: string;
  attackingPlayer: string;
  settedShips: { player1: number[]; player2: number[] };
  shouldAttack: number;
  winner: string;
  restartGame: () => void;
  setPlayer1: (newName: string) => void;
  setPlayer2: (newName: string) => void;
  setChoosingPlayer: (player: string) => void;
  setAttackingPlayer: (player: string) => void;
  setSettedShips: (ships: { player1: number[]; player2: number[] }) => void;
  setShouldAttack: (shouldAttack: number) => void;
  setWinner: (winner: string) => void;
}

const initialState: initialStateType = {
  gameStarted: false,
  player1: "Player 1",
  player2: "Player 2",
  choosingPlayer: "Player 1",
  attackingPlayer: "",
  settedShips: { player1: [], player2: [] },
  shouldAttack: 1,
  winner: "",
  restartGame: () => {},
  setPlayer1: (newName) => {},
  setPlayer2: (newName) => {},
  setChoosingPlayer: (player) => {},
  setAttackingPlayer: (player) => {},
  setSettedShips: (ships) => {},
  setShouldAttack: (shouldAttack) => {},
  setWinner: (winner) => {},
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

  restartGame = (): void => {
    this.setState({
      gameStarted: !this.state.gameStarted,
      player1: "Player 1",
      player2: "Player 2",
      choosingPlayer: "Player 1",
      attackingPlayer: "",
      settedShips: { player1: [], player2: [] },
      shouldAttack: 1,
      winner: "",
    });
  };

  setAttackingPlayer = (player: string): void => {
    this.setState({ attackingPlayer: player });
  };

  setSettedShips = (ships: { player1: number[]; player2: number[] }): void => {
    this.setState({ settedShips: ships });
  };

  setShouldAttack = (shouldAttack: number): void => {
    this.setState({ shouldAttack });
  };

  setWinner = (winner: string): void => {
    this.setState({ winner });
  };

  render(): React.ReactNode {
    const {
      player1,
      player2,
      choosingPlayer,
      gameStarted,
      attackingPlayer,
      settedShips,
      shouldAttack,
      winner,
    } = this.state;
    const {
      setPlayer1,
      setPlayer2,
      setChoosingPlayer,
      restartGame,
      setAttackingPlayer,
      setSettedShips,
      setShouldAttack,
      setWinner,
    } = this;
    return (
      <ShipContext.Provider
        value={{
          gameStarted,
          player1,
          player2,
          choosingPlayer,
          attackingPlayer,
          settedShips,
          shouldAttack,
          winner,
          restartGame,
          setPlayer1,
          setPlayer2,
          setChoosingPlayer,
          setAttackingPlayer,
          setSettedShips,
          setShouldAttack,
          setWinner,
        }}
      >
        {this.props.children}
      </ShipContext.Provider>
    );
  }
}
