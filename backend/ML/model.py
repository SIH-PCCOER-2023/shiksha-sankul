import sys
import json
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

# Load data from Node.js
input_data = json.loads(sys.argv[1])
features = input_data['features']

# Assuming 'X' is a 2D array where each row represents a set of features
# Train a linear regression model
# X = np.array(features).reshape(-1, 1)
X = features[0]
y = features[1]
# y = np.array(features).reshape(-1, 1)
# print(features)
model = LinearRegression()
model.fit(X, y)

# Make predictions
# predictions = model.predict(X)

joblib.dump(model, '/home/d093w1z/SIH/shiksha-sankul/backend/linear_regression_model.pkl')

# Return predictions to Node.js
result = {'predictions': predictions.tolist()}
print(json.dumps(result))