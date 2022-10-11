# Firebase Database

The database stores three types of object: user info data, query data, and survey response data. The schemas are as follows:
## User Info

``` 
  user_info{
    email: "justinye@college.harvard.edu" (the user's email),
    first_name: "Justin",
    last_name: "Ye", 
    id: 0 (a unique ID for users)
    responses: [
      0,
      1
    ] (these are reference IDs for each of the responses of the user)
  }
```

The first schema stores each user's information and their rankings. Each user is stored as a separate document in the database. Inside, we store their name and email (strings) and an array of their responses.

## Search Queries
``` 
  queries{
    id: 0 (unique identifier for a query),
    query_text: "Google" (what the user has searched for),
    returns: [
      {
        text: "Google", (title of post)
        description: "This is Google", (description under post)
        return_url: "www.google.com" (url that return links to)
      },

      {
        text: "Bing", (title of post)
        description: "This is Bing", (description under post)
        return_url: "www.bing.com" (url that return links to)
      },
    ] (list of things that a viewer finds after a search)    
  }
```
The queries schema stores (query0, query1, etc) each query and its returned results. Each query would first have a value query that corresponds to what we searched. There's also a returns value that maps each website that's returned from that search.

## Survey Responses
```
  responses {
    id: 0 (unique response id),
    query_id: 1 (id of query being responded to),
    rankings: [
      3, 
      5
    ] (list of rankings for terms in the search return),
    user_id: 0 (id of user making the query)
  }
```
