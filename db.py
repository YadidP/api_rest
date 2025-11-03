import sqlite3
import os

class DB:
    _instance = None
    
    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            db_path = 'my_database.db'
            cls._instance.conn = sqlite3.connect(db_path, check_same_thread=False)
            cls._instance._create_table()
        return cls._instance
    
    def _create_table(self):
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
            ''')
    
        cur = self.conn.cursor()
        cur.execute("SELECT COUNT(*) FROM users")
        count = cur.fetchone()[0]

        if count == 0:
            self.conn.execute("INSERT INTO users (username, password) VALUES ('admin', 'admin')")

        self.conn.commit()

    def select(self, query):
        cur = self.conn.cursor()
        cur.execute(query)
        return cur.fetchall()
    
    def insert(self, query):
        cur = self.conn.cursor()
        cur.execute(query)
        self.conn.commit()
        return cur.lastrowid
    
    def update(self, query):
        cur = self.conn.cursor()
        cur.execute(query)
        self.conn.commit()
        return cur.rowcount
    
    def delete(self, query):
        return self.update(query)