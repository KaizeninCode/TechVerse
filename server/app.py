from flask import Flask
from flask_migrate import Migrate

from models.dbconfig import db
from models.category import Category
from models.comment import Comment
from models.content import Content
from models.subscription import Subscription
from models.user import User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
