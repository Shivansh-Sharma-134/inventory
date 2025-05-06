const pool = require("./pool");


async function listAllItems() {
    const {rows} = await pool.query("SELECT * FROM games");
    console.log(rows);
    return rows;
}