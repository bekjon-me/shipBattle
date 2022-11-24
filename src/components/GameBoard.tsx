import React, { Component } from "react";
import { range } from "../consts/range";
import { ShipContext } from "../context/shipBattleContext";
import Field from "./Field";

interface IProps {
  whichPlayer: string;
}

interface IState {
  fields: number[];
  selectedShip: number;
  isMissed: boolean;
}

export default class GameBoard extends Component<IProps, IState> {
  context!: React.ContextType<typeof ShipContext>;
  constructor(props: any) {
    super(props);
    this.state = {
      fields: range(0, 24),
      selectedShip: 0,
      isMissed: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>
  ): void {
    if (this.state.fields !== prevState.fields) {
      if (this.state.fields.filter((x) => x < 200).length === 0) {
        this.setState({ isMissed: true });
      }
      if (this.state.fields.filter((x) => x >= 200 && x < 300).length === 8) {
        if (this.props.whichPlayer === "Player 1") {
          this.context.setWinner(this.context.player2);
        } else {
          this.context.setWinner(this.context.player1);
        }
      }
    }
  }

  setShip = (field: number): void => {
    if (field < 200) {
      if (this.state.isMissed) {
        alert("You can't attack after missing");
      } else {
        let indexOfSettedField = this.state.fields.indexOf(field);
        if (field >= 100 && this.state.selectedShip === 1) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, indexOfSettedField),
              indexOfSettedField - 100,
              ...this.state.fields.slice(indexOfSettedField + 1),
            ],
          });
          this.setState({ selectedShip: 0 });
        } else if (field < 100 && this.state.selectedShip === 0) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, indexOfSettedField),
              indexOfSettedField + 100,
              ...this.state.fields.slice(indexOfSettedField + 1),
            ],
          });
          this.setState({ selectedShip: 1 });
        }
      }
    } else {
      alert("This ship is already hitted");
    }
  };

  startMove = () => {
    if (this.context.shouldAttack === 1) {
      this.context.setAttackingPlayer("Player 1");
    } else {
      this.context.setAttackingPlayer("Player 2");
    }
  };

  attack = (): void => {
    if (this.state.selectedShip === 1) {
      let attackedField = this.state.fields.filter(
        (x) => x >= 100 && x < 200
      )[0];
      if (this.context.attackingPlayer === "Player 1") {
        if (this.context.settedShips.player2.includes(attackedField)) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, attackedField - 100),
              attackedField - 100 + 200, // 200 is a flag for hitted ship
              ...this.state.fields.slice(attackedField - 100 + 1),
            ],
          });
        } else if (!this.context.settedShips.player2.includes(attackedField)) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, attackedField - 100),
              attackedField - 100 + 300, // 300 is a flag for missed ship
              ...this.state.fields.slice(attackedField - 100 + 1),
            ],
            isMissed: true,
          });
        }
      } else if (this.context.attackingPlayer === "Player 2") {
        if (this.context.settedShips.player1.includes(attackedField)) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, attackedField - 100),
              attackedField - 100 + 200, // 200 is a flag for hitted ship
              ...this.state.fields.slice(attackedField - 100 + 1),
            ],
          });
        } else if (!this.context.settedShips.player1.includes(attackedField)) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, attackedField - 100),
              attackedField - 100 + 300, // 300 is a flag for missed ship
              ...this.state.fields.slice(attackedField - 100 + 1),
            ],
            isMissed: true,
          });
        }
      }
      this.setState({ selectedShip: 0 });
    } else {
      alert("You have to choose a ship to attack");
    }
  };

  endTurn = (): void => {
    if (this.state.isMissed) {
      this.setState({ isMissed: false });
    }
    this.context.setAttackingPlayer("");
    if (this.context.shouldAttack === 1) {
      this.context.setShouldAttack(2);
    } else {
      this.context.setShouldAttack(1);
    }
  };

  render(): React.ReactNode {
    return this.context.attackingPlayer ? (
      this.context.attackingPlayer !== this.props.whichPlayer ? (
        <div className="flex flex-col gap-y-2">
          <h2 className="text-center text-[24px]">
            {this.props.whichPlayer === "Player 1"
              ? this.context.player1
              : this.context.player2}
          </h2>
          <div className="inline-grid grid-cols-5 gap-2 bg-[#000000cc] p-5 rounded-lg">
            {this.state.fields.map((field, index) => (
              <Field
                key={index}
                field={field}
                whichPlayer={this.props.whichPlayer}
                setShip={this.setShip}
                hidden={
                  this.context.attackingPlayer !== this.props.whichPlayer
                    ? false
                    : true
                }
              />
            ))}
          </div>
          {this.state.isMissed ? (
            <button
              className="rounded-lg px-4 py-2 bg-yellow-500 hover:bg-yellow-600 duration-300"
              onClick={this.endTurn}
            >
              End Turn
            </button>
          ) : (
            <button
              className="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300"
              onClick={this.attack}
            >
              Attack
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <h2 className="text-center text-[24px]">
            {this.props.whichPlayer === "Player 1"
              ? this.context.player1
              : this.context.player2}
          </h2>
          <div className="inline-grid grid-cols-5 gap-2 bg-[#000000cc] p-5 rounded-lg opacity-40">
            {this.state.fields.map((field, index) => (
              <Field
                key={index}
                field={field}
                setShip={() => alert("You can't attack yourself")}
                hidden={
                  this.context.choosingPlayer === this.props.whichPlayer
                    ? false
                    : true
                }
              />
            ))}
          </div>
        </div>
      )
    ) : this.context.shouldAttack === 1 &&
      this.props.whichPlayer === "Player 1" ? (
      <div className="text-center bg-[#000000b2] p-6 rounded flex flex-col gap-y-4 duration-300">
        <h2 className="text-white text-[32px]">
          {this.context.player1 + "'s turn"}
        </h2>
        <button
          onClick={this.startMove}
          className="bg-[#e7e4e4cb] rounded px-2 py-4 text-[24px] hover:bg-[#e7e4e4] duration-300"
        >
          Start move
        </button>
      </div>
    ) : this.context.shouldAttack === 2 &&
      this.props.whichPlayer === "Player 2" ? (
      <div className="text-center bg-[#000000b2] p-6 rounded flex flex-col duration-300">
        <h2 className="text-white text-[32px]">
          {this.context.player2 + "'s turn"}
        </h2>
        <button
          onClick={this.startMove}
          className="bg-[#e7e4e4cb] rounded px-2 py-4 gap-y-4 text-[24px] hover:bg-[#e7e4e4] duration-300"
        >
          Start move
        </button>
      </div>
    ) : (
      ""
    );
  }
}

GameBoard.contextType = ShipContext;
