import cambridgeScraper
import firebase_admin
import uuid
from firebase_admin import credentials, firestore


def main():
    cred = credentials.Certificate("./serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)

    store = firestore.client()
    doc_ref = store.collection('queries')

    # counter to ensure we don't surpass firestore handling
    count = 0
    for i in cambridgeScraper.queries:
        count += 5
        if count > 499:
            break
        url = cambridgeScraper.search_url + i + '&resultsPerPage=' + str(cambridgeScraper.MAX_RESULTS)
        results = cambridgeScraper.scrape_page(url)
        doc_ref.add({'id' : str(uuid.uuid4()), 'query_text': i,
                    'returns': [{'text': r[0], 'description': r[1], 'return_url': r[2]} for r in results]})

if __name__ == "__main__":
    main()
