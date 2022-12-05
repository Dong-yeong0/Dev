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

### 노드( node )
* Elasticsearch를 구성하는 하나의 단위 프로세스를 의미한다.
* 그 역할에 따라 Master-eligible, Data, Ingest, Tribe 노드로 구분할 수 있다.

### master-eligible node
* 클러스터를 제어하는 마스터로 선택할 수 있는 노드를 말함.
* 여기서 master 노드가 하는 역할은 다음과 같음.
* 인덱스 생성, 삭제
* 클러스더 노드들의 추적, 관리
* 데이터 입력 시 어느 샤드에 할당할 것인지

### Data node
* 데이터와 관련된 CRUD 작업과 관련있는 노드.
* 이 노드는 CPU, 메모리 등 자원을 많이 소모하므로 모니터링이 필요하며, master 노드와 분리되는 것이 좋다.

### Ingest node
* 데이터를 변환하는 등 사전 처리 파이프라인을 실행하는 역할을 한다.

### Coordination only node 
* data node와 master-eligible node의 일을 대신하는 이 노드는 대규모 클러스터에서 큰 이점이 있다.
* 즉 로드밸런서와 비슷한 역할을 한다고 보시면 된다.

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
