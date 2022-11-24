import React, { FormEvent } from "react";
import { ShipContext } from "../context/shipBattleContext";
import { range } from "../consts/range";
import Field from "./Field";
import PlayerName from "./PlayerName";
import SetShipActions from "./SetShipActions";

interface IProps {
  bgColor: string;
  whichPlayer: string;
}

interface IState {
  fields: number[];
  isEditingName: boolean;
}

export default class ArrangementBoard extends React.Component<IProps, IState> {
  context!: React.ContextType<typeof ShipContext>;
  constructor(props: any) {
    super(props);
    this.state = {
      fields: range(0, 24),
      isEditingName: false,
    };
  }

  setShip = (field: number): void => {
    if (this.state.fields.filter((x) => x >= 100).length < 8) {
      // check user can place ship
      for (let index = 0; index < this.state.fields.length; index++) {
        if (this.state.fields[index] === field && field !== index + 100) {
          // if field and index are the same, then we found the field we want to change to 100 + index, if field is equal to 100 + index, it is already set
          this.setState({
            fields: [
              ...this.state.fields.slice(0, index),
              index + 100,
              ...this.state.fields.slice(index + 1),
            ],
          });
        } else if (
          this.state.fields[index] === field &&
          field === index + 100
        ) {
          // if field and index are the same, then we found the ship that is setted, we want to change to previus state, it is equal to an empty field again
          this.setState({
            fields: [
              ...this.state.fields.slice(0, index),
              index,
              ...this.state.fields.slice(index + 1),
            ],
          });
        }
      }
    } else if (this.state.fields.filter((x) => x >= 100).length === 8) {
      for (let index = 0; index < this.state.fields.length; index++) {
        // if the user has placed all ships and wants to remove a ship
        if (this.state.fields[index] === field && field === index + 100) {
          this.setState({
            fields: [
              ...this.state.fields.slice(0, index),
              index,
              ...this.state.fields.slice(index + 1),
            ],
          });
        } else if (this.state.fields[index] === field && field !== 100) {
          alert("You can't place more ships");
        }
      }
    }
  };

  randomizeShips = (fields: number[], randomFields: number[]): void => {
    this.setState({
      fields: fields.map((field, index) => {
        if (randomFields.includes(index)) {
          return index + 100;
        } else {
          return field;
        }
      }),
    });
  };

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center relative">
        <PlayerName player={this.props.whichPlayer} />
        <div
          className={
            this.context.choosingPlayer === this.props.whichPlayer ||
            this.context.choosingPlayer === "bothChosen"
              ? `inline-grid grid-cols-5 gap-2 bg-[${this.props.bgColor}] p-5 rounded-lg`
              : `inline-grid grid-cols-5 gap-2 bg-[${this.props.bgColor}] p-5 rounded-lg opacity-40`
          }
        >
          {this.state.fields.map((field, index) => (
            <Field
              key={index}
              field={field}
              setShip={this.setShip}
              hidden={
                this.context.choosingPlayer === this.props.whichPlayer
                  ? false
                  : true
              }
            />
          ))}
        </div>

        {this.context.choosingPlayer !== "bothChosen" &&
        this.props.whichPlayer === this.context.choosingPlayer ? (
          <SetShipActions
            fields={this.state.fields}
            randomizeFields={this.randomizeShips}
          />
        ) : null}
      </div>
    );
  }
}

ArrangementBoard.contextType = ShipContext;
