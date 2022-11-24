import React from "react";
import { ShipContext } from "../context/shipBattleContext";
import { Cancel } from "../assets/icons";

interface IProps {
  field: number;
  setShip: (field: number) => void;
  hidden: boolean;
  whichPlayer?: string;
}

export default class Field extends React.Component<IProps> {
  context!: React.ContextType<typeof ShipContext>;
  render(): React.ReactNode {
    return this.context.settedShips.player2.length > 0 ? ( //when the user has setted all ships, and  the game starts
      this.props.whichPlayer === this.context.attackingPlayer ? ( //if the user is the attacking player
        <div className="border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer">
          {this.props.field >= 100 && this.props.field < 200 ? (
            <div className="bg-black w-full h-full rounded-md"></div>
          ) : (
            ""
          )}
        </div>
      ) : (
        //if the user is not the attacking player
        <div
          className="border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer"
          onClick={() => this.props.setShip(this.props.field)}
        >
          {this.props.field >= 100 && this.props.field < 200 ? (
            <div className="bg-transparent w-full h-full rounded-md">
              <img src={Cancel} alt="Cancel icon" />
            </div>
          ) : this.props.field >= 200 && this.props.field < 300 ? (
            <div className="bg-[#008000d2] w-full h-full rounded-md"></div> // if the user has hit the ship
          ) : (
            this.props.field >= 300 && (
              <div className="bg-[red] w-full h-full rounded-md"></div> //if the user has missed
            )
          )}
        </div>
      )
    ) : this.props.hidden ? ( //when players are choosing ships
      <div
        className="border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer"
        onClick={() => alert("Other player is choosing ships")}
      />
    ) : (
      <div
        className="border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer"
        onClick={() => this.props.setShip(this.props.field)}
      >
        {this.props.field >= 100 ? (
          <div className="bg-black w-full h-full rounded-md"></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Field.contextType = ShipContext;
