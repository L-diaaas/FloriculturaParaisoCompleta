from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth_routes', __name__, url_prefix='/auth')

USUARIO_FIXO = "funcionario"
SENHA_FIXA = "flori123"

@auth_bp.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    if usuario == USUARIO_FIXO and senha == SENHA_FIXA:
        token = create_access_token(identity=usuario)
        return {"mensagem": "Login realizado com sucesso!", "token": token}, 200
    else:
        return {"erro": "Usuário ou senha incorretos"}, 401