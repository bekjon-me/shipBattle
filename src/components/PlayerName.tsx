import React from "react";
import { SubmitIcon, EditIcon } from "../assets/icons";
import { ShipContext } from "../context/shipBattleContext";
import { range } from "../consts/range";

interface IProps {
  player: string;
}

interface IState {
  isEditingName: boolean;
  editingName: string;
}

export default class PlayerName extends React.Component<IProps, IState> {
  context!: React.ContextType<typeof ShipContext>;
  wrapperRef: React.RefObject<HTMLFormElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      isEditingName: false,
      editingName: "",
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleEditName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.editingName.trim() !== "") {
      let editingName = this.state.editingName.trim();
      if (this.props.player === "Player 1") {
        this.context.setPlayer1(editingName);
        this.setState({ editingName: "" });
      } else if (this.props.player === "Player 2") {
        this.context.setPlayer2(editingName);
        this.setState({ editingName: "" });
      }
      this.setState({
        isEditingName: false,
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
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

  handleClickOutside(event: MouseEvent | any): void {
    if (this.wrapperRef && !this.wrapperRef.current?.contains(event.target)) {
      this.setState({
        isEditingName: false,
      });
    }
  }

  render(): React.ReactNode {
    return (
      <>
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
              <img src={SubmitIcon} alt="submitBtn" className="w-7 rounded" />
            </button>
          </form>
        ) : (
          <form
            className="flex items-center gap-4 mb-2 cursor-pointer"
            onSubmit={this.handleEditChangeStatus}
          >
            <h2 className="text-2xl">
              {this.props.player === "Player 1"
                ? this.context.player1
                : this.context.player2}
            </h2>
            <button type="submit">
              <img src={EditIcon} alt="editIcon" className="w-8" />
            </button>
          </form>
        )}
      </>
    );
  }
}

PlayerName.contextType = ShipContext;
