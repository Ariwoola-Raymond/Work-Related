import time
import os
import random

filename = "/Users/raymond/Documents/GitHub/Work Related/file.txt"
repo_path = "/Users/raymond/Documents/GitHub/Work Related"
quotes = [
    "The best way to predict the future is to create it. - Abraham Lincoln",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "You can't build a reputation on what you are going to do. - Henry Ford",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
]

while True:
    with open(filename, "w") as f:
        # Update the contents of the file
        f.write("Current time: " + str(time.time()) + "\n Current Quote: " + random.choice(quotes))

    os.chdir(repo_path)
    # os.system("git add " + filename)
    os.system("git add .")
    os.system('git commit -m "Update file"')
    os.system("git push origin main")

    time.sleep(900) # Wait for 900 seconds(15 minutes) before updating the file again
