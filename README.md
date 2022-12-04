## ELK
---
### Elasticsearch vs RDBMS
* Elasticsearch : RDBMS
* mapping : schema
* index : database
* type : table
* document : row
* field : column

### 클러스터 (Cluseter)
* Elasticsearch에서 가장 큰 시스템 단위를 의미하며, 최소 하나 이상의 Node로 이루어진 Node들의 집합.
* 서로 다른 클러스터는 데이터의 접근, 교환을 할 수 없는 독립적인 시스템으로 유지된다.
* 여러 대의 서버가 하나의 클러스터를 구성할 수 있고, 한 서버에 여러 개의 클러스터가 존재할 수 있다.


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
