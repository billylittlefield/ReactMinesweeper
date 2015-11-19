(function (React) {
  var Game = React.createClass({
    getInitialState: function() {
      return { board: new window.Minesweeper.Board(10, 10),
               gameOver: false,
               gameWon: false };
    },

    updateGame: function (pos, flag) {
      var row = pos[0];
      var col = pos[1];

      var tile = this.state.board.grid[row][col];
      if(flag) {
        tile.toggleFlag();
      } else {
        tile.explore();
      }
      this.setState({ gameWon: this.state.board.won(),
                      gameOver: this.state.board.won() || this.state.board.lost()});
    },

    render: function () {
      var displayMessage = "";
      var modalClass = "modal";
      var modalScreenClass = "";
      if (this.state.gameWon) {
        // debugger;
        modalClass += " is-active";
        modalScreenClass += "active";
        displayMessage = "Congratulations, you won!";
      } else if (this.state.gameOver) {
        displayMessage = "Boom! You lost!";
        modalClass += " is-active";
        modalScreenClass += "active";

      }
      return (
        <div className="container">
          <section className={modalScreenClass}>
            <section id="modal" className={modalClass}>
              <article className="modal-content">
                <h1>{displayMessage}</h1>
                <input type="button" onClick={this.restartGame} value="Play Again?"></input>
              </article>
            </section>
          </section>
          <h1>Minesweeper</h1>
          <h2>{">> Click to explore"}</h2>
          <h2>{">> Alt-click to flag"}</h2>

          <Board board={this.state.board} updateGame={this.updateGame}/>
        </div>
      );
    },
    restartGame: function() {
      this.setState({ board: new window.Minesweeper.Board(10, 10),
               gameOver: false,
               gameWon: false });
    }

  });

  var Board = React.createClass({
    render: function() {
      return (
        <div className="game-board group">
          {this.props.board.grid.map(function(row, rowIdx) {
            return (
              <div className="row group" key={rowIdx}>
              {
                row.map(function(tile, colIdx) {
                  return <Tile className="tile"
                               tile={tile}
                               position={[rowIdx, colIdx]}
                               updateGame={this.props.updateGame}
                               key={colIdx} />;
                }.bind(this))
              }
              </div>
            );
          }.bind(this))}
        </div>
      );
    }
  });

  var Tile = React.createClass({


    render: function() {

      this.getTileInfo();
      return(
        <div onClick={ this.handleClick } className={this.tileClass} >
          { this.tileImage }
        </div>
      );
    },
    handleClick: function(e) {
      var flagged = e.altKey ? true : false;
      this.props.updateGame(this.props.position, flagged);
    },

    getTileInfo: function() {
      var tile = this.props.tile;
      this.tileClass = "tile ";
      this.tileImage = "";

      if (tile.bombed && tile.explored) {
        this.tileClass += "bomb";
        this.tileImage = "\u2622";
      } else if (tile.explored) {
          if (tile.adjacentBombCount() >= 1) {
            this.tileImage = tile.adjacentBombCount().toString();
          } else {
            this.tileImage = "";
          }
          this.tileClass += "adjacent";
      } else if (tile.flagged) {
        this.tileClass += "flagged";
        this.tileImage = "\u2691";
      } else {
        this.tileClass += "hidden";
      }
    }
  });

  React.render(
    <Game />,
    document.body
  );

})(window.React);
