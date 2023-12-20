from flask import Flask, request, jsonify
import sys
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    features = request.get_json()['features']
    # ... your model prediction logic here ...
    predicted_marks = 85  # Replace with actual prediction
    return jsonify({'predicted_marks': predicted_marks})

if __name__ == '__main__':
    app.run(debug=True)
