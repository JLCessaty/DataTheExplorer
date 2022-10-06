# import Flask
from tkinter.tix import COLUMN, INTEGER
from tokenize import String
from flask import Flask, jsonify
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.sql import text

# Flask Setup
app = Flask(__name__)

# create engine to hawaii.sqlite
engine = create_engine("postgresql://postgres:password@localhost:5432/Project3")

# reflect an existing database into a new model
connection = engine.connect()

# reflect an existing database into a new model
#Base = automap_base()

# reflect the tables
#Base.prepare(engine, reflect=True)
#Base.classes.keys()

#populationData = Base.classes.worldpopulationsdata
resultDF = pd.read_sql('SELECT * FROM public."worldpopulationsdata" where public."worldpopulationsdata"."time"=2020 ', connection)

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# List all Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"<b>Home Page: World Population in 2020</b>"
        "<br />"
        "Select a route by clicking the link<br />"
        "<br />"
        "<a href='/api/v1.0/Data' >Population Data</a><br />"
        "<a href='http://127.0.0.1:5500/GT-VIRT-DATA-PT-05-2022-U-LOLC/Project%203/index2.html' target= '_blank'>World map with countries</a><br />"
        "<a href='http://127.0.0.1:5500/GT-VIRT-DATA-PT-05-2022-U-LOLC/Project%203/index.html' target= '_blank'>World map with countries and GDP</a><br />"
    )


#Route to render index.html template using data from {Postgres}
@app.route("/api/v1.0/Data")
def index():
    # Perform a query to retrieve the data and precipitation scores
    #results2 = session.query(resultDF).all()
    session.close()

    #stationsList = list(np.ravel(resultDF))

    # Return JSON
    #return jsonify(resultDF)
    #return jsonify(data=resultDF.to_json(orient='records'))    
    return resultDF.to_html()  


#################################################
if __name__ == '__main__':
    app.run(debug=True)