from flask import Flask,jsonify
from flask_restful import Api, Resource
from models import Contents

app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return f"<h1>TechVerse API</h1>"

class Contents(Resource):
    def get(self):
        contents_list = [content.to_dict() for content in Content.query.all()]
        return jsonify(contents_list)
    
api.add_resource(Contents, "/contents")

