import requests

def search(query):
    # Make a GET request to the search engine
    response = requests.get(f'https://www.google.com/search?q={query}')
    
    # Check if the request was successful
    if response.status_code == 200:
        # Return the content of the response
        return response.text
    else:
        # Return an error message
        return 'An error occurred while trying to search the internet'

# Example usage
query = 'example search query'
result = search(query)
print(result)
