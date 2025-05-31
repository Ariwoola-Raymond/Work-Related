
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import csv
import time

BASE_URL = "https://www.emiratesnbd.com/en/help-and-support/"
DOMAIN = "www.emiratesnbd.com"

visited = set()
result_data = []

def is_valid_link(link):
    parsed = urlparse(link)
    return parsed.netloc == DOMAIN or parsed.netloc == ''

def check_fees_and_charges(html):
    soup = BeautifulSoup(html, "html.parser")
    headers = soup.find_all("h2", class_="support-details__section-title")
    for header in headers:
        if "fees and charges" in header.get_text(strip=True).lower():
            return "YES"
    return "NO"

def crawl(url):
    if url in visited:
        return
    visited.add(url)
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return
        soup = BeautifulSoup(response.text, "html.parser")
        tag = check_fees_and_charges(response.text)
        result_data.append({"url": url, "fees_and_charges": tag})

        for link in soup.find_all("a", href=True):
            full_url = urljoin(url, link['href'])
            if is_valid_link(full_url) and full_url.startswith(BASE_URL):
                crawl(full_url)
        time.sleep(1)
    except Exception as e:
        print(f"Error crawling {url}: {e}")

crawl(BASE_URL)

with open("help_and_support_fees_check.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["url", "fees_and_charges"])
    writer.writeheader()
    writer.writerows(result_data)

print("Crawl complete. Output saved to help_and_support_fees_check.csv")
