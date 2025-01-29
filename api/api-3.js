import mysql from 'mysql2/promise';
import express from 'express';

const app = express();
const port = 3000;

const connection = await mysql.createConnection({
    host: '127.0.0.1',
    database: 'marmiton',
    user: 'root',
    password: 'root'
});


app.get('/recipes', async (req, res) => {
    const [results, autres] = await connection.query("SELECT * FROM recipes");
    res.json(results);
});


app.get('/recipes/search', async (req, res) => {
    const [results, autres] = await connection.query("SELECT * FROM recipes WHERE lower(name) like lower(?) or lower(tags) like (?)", [`%${req.query.search}%`, `%${req.query.search}%`]);
    res.json(results);
});

app.get('/recipes/:id', async (req, res) => {
    const [results, autres] = await connection.query("SELECT * FROM recipes WHERE id = ?", [req.params.id]);
    res.json(results);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.post('/recipes', async (req, res) => {
    try{
        const [results] = await connection.query(
            "INSERT INTO recipes (name, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty, cuisine, calories_per_serving, tags, rating, review_count, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [req.body.name, JSON.stringify(req.body.ingredients), JSON.stringify(req.body.instructions), req.body.prep_time_minutes, req.body.cook_time_minutes, req.body.servings, req.body.difficulty, req.body.cuisine, req.body.calories_per_serving, JSON.stringify(req.body.tags), req.body.rating, req.body.review_count, 1]
        );
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    };
});


app.put('/recipes', async (req, res) => {
    try{
        const [results] = await connection.query(
            "UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, prep_time_minutes = ?, cook_time_minutes = ?, servings = ?, difficulty = ?, cuisine = ?, calories_per_serving = ?, tags = ?, rating = ?, review_count = ?, user_id = ? WHERE id = ?",
            [req.body.name, JSON.stringify(req.body.ingredients), JSON.stringify(req.body.instructions), req.body.prep_time_minutes, req.body.cook_time_minutes, req.body.servings, req.body.difficulty, req.body.cuisine, req.body.calories_per_serving, JSON.stringify(req.body.tags), req.body.rating, req.body.review_count, 1, req.params.id]
        );
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    };
});




app.delete('/recipes', async (req, res) => {
    try{
        const [results] = await connection.query(
            "DELETE FROM recipes WHERE id = ?"
        );
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    };
});











