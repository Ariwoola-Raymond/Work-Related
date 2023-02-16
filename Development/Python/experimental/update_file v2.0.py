import time
import os
import random
import sys

filename = "/Users/raymond/Documents/GitHub/Work-Related/file.txt"
repo_path = "/Users/raymond/Documents/GitHub/Work-Related"
quotes = ["The best way to predict the future is to create it. - Abraham Lincoln",
          "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
          "You can't build a reputation on what you are going to do. - Henry Ford",
          "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
          "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
          "The best way to predict the future is to invent it. -Alan Kay",   
          "It's not about ideas. It's about making ideas happen. -Scott Belsky",
          "Believe you can and you're halfway there. -Theodore Roosevelt",
          "The only way to do great work is to love what you do. -Steve Jobs",
          "You miss 100% of the shots you don't take. -Wayne Gretzky",
          "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey",
          "Success is not final, failure is not fatal: it is the courage to continue that counts. -Winston Churchill",
          "You can't build a reputation on what you are going to do. -Henry Ford",
          "The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
          "Success is not how high you have climbed, but how you make a positive difference to the world. -Roy T. Bennett",
          "The biggest adventure you can ever take is to live the life of your dreams. -Oprah Winfrey",    
          "Don't watch the clock; do what it does. Keep going. -Sam Levenson",    
          "I have not failed. I've just found 10,000 ways that won't work. -Thomas Edison",
          "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. -Steve Jobs"
          ]


def update_file():
    selected_quote = random.choice(quotes)

    with open(filename, "w") as f:
        # Update the contents of the file with the selected quote
        f.write(selected_quote)

    os.chdir(repo_path)
    os.system("git add " + filename)
    os.system('git commit -m "Update quotes"')
    os.system("git push origin main")

def run_at_interval(interval):
    while True:
        update_file()
        time.sleep(interval)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "update":
        update_file()
    else:
        interval = 900 # update every 900 seconds(15 minutes) 
        run_at_interval(interval)
