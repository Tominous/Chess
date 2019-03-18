class ChessBoard
{
	constructor(canvasRef)
	{
		this.canvas = canvasRef;
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;


		// Constants
		this.squares = 8;
		this.colours = {
			dark: "#8B4513",
			light: "#F5DEB3"
		}
		
		this.squarepx = this.width / this.squares;
	}

	// Updates the board with the positions of current pieces
	draw()
	{
		// Fill regular chess pattern
		for (var row = 0; row < this.squares; row++)
		{
			for (var column = 0; column < this.squares; column++)
			{
				this.ctx.fillStyle = (row + column) % 2 ? this.colours.light : this.colours.dark;
				this.ctx.fillRect(row * this.squarepx, column * this.squarepx, this.squarepx, this.squarepx);
			}
		}
	}
}

var board = new ChessBoard(document.getElementById("chessBoard"));
board.draw();