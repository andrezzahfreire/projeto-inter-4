import psycopg2 
from config import Config
# docker run --name postgres2 -p 800:5432 -e POSTGRES_PASSWORD=root -d postgresdocker run --name postgres2 -p 800:5432 -e POSTGRES_PASSWORD=root -d postgres

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=Config.DB_HOST,
            database=Config.DB_NAME,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            port=Config.DB_PORT
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        raise


tabela_users="""
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
)
"""

tabela_leituras="""
CREATE TABLE IF NOT EXISTS leituras (
	umidade_solo FLOAT NOT NULL,
	data_e_hora timestamp NOT NULL,
	quadrante INT NOT NULL
)
"""

tabela_arduino="""
CREATE TABLE IF NOT EXISTS arduino (
	ip VARCHAR(20) NOT NULL
)
"""

tabela_clima = """
CREATE TABLE IF NOT EXISTS clima (
    time DATE,
    temperature_2m_mean DECIMAL(5, 2),
    rain_sum DECIMAL(5, 2),
    wind_speed_10m_max DECIMAL(5, 2)
);
"""

tabela_solo = """
CREATE TABLE IF NOT EXISTS solo (
    id SERIAL PRIMARY KEY,          
    date DATE NOT NULL,              
    nitrogenio INTEGER NOT NULL,     
    fosforo INTEGER NOT NULL,       
    potassio INTEGER NOT NULL
);
""" 

'''
conn = get_db_connection()
cursor = conn.cursor()
cursor.execute(tabela_users)
cursor.execute(tabela_leituras)
cursor.execute(tabela_arduino)
cursor.execute(tabela_clima)
cursor.execute(tabela_solo)


conn.commit()
conn.close()
'''
