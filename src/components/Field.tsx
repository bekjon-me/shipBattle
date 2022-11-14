import React from 'react';

interface IProps {
    field: number;
    setShip: (field: number) => void;
    hidden: boolean;
}

export default class Field extends React.Component<IProps> {
    render(): React.ReactNode {
        return this.props.hidden ? (
            <div className='border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer' onClick={() => alert("Other player is playing")} />
        ) :
            (
                <div className='border border-solid border-black w-10 h-10 bg-indigo-600 rounded-md shadow-lg shadow-indigo-500/40 hover:scale-110 cursor-pointer' onClick={() => this.props.setShip(this.props.field)} >
                    {this.props.field >= 100 ? <div className='bg-black w-full h-full rounded-md'></div> : ""}
                </div >
            )
    }
}
