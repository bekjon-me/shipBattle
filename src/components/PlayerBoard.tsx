import React from 'react'
import Field from './Field';

interface IProps {
    bgColor: string;
    whichPlayer: string;
    setPlaying: (player: string) => void;
    isPlaying: string;
}

interface IState {
    fields: number[];
}

function range(start: number, end: number): number[] {
    if (start === end) return [start];
    return [start, ...range(start + 1, end)];
}

export default class PlayerBoard extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fields: range(0, 24),
        };
    }

    setShip = (field: number): void => {
        if (this.state.fields.filter(x => x >= 100).length < 8) {
            // check user can place ship
            for (let index = 0; index < this.state.fields.length; index++) {
                if (this.state.fields[index] === field && field !== index + 100) {
                    // if field and index are the same, then we found the field we want to change to 100 + index, if field is equal to 100 + index, it is already set
                    this.setState({
                        fields: [...this.state.fields.slice(0, index), index + 100, ...this.state.fields.slice(index + 1)],
                    })
                } else if (this.state.fields[index] === field && field === index + 100) {
                    // if field and index are the same, then we found the ship that is setted, we want to change to previus state, it is equal to an empty field again
                    this.setState({
                        fields: [...this.state.fields.slice(0, index), index, ...this.state.fields.slice(index + 1)],
                    })
                }

            }
        } else if (this.state.fields.filter(x => x >= 100).length === 8) {
            for (let index = 0; index < this.state.fields.length; index++) {
                // if the user has placed all ships and wants to remove a ship
                if (this.state.fields[index] === field && field === index + 100) {
                    this.setState({
                        fields: [...this.state.fields.slice(0, index), index, ...this.state.fields.slice(index + 1)],
                    })
                } else if (this.state.fields[index] === field && field !== 100) {
                    alert("You can't place more ships")
                }
            }
        }
    };

    confirmShipsPlace = (): void => {
        if (this.state.fields.filter(x => x >= 100).length === 8) {
            if (this.props.whichPlayer === "Player 2") {
                this.props.setPlaying("bothPlaying")
                console.log("player 2: " + this.state.fields);
            } else {
                this.props.setPlaying("Player 2");
                console.log("player 1: " + this.state.fields);
            }
        } else {
            alert("You need to set all ships!")
        }
    }




    render(): React.ReactNode {
        return (
            <div className='flex flex-col items-center relative'>
                <h2 className='text-2xl mb-2'>{this.props.whichPlayer}</h2>
                <div className={(this.props.whichPlayer !== this.props.isPlaying && this.props.isPlaying !== "bothPlaying") ? `inline-grid grid-cols-5 gap-2 bg-[${this.props.bgColor}] p-5 rounded-lg opacity-40` : `inline-grid grid-cols-5 gap-2 bg-[${this.props.bgColor}] p-5 rounded-lg`} >
                    {
                        this.state.fields.map((field, index) => (
                            <Field key={index} field={field} setShip={this.setShip} hidden={this.props.isPlaying === this.props.whichPlayer ? false : true} />
                        ))
                    }
                </div>
                {this.props.whichPlayer === this.props.isPlaying
                    ? (<button className='absolute -bottom-14 border border-black py-1 px-4 rounded mt-4 bg-[#1A94FF] text-white' onClick={this.confirmShipsPlace}>Confirm</button>
                    )
                    : ""
                }
            </div>
        );
    }
}
