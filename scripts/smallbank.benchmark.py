from Naked.toolshed.shell import execute_js, muterun_js
import sys



response = muterun_js('smallbank.benchmark.js')
if response.exitcode == 0:
    print(response.stdout.decode('utf-8'))
else:
    sys.stderr.write(response.stderr)

