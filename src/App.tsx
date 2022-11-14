import React from 'react';
import "./assets/main.css"
import PlayerBoard from './components/PlayerBoard';

interface IProps {
  name?: string;
}

interface IState {
  gameStarted?: boolean;
  isPlaying: string;
}


export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameStarted: false,
      isPlaying: "Player 1",
    }
  }

  startGame = (): void => {
    this.setState({
      gameStarted: true,
    })
  }
  setPlaying = (player: string): void => {
    this.setState({
      isPlaying: player,
    })
  }



  render(): React.ReactNode {
    return (
      <div className='flex flex-col items-center'>
        <button className='mt-10 border-2 rounded-md py-2 text-[#fff] font-bold w-40 hover:scale-110 
        transition absolute bg-sky-500 hover:bg-sky-700' onClick={this.startGame}>Start game</button>
        <div className='flex h-screen w-screen items-center justify-around '>
          <PlayerBoard bgColor='#FF424E' whichPlayer="Player 1" isPlaying={this.state.isPlaying} setPlaying={this.setPlaying} />
          <PlayerBoard bgColor='#FC820A' whichPlayer='Player 2' isPlaying={this.state.isPlaying} setPlaying={this.setPlaying} />
        </div>
      </div>
    )
  }
}

