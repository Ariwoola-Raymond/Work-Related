import time
import os

filename = "/Users/raymond/Documents/GitHub/Work Related/file.txt"
repo_path = "/Users/raymond/Documents/GitHub/Work Related"

while True:
    with open(filename, "w") as f:
        # Update the contents of the file
        f.write("Current time: " + str(time.time()))

    os.chdir(repo_path)
    # os.system("git add " + filename)
    os.system("git add .")
    os.system('git commit -m "Update file"')
    os.system("git push origin main")

    time.sleep(900) # Wait for 900 seconds(15 minutes) before updating the file again
