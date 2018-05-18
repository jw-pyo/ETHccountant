# ETHtrace Client

The purpose of this directory is two things:

1. Run the local database(postgresql, mongodb)
2. Script for fetching event periodically

In **run.py**, it starts working daemon of database.

In **fetch_event.py**, it writes down the code for calling events.
Then the **CRONTAB.cmd** outside call the **fetch_event.py** periodically.


