# Firebase Database

The database stores three types of object: user info data, query data, and survey response data. The schemas are as follows:
## User Info

` user_info{

  }`

The first schema stores each user's information and their rankings. Each user is stored by user0, user1, etc. Inside, we store their name and email (strings) and a map of their ranks as integers for each search query result we present to them.

## Search Queries

queries{
query0{
query: "COVID-19",
returns{
return0: "http://www.google.com/,
return1: "hellofresh.com"
}
}
}

The queries schema stores (query0, query1, etc) each query and its returned results. Each query would first have a value query that corresponds to what we searched. There's also a returns value that maps each website that's returned from that search.

