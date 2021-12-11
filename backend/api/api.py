import time
from flask import Flask, request
from flask_cors import CORS, cross_origin
from joblib import load
import numpy as np
import pandas as pd
import math

app = Flask(__name__)
cors=CORS(app)
app.config['CORS_HEADERS']='Content-Type'

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/computeco2', methods=['POST'])
def compute_co2():
        #Read input from HTTP Request
        print ("Request ",request.data)
        json_ = request.json
        print ("Input JSON is ",json_)
        print ("Dict is ", json_[0])
        #Convert area to Sq Kms
        #json_[0]['area']= json_[0]['area']
        #print ("Input in SQKMS ", json_)
        #Convert input params to natural log values
        json_[0] = {k: np.log(v) for k, v in json_[0].items()}
        print ("Input as log values ", json_)
        #json_ = [{"population": np.log(1421021794), "gdp": np.log(1.760000e+13), "area": np.log(9424700.8)}]
        #json_ = [{ "gdp": np.log(1.760000e+13), "population": np.log(1421021794), "area": np.log(9424700.8)}]
        query_df = pd.DataFrame(json_)
        query = pd.get_dummies(query_df)
        print ("QUERY IS ", query)
        #Load model from file
        lr = load('model/lr_ph1.sav')
        prediction = lr.predict(query)
        print ("raw prediction is ",prediction[0])
        #Convert output to exp i.e. normal value and return
        return(str(math.exp(prediction[0])*1000000))
        #return("Dummy Response")


@app.route('/co2plan', methods=['POST'])
def plan_co2():
        #Read input from HTTP Request
        print ("Request ",request.data)
        json_ = request.json
        print ("Input JSON is ",json_)
        json_[0]["totalwater"]= json_[0]["totalwater"]*365
        print ("Input JSON after water conversion to yearly is ",json_)

        json_[0] = {k: np.log(v) for k, v in json_[0].items()}
        print ("Input as log values ", json_)

        query_df = pd.DataFrame(json_)
        query = pd.get_dummies(query_df)
        print ("QUERY IS ", query)
        #Load model from file
        lr = load('model/lr_ph2.sav')
        prediction = lr.predict(query)
        print ("Raw Prediction is ", prediction[0][0])
        #Convert output to exp i.e. normal value and return
        print ("Exp value ", str(math.exp(prediction[0][0])))
        return(str(math.exp(prediction[0][0])))
