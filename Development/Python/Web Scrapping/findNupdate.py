import requests
from bs4 import BeautifulSoup

# def search(query):
#     # Make a GET request to the search engine
#     response = requests.get(f'https://www.google.com/search?q={query}')
    
#     # Check if the request was successful
#     if response.status_code == 200:
#         # Parse the HTML content of the response
#         soup = BeautifulSoup(response.text, 'html.parser')
        
#         # Find all the search result links
#         links = [link.get('href') for link in soup.find_all('a')]
        
#         # Return the list of links
#         return links
#     else:
#         # Return an error message
#         return 'An error occurred while trying to search the internet'

# def update_html_file(links, file_path):
#     # Open the HTML file for writing
#     with open(file_path, 'w') as file:
#         # Write the HTML header
#         file.write('<html>\n<head>\n</head>\n<body>\n')
        
#         # Write each link as a list item
#         for link in links:
#             file.write(f'<li><a href="{link}">{link}</a></li>\n')
        
#         # Write the HTML footer
#         file.write('</body>\n</html>')

# # Example usage
# query = 'Oluwatobiloba Raymond Ariwoola'
# links = search(query)
# update_html_file(links, 'search_results.html')

####################################################

def search(query):
    # Make a GET request to the search engine
    response = requests.get(f'https://www.google.com/search?q={query}')
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the response
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all the search result links
        links = [link.get('href') for link in soup.find_all('a')]
        
        # Replace "/url?q=" in the links
        links = [link.replace('/url?q=', '') for link in links]
        
        # Return the list of links
        return links
    else:
        # Return an error message
        return 'An error occurred while trying to search the internet'

def update_html_file(links, file_path):
    # Open the HTML file for writing
    with open(file_path, 'w') as file:
        # Write the HTML header
        file.write('<html>\n<head>\n</head>\n<body>\n')
        
        # Write each link as a list item
        for link in links:
            file.write(f'<li><a href="{link}">{link}</a></li>\n')
        
        # Write the HTML footer
        file.write('</body>\n</html>')

# Example usage
query = 'Oluwatobiloba Raymond Ariwoola'
links = search(query)
update_html_file(links, 'search_results.html')