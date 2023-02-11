# import requests
# from bs4 import BeautifulSoup

# url = "https://www.example.com"
# response = requests.get(url)
# soup = BeautifulSoup(response.content, "html.parser")

# # Extract data from the HTML content
# data = soup.find("div", {"id": "example"}).text
# print(data)


# https://www.crummy.com/software/BeautifulSoup/bs4/doc/pip install pyinstaller



import requests
from bs4 import BeautifulSoup

url = "https://beta.emiratesnbd.com/en/foreign-exchange"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

# Find all the links in the page
links = soup.find_all("a")

# Extract the href attribute from each link
for link in links:
    print(link.get("href"))
