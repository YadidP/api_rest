from flask import Flask, request, jsonify, send_from_directory
from db import DB

app = Flask(__name__)
db = DB()

def json_response(data, status=200):
    return jsonify(data), status

@app.route('/')
@app.route('/tipo-alambres')
def home_page():
    return send_from_directory(app.static_folder, 'home/index.html')
    #return send_from_directory(app.static_folder, 'solid/index.html')

@app.route('/inicio')
def inicio_page():
    return send_from_directory(app.static_folder, 'home/inicio.html')

@app.route('/tipo_entregas')
def tipo_entregas_page():
    return send_from_directory(app.static_folder, 'home/tipo_entregas.html')

@app.route('/login')
def login_page():
    return send_from_directory(app.static_folder, 'login/login.html')

@app.route('/dashboard')
def dashboard_page():
    return send_from_directory(app.static_folder, 'dashboard/dashboard.html')

@app.route('/create_user')
def create_user_page():
    return send_from_directory(app.static_folder, 'create_user/create_user.html')

@app.route('/puesto_en_fabrica')
def puesto_en_fabrica_page():
    return send_from_directory(app.static_folder, 'home/puesto_en_fabrica.html')

@app.route('/puesto_en_obra')
def puesto_en_obra_page():
    return send_from_directory(app.static_folder, 'home/puesto_en_obra.html')

@app.route('/cotizar/<nombre_producto>')
def cotizar_page(nombre_producto):
    # In a real app, you would load product data from a database
    # For now, we'll just serve a generic page, assuming it exists
    return send_from_directory(app.static_folder, f'home/cotizacion_{nombre_producto}.html')

@app.route('/cotizar/alambre12_rombo7x7')
def cotizar_alambre12_rombo7x7_page():
    return send_from_directory(app.static_folder, 'home/cotizacion_alambre12_rombo7x7.html')

@app.route('/static/<path:subpath>/<path:filename>')
def serve_static(subpath, filename):
    return send_from_directory(f'static/{subpath}', filename)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        query = f"SELECT id, username FROM users WHERE username = '{username}' AND password = '{password}'"
        user = db.select(query)
        
        if user:
            return json_response({'id': user[0][0], 'username': user[0][1]})
        return json_response({'error': 'Credenciales inválidas'}, 401)
    except Exception as e:
        return json_response({'error': str(e)}, 400)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = db.select("SELECT id, username FROM users")
    result = []
    for u in users:
        result.append({
            "id": u[0],
            "username": u[1]
        })
    return json_response(result)

@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        query = f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')"
        user_id = db.insert(query)
        return json_response({'id': user_id, 'username': data['username']}, 201)
    except Exception as e:
        return json_response({'error': str(e)}, 400)

@app.route('/api/users/', methods=['PUT'])
def update_user():
    data = request.get_json()
    user_id = data['id']
    username = data['username']
    password = data['password']
    
    query = f"UPDATE users SET username = {username}, password = {password} WHERE id = {user_id}"
    
    try:
        updated = db.update(query) > 0
        return json_response({'updated': updated})
    except Exception as e:
        return json_response({'error': str(e)}, 400)

@app.route('/api/users', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    user_id = data['id']
    query = f"DELETE FROM users WHERE id = {user_id}"
    try:
        deleted = db.delete(query) > 0
        return json_response({'deleted': deleted})
    except Exception as e:
        return json_response({'error': str(e)}, 400)

if __name__ == '__main__':
    app.run(debug=True)
