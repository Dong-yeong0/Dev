## ELK
---
### Elasticsearch vs RDBMS
* Elasticsearch : RDBMS
* mapping : schema
* index : database
* type : table
* document : row
* field : column

### Query

```
{
  "_source": true,
  "query": {
    "bool": {
      "must":[
        {
          "match": {
            "document(row)": "value"
          }
        }
       ],
      "filter": [
        {
          // 조건 (where)
          "range": {
            "날짜": {
              // 이상
              "gte": "start", 
              
              // 이하
              "lte": "end"
            }
          }
        }
       ]
    }
  },
  // 정렬
  "sort": [
    {"날짜": "asc"} 
  ],
}
```