
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
DB = 'database.db'

def init_db():
    with sqlite3.connect(DB) as conn:
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS clothing (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                category TEXT,
                color TEXT
            )
        ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS outfits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                items TEXT
            )
        ''')
        conn.commit()

init_db()

@app.route('/api/clothing', methods=['GET', 'POST'])
def clothing():
    if request.method == 'POST':
        try:
            image = request.files['image']
            category = request.form['category']
            color = request.form.get('color', '')

            filepath = os.path.join(UPLOAD_FOLDER, image.filename)
            image.save(filepath)

            with sqlite3.connect(DB) as conn:
                c = conn.cursor()
                c.execute('INSERT INTO clothing (image, category, color) VALUES (?, ?, ?)',
                          (image.filename, category, color))
                conn.commit()

            return jsonify({'success': True})
        except Exception as e:
            print("UPLOAD ERROR 🚨:", e)
            return jsonify({'success': False, 'error': str(e)}), 500

    else:
        with sqlite3.connect(DB) as conn:
            c = conn.cursor()
            c.execute('SELECT * FROM clothing')
            rows = c.fetchall()
            data = [{'id': r[0], 'image': r[1], 'category': r[2], 'color': r[3]} for r in rows]
        return jsonify(data)

@app.route('/api/clothing/<int:item_id>', methods=['DELETE'])
def delete_clothing(item_id):
    try:
        with sqlite3.connect(DB) as conn:
            c = conn.cursor()
            c.execute('SELECT image FROM clothing WHERE id = ?', (item_id,))
            row = c.fetchone()
            if row:
                filepath = os.path.join(UPLOAD_FOLDER, row[0])
                if os.path.exists(filepath):
                    os.remove(filepath)
            c.execute('DELETE FROM clothing WHERE id = ?', (item_id,))
            conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        print("DELETE ERROR 🚨:", e)
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/outfits', methods=['GET', 'POST'])
def outfits():
    if request.method == 'POST':
        try:
            data = request.json
            name = data['name']
            items = ','.join(data['items'])

            with sqlite3.connect(DB) as conn:
                c = conn.cursor()
                c.execute('INSERT INTO outfits (name, items) VALUES (?, ?)', (name, items))
                conn.commit()

            return jsonify({'success': True})
        except Exception as e:
            print("OUTFIT ERROR 🚨:", e)
            return jsonify({'success': False, 'error': str(e)}), 500

    else:
        with sqlite3.connect(DB) as conn:
            c = conn.cursor()
            c.execute('SELECT * FROM outfits')
            rows = c.fetchall()
            data = [{'id': r[0], 'name': r[1], 'items': r[2].split(',')} for r in rows]
        return jsonify(data)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route('/api/outfits/<int:outfit_id>', methods=['DELETE'])
def delete_outfit(outfit_id):
    try:
        with sqlite3.connect(DB) as conn:
            c = conn.cursor()
            c.execute('DELETE FROM outfits WHERE id = ?', (outfit_id,))
            conn.commit()
        return jsonify({'success': True})
    except Exception as e:
        print("OUTFIT DELETE ERROR 🚨:", e)
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000)
