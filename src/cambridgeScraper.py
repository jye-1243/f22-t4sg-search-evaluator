import csv
import requests as re
from bs4 import BeautifulSoup

# maximum results we want to search within a query
MAX_RESULTS = 5

cambridge_url = 'https://www.cambridgema.gov'
search_url = cambridge_url + '/Search?keyword='

# Keywords being used to search
# top 100 from past 12 months, taken from past12Months.csv
queries = []

with open('past12Months.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count != 0:
            queries.append(row["Search-Term"])
        line_count += 1


def scrape_page(url):
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
