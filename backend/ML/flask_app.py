from flask import Flask, request, jsonify
import sys
app = Flask(__name__)
import joblib

@app.route('/predict', methods=['POST'])
def predict():
    features = request.get_json()['features']
    
    model = joblib.load("Student_mark_prediction_model.pkl")
    
    predicted_marks = model.predict([features]); 
    return jsonify({'predicted_marks': predicted_marks})

if __name__ == '__main__':
    app.run(debug=True)
