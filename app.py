from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configuration de la base de données
db_config = {
    "host": "localhot",
    "user": "root",
    "password": "votre_mot_de_passe",
    "database": "votre_base_de_donnees"
}

# Endpoint pour tester la connexion
@app.route('/api/test', methods=['GET'])
def test_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return jsonify({"message": "Connexion à la base de données réussie!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection.is_connected():
            connection.close()

# Endpoint pour obtenir tous les enregistrements d'une table
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM votre_table")
        rows = cursor.fetchall()
        return jsonify(rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Endpoint pour insérer des données
@app.route('/api/data', methods=['POST'])
def insert_data():
    data = request.json
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        sql = "INSERT INTO votre_table (colonne1, colonne2) VALUES (%s, %s)"
        values = (data["colonne1"], data["colonne2"])
        cursor.execute(sql, values)
        connection.commit()
        return jsonify({"message": "Données insérées avec succès!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Lancement de l'application Flask
if __name__ == '__main__':
    app.run(debug=True)