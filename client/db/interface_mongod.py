from pymongo import MongoClient
import pymongo
import sys
import json
import pprint

class DB(object):

    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.client = None
        self.db = None
    def connect(self, user, passwd):
        try:
            self.client = MongoClient(host=self.host, port = self.port)
        except:
            raise Exception("Cannot open database")

    def query(self, command, **kwargs):
        self.db.command()

    def use_db(self, db_name):
        try:
            self.db = self.client[db_name]
        except:
            raise Exception("Cannot find DB: {}".format(db_name))

    def use_coll(self, coll_name):
        try:
            self.coll = self.db[coll_name]
        except:
            raise Exception("Cannot execute collection: {}".format(coll_name))
    def insert_one(self, post):
        try:
            ret = self.db.posts.insert_one(json.loads(post))
        except:
            raise Exception("Cannot insert: {}".format(post))
        return ret
    def insert_many(self, posts):
        try:
            ret = self.db.posts.insert_many(json.loads(posts))
        except:
            raise Exception("Cannot insert: {}".format(post))
        return ret.inserted_ids
    def retrieve_one(self, _json):
        try:
            ret = self.db.posts.find_one(json.loads(_json))
            pprint.pprint(ret)
        except:
            raise Exception("Cannot retrieve: {}".format(_json))
    def retrieve_many(self, *argv):
        """
        retrieve multiple rows of db corresponding query.

        example:
            >>> db.retrieve_many()
            print all records

            >>> db.retrieve_many("{ 'username' : 'Alice' }")
            print corresponding records

        :param string argv: json format string which you want to retrieve
        :returns None: if you call .count(), you can get the number of rows as return value
        """

        try:
            query_json = None if (len(argv) == 0) else json.loads(argv[0])
            posts = self.db.posts.find(query_json)
            for post in posts:
                pprint.pprint(post)
        except:
            raise Exception("Cannot retrieve: {}".format(argv[0]))
        return posts
    def create_index(self, index_col, sort=pymongo.ASCENDING, unique=True):
        ret = self.db.profiles.create_index([(index_col, sort)], unique=unique)
        print(ret)
    def index_information(self):
        ret = self.db.profiles.index_information()
        print(ret)





if __name__ == '__main__':
    db = DB("localhost", 27017)
    db.connect(str(sys.argv[1]), str(sys.argv[2])) # user, pwd
    #db_name = str(raw_input("Database name: ")) # database
    db_name = "testdb" # database
    db.use_db(db_name)
    #coll_name = str(raw_input("Collection name: ")) # table
    coll_name = "test"
    db.use_coll(coll_name)
    db.insert_one("""
    {
       "username" : "Alice",
       "balance" : "0.55",
       "account" : "0x51942B862fBbd9b5152252A061DEDFFbFEC0b04D"
    }
    """
    )

    db.retrieve_many()
    # db.create_index("ababab")
    # db.index_information()
