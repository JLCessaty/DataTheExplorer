#Design a Flash API for World Population Data
from flask import Flask, render_template
import psycopg2
from config import username, password

################################################
# Flask Setup
#################################################
app = Flask(__name__)

################################################
# postgres connection
#################################################
# Connect to postgres db

def get_db_connection():
    try: 
        conn = psycopg2.connect(database="worldPopulation", user=username,  
        password=password, host="localhost")
        print("connected")
        
    except:
        print ("I am unable to connect to the database")
    return conn

#################################################
# List all Flask Routes
#################################################
#Route to render index.html template using data from {Postgres}
@app.route("/")
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM worldgdppop;')
    worldgdppop = cur.fetchall()
    print(worldgdppop)
    cur.close()
    conn.close()
    return render_template('index.html', worldgdppop=worldgdppop)
      
#################################################
if __name__ == '__main__':
    app.run(debug=True)