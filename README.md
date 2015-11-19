# Minesweeper

This is a simple minesweeper game written with React.

The JSX transformer loads JSX scripts via AJAX, which Chrome does not allow for scripts in a file:// path

Because the application.js file is using JSX, the JSX transformer needs to loads
JSX scripts via AJAX. Chrome won't allow this for a file:// path, and this game
is not currently deployed. Instead, follow these steps to run the game:
1. Download repository
2. Navigate to directory and run a simple python server with the following command:
  "python -m SimpleHTTPServer"
3. In your browser, go to localhost:8000
