import json
import numpy as np
import joblib
import sys

loaded_model = joblib.load('linear_regression_model.pkl')
features = eval(sys.argv[1])
# print(features['features'])
input_features = np.array(features).reshape(1,-1)
# print(input_features)
predictions = loaded_model.predict(input_features)
predictions = np.mean(input_features)
print(predictions)
