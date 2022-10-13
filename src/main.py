import firebase_admin
from firebase_admin import credentials, firestore

import cambridgeScraper

cred = credentials.Certificate("./serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)

store = firestore.client()
doc_ref = store.collection('queries')

# how to get unique id for each query so that we don't duplicate in DB?
for c, i in enumerate(cambridgeScraper.queries):
    url = cambridgeScraper.search_url + i + '&resultsPerPage=' + str(cambridgeScraper.MAX_RESULTS)
    results = cambridgeScraper.scrape_page(url, i)
    doc_ref.add({'id' : c, 'query_text': i, 'returns': [{'text': r[0], 'description': r[1], 'return_url': r[2]} for r in results]})
