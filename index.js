console.log("Soduko Solver")

function getChoices(board, index) {
    let choices = [];
    for (let value = 1; value <= 9; ++value) {
        if (acceptable(board, index, value)) {
            if (unique(board, index, value))
                return [ value ]; // it's useless to try anything else
            else
                choices.push(value);
        }
    }
    return choices;
}

function unique(board, index, value) {
    let { row, col } = i2rc(index);
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            let i = rc2i(r, c);
            if (i != index && !board[i] && acceptable(board, i, value)) {
                return false;
            }
        }
    }
    return true;
}
function one_value_cell_constraint(board) {
  updated = false
  // Convert every gap into an array of possibilities
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] == 0) {
        updated = complete_cell(board, r, c) || updated
      }
    }
  }
  // Look out for any possibility that appears as a possibility
  // once-only in the row, column, or quadrant.
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        let possibilities = board[r][c]
        updated = 
          appears_once_only(board, possibilities, get_row(board, r), r, c) ||
          appears_once_only(board, possibilities, get_column(board, c), r, c) ||
          appears_once_only(board, possibilities, get_square(board, square_coordinates[r][c]), r, c) || updated
      }
    }
  }
  // Reinitialize gaps back to zero before ending
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        board[r][c] = 0
      }
    }
  }
  return updated
}
