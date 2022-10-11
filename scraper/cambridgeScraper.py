import requests as re
from bs4 import BeautifulSoup

# keep track of query results in format {query : result}
results = {}    
# maximum results we want to search within a query
MAX_RESULTS = 5

def scrape_page(url, keyword):
    r_obj = re.Session()
    page = r_obj.get(url,
                    headers={'User-Agent': 'T4SG'})

    soup = BeautifulSoup(page.content, 'html.parser')
    div_results = soup.find_all("div", class_="result")

    for i in div_results:
        if keyword not in results:
            results[keyword] = [i.find('a')['href']]
        else:
            results[keyword].append(i.find('a')['href'])


def main():
    cambridge_url = 'https://www.cambridgema.gov'
    search_url = cambridge_url + '/Search?keyword='

    # Keywords being used to search
    keywords = ['water', 'vote']

    for i in keywords:
        url = search_url + i + '&resultsPerPage=' + str(MAX_RESULTS)
        scrape_page(url, i)


if __name__ == '__main__':
    main()
