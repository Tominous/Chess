class ChessBoard
{
	constructor(canvasRef)
	{
		this.canvas = canvasRef;
		this.ctx = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.pieces = [];


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

class ChessPiece
{
	constructor(pos, ownedByPlayer1)
	{
		this.owningBoard = board;
		this.pos = pos;
		this.numMoves = 0;
		this.ownedByPlayer1 = ownedByPlayer1;
		this.image = "img/" + (this.ownedByPlayer1 === amIPlayer1 ? "w" : "b") + "_" + this.constructor.name.toLowerCase + ".png";
	}

	move(pos)
	{
		// Check that the move is within the bounds of the board
		if (pos.x >= 0 && pos.x <= this.owningBoard.squares && pos.y >= 0 && pos.y <= this.owningBoard.squares)
		{
			// Get the move position relative to our current position
			var relativePos = {
				x: this.pos.x - pos.x,
				y: this.pos.y - pos.y
			}

			if (this.__isValidMove(relativePos))
			{
				// If it is valid
				// Update our position
				this.pos = pos;

				// And increment the number of times this piece has moved
				this.numMoves++;
			}
		}
	}

	__isValidMove(pos)
	{
		// Child implemented
		// Check if the move is a valid move for this piece
	}
}

class Pawn extends ChessPiece
{
	constructor(pos)
	{
		// Call the parent constructor
		super(pos);
	}

	// Check if the move is a valid move for this piece
	__isValidMove(relativePos)
	{
		var newPos = {
			x: this.pos.x + relativePos.x,
			y: this.pos.y + relativePos.y
		};

		function isPieceInKillZone()
		{
			// Check if there is a piece that we can kill
			i = this.owningBoard.pieces.length;
			while (i--)
			{
				// For each piece on the board
				piece = this.owningBoard.pieces[i];

				if (
					// If it is not owned by the same player
					piece.ownedByPlayer1 != this.ownedByPlayer1
					&&
					// And it is in our new pos
					piece.pos == newPos
				)
				{
					return true;
				}
			}
			return false;
		}

		if (
			// If they are moving one ahead (Always allowed)
			(relativePos.y == 1 && relativePos.x == 0)
			||
			// Or if they are moving two ahead (Allowed on first move for this piece)
			(relativePos.y == 2 && relativePos.x == 0 && this.numMoves == 0)
			||
			// Or if they are moving one up and one to either side so as to kill another piece
			(relativePos.y == 1 && Math.abs(relativePos.x) == 1 && isPieceInKillZone())
		)
		{
			return true;
		}
		return false;
	}
}

var board = new ChessBoard(document.getElementById("chessBoard"));
board.draw();

var amIPlayer1 = true;