import React, { FormEvent } from "react";
import { ShipContext } from "../context/shipBattleContext";
import Field from "./Field";
import { SubmitIcon, EditIcon } from "../assets/icons";

interface IProps {
  bgColor: string;
  whichPlayer: string;
}

interface IState {
  fields: number[];
  isEditingName: boolean;
  editingName: string;
}

function range(start: number, end: number): number[] {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

export default class PlayerBoard extends React.Component<IProps, IState> {
  wrapperRef: React.RefObject<HTMLFormElement>;
  context!: React.ContextType<typeof ShipContext>;
  constructor(props: any) {
    super(props);
    this.state = {
      fields: range(0, 24),
      isEditingName: false,
      editingName: "",
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
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

  confirmShipsPlace = (): void => {
    if (this.state.fields.filter((x) => x >= 100).length === 8) {
      if (this.context.choosingPlayer === this.context.player2) {
        this.context.setChoosingPlayer("bothChosen");
        console.log("player 2: " + this.state.fields);
      } else {
        this.context.setChoosingPlayer("Player 2");
        console.log("player 1: " + this.state.fields);
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

  handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      editingName: e.target.value,
    });
  };

  handleEditChangeStatus = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      isEditingName: !this.state.isEditingName,
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  handleEditName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.editingName.trim() !== "") {
      let editingName = this.state.editingName.trim();
      if (this.props.whichPlayer === "Player 1") {
        this.context.setPlayer1(editingName);
        this.setState({ editingName: "" });
      } else if (this.props.whichPlayer === "Player 2") {
        this.context.setPlayer2(editingName);
        this.setState({ editingName: "" });
      }
      this.setState({
        isEditingName: false,
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  };

  handleClickOutside(event: MouseEvent | any): void {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      this.setState({
        isEditingName: false,
      });
    }
  }

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center relative">
        {this.state.isEditingName ? (
          <form
            ref={this.wrapperRef}
            className="flex items-center gap-4 mb-2"
            onSubmit={this.handleEditName}
          >
            <input
              type="text"
              value={this.state.editingName}
              onChange={this.handleChangeName}
              required
              className="bg-gray-200 rounded-md px-2 py-1 w-32 focus:outline-none"
              autoFocus
            />
            <button type="submit">
              <img src={SubmitIcon} alt="submitBtn" className="w-7" />
            </button>
          </form>
        ) : (
          <form
            className="flex items-center gap-4 mb-2 cursor-pointer"
            onSubmit={this.handleEditChangeStatus}
          >
            <h2 className="text-2xl">
              {this.props.whichPlayer === "Player 1"
                ? this.context.player1
                : this.context.player2}
            </h2>
            <button type="submit">
              <img src={EditIcon} alt="editIcon" className="w-8" />
            </button>
          </form>
        )}

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
      </div>
    );
  }
}

PlayerBoard.contextType = ShipContext;
