from db.interface_mongod import DB
from contract_import import contractImport
import fetch_event


class EventManager():
    def __init__(self):
        self.db = DB("127.0.0.1", 27017)
    def login(self, id, pw):
        self.db.connect(str(id), str(pw))

if __name__ == "__main__":
    em = EventManager()
    em.login("jwpyo", 940512)
    em.use_db("testdb")
    em.use_coll("test")
    while True:
        #TODO: if the new event occurs, fetch it from blockchain and insert_many
        sleep(5)
