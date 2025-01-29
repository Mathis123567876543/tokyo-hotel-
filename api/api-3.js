import mysql from 'mysql2/promise';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000; // Port par défaut : 4000

async function startServer() {
    try {
        // Connexion à MySQL
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'tokyohotel', // Vérifiez que c'est bien le bon nom
            user: 'root',
            password: 'root' // Assurez-vous que ce mot de passe est correct
        });

        console.log("Connexion à la base de données réussie");

        // Routes API
        app.get('/booking', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM booking");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/collaborators', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM collaborators");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/hotels', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM hotels");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/options_booking', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM options_bookings");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/room_options', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM room_options");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/room_types', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM room_types");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        app.get('/rooms', async (req, res) => {
            try {
                const [results] = await connection.query("SELECT * FROM rooms");
                res.json(results);
            } catch (error) {
                res.status(500).json({ error: "Erreur lors de la récupération des données." });
            }
        });

        // Démarrage du serveur (une seule fois, après toutes les routes)
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Erreur serveur :", error);
        process.exit(1);
    }
}

// Lancer le serveur
startServer();