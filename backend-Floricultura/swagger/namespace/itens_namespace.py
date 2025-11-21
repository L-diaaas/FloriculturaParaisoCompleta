from flask_restx import Namespace, Resource, fields
from flask import request
from itens.item_route import create_item, get_item, get_all_items, update_item, delete_item

api = Namespace('itens', description='Operações relacionadas aos itens')

item_model = api.model('Item', {
    'compra_id' : fields.Integer(required=True),  # assumindo que existe tabela de compras
    'produto_id' : fields.Integer(required=True),
    'quantidade' : fields.Float(required=True),
    'valor_unitario' : fields.Float(required=True)
})

@api.route('')
class ItemList(Resource):
    @api.doc('get_all_items')
    def get(self):
        return get_all_items()
    
    @api.expect(item_model, validate=True)
    @api.doc('create_item')
    def post(self):
        data = request.get_json()
        result = create_item()
        return result
    
@api.route('/<id_item>')
@api.param('id_item', 'ID do item')
class ItemResource(Resource):
    def get(self, id_item):
        item = get_item(id_item)
        if not item:
            api.abort(404, "Item não encontrado")
        return item
    
    @api.expect(item_model, validate=True)
    def put(self, id_item):
        response = update_item(id_item)

        if hasattr(response, "get_json"):
            try:
                data = response.get_json()
            except Exception:
                data = str(response)
            return data, response.status_code

        if isinstance(response, tuple):
            data, status = response
            return data, status

        return response

    
    def delete(self, id_item):
        sucesso = delete_item(id_item)
        if not sucesso:
            api.abort(404, "Item não eonctrado")
        return {'message': 'Item deletado com sucesso!'}
        
        