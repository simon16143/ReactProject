from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact4'
mongo = PyMongo(app)

# Settings
CORS(app)

# Database
db = mongo.db.pythonreact4

# Routes
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'company': request.json['company'],
    'nit': request.json['nit'],
    'amount': request.json['amount'],
    'status':request.json['status']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'company': doc['company'],
            'nit': doc['nit'],
            'amount': doc['amount'],
            'status': doc['status']
        })
    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = db.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
       'name': user['name'],
       'email': user['email'],
       'company': user['company'],
       'nit': user['nit'],
       'amount': user['amount'],
       'status': user['status']
  })
@app.route('/users/<id>/', methods=['GET'])
def getLoan(id):
  lst= []
  i = 0
  
  for doc in db.find({'_id': ObjectId(id)}):
      lst.append(int(doc['amount']))
      for i in range(0,len(lst)):  
        if lst[i] == 50000:
          a = 'Undecided'
        if lst[i] < 50000:
          a = 'Approved'
        if lst[i] > 50000:
          a = 'Declined'
        return(a)  


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'company': request.json['company'],
    'nit': request.json['nit'],
    'amount': request.json['amount'],
    'status': request.json['status'],
  }})
  return jsonify({'message': 'User Updated'})

if __name__ == "__main__":
    app.run(debug=True)