import requests as re
from bs4 import BeautifulSoup


# maximum results we want to search within a query
MAX_RESULTS = 1

cambridge_url = 'https://www.cambridgema.gov'
search_url = cambridge_url + '/Search?keyword='

# Keywords being used to search
queries = ['water', 'vote']

def scrape_page(url, keyword):
    results = []
    r_obj = re.Session()
    page = r_obj.get(url,
                    headers={'User-Agent': 'T4SG'})

    soup = BeautifulSoup(page.content, 'html.parser')
    div_results = soup.find_all("div", class_="result")

    for i in div_results:
        a_tag = i.find('a')
        results.append([a_tag.text, i.find("div", class_="description").text, cambridge_url + a_tag['href']])

    return results

def main():
    for i in queries:
        url = search_url + i + '&resultsPerPage=' + str(MAX_RESULTS)
        scrape_page(url, i)


if __name__ == '__main__':
    main()
