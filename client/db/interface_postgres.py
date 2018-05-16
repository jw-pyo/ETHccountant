import psycopg2
import sys

class DB(object):

    def __init__(self, db, host, port):
        self.db = db
        self.host = host
        self.port = port
    def connect(self, user, passwd):
        try:
            self.conn = psycopg2.connect(database = self.db, user = user, password = passwd, host=self.host, port = self.port)
        except:
            raise Exception("Cannot open database")

    def execute(self, query):
        try:
            cur = self.conn.cursor()
            cur.execute(query)
            if str(query[-1]) == ";":
                cur.commit()
        except:
            raise Exception("Cannot execute query: {}".format(query))
    def close(self):
        try:
            self.conn.close()
        except:
            raise Exception("Cannot close the database: {}".format(self.db))


if __name__ == '__main__':
    db = DB("testdb", "localhost", 5432)
    db.connect(str(sys.argv[1]), str(sys.argv[2]))
    while True:
        db.execute(input("Query > "))
