
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
