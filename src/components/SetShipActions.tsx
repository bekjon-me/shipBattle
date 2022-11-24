import React, { Component } from "react";
import { ShipContext } from "../context/shipBattleContext";
import { range } from "../consts/range";

interface IProps {
  fields: number[];
  randomizeFields: (fields: number[], randomFields: number[]) => void;
}

export default class SetShipActions extends Component<IProps> {
  context!: React.ContextType<typeof ShipContext>;

  confirmShipsPlace = (): void => {
    if (this.props.fields.filter((x) => x >= 100).length === 8) {
      if (this.context.choosingPlayer === "Player 2") {
        this.context.setSettedShips({
          player1: this.context.settedShips.player1,
          player2: this.props.fields,
        });
        this.context.setChoosingPlayer("bothChosen");
      } else {
        this.context.setChoosingPlayer("Player 2");
        this.context.setSettedShips({
          player1: this.props.fields,
          player2: this.context.settedShips.player2,
        });
      }
    } else {
      alert("You need to set all ships!");
    }
  };

  setRandomShips = (): void => {
    let fields: number[] = range(0, 24);
    let randomFields: number[] = [];
    for (let index = 0; index < 8; index++) {
      let randomField = Math.floor(Math.random() * 25);
      if (randomFields.includes(randomField)) {
        index--;
      } else {
        randomFields.push(randomField);
      }
    }
    this.props.randomizeFields(fields, randomFields);
  };

  render(): React.ReactNode {
    return (
      <>
        {this.context.choosingPlayer === "Player 1" ||
        this.context.choosingPlayer === "Player 2" ? (
          <div className="flex gap-x-4 items-center absolute -bottom-14">
            <button
              className="border border-black py-1 px-4 rounded mt-4 bg-[#1A94FF] text-white"
              onClick={this.confirmShipsPlace}
            >
              Confirm
            </button>
            <button
              className="border border-black py-1 px-4 rounded mt-4 bg-[#0daf0d] text-white"
              onClick={this.setRandomShips}
            >
              Random
            </button>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

SetShipActions.contextType = ShipContext;
