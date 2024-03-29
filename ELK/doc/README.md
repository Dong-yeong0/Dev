# ELK
### https://esbook.kimjmin.net/
---

## Elasticsearch vs RDBMS

1. Elasticsearch : RDBMS

2. mapping : schema

3. index : database

4. type : table

5. document : row

6. field : column

## 클러스터 (Cluseter)

Elasticsearch에서 가장 큰 시스템 단위를 의미하며, 최소 하나 이상의 Node로 이루어진 Node들의
집합.

서로 다른 클러스터는 데이터의 접근, 교환을 할 수 없는 독립적인 시스템으로 유지된다.

여러 대의 서버가 하나의 클러스터를 구성할 수 있고, 한 서버에 여러 개의 클러스터가 존재할 수 있다.

## 노드( node )

Elasticsearch를 구성하는 하나의 단위 프로세스를 의미한다.

그 역할에 따라 Master-eligible, Data, Ingest, Tribe 노드로 구분할 수 있다.

## master-eligible node

클러스터를 제어하는 마스터로 선택할 수 있는 노드를 말함.

여기서 master 노드가 하는 역할은 다음과 같음.

1.인덱스 생성, 삭제

2.클러스더 노드들의 추적, 관리

3.데이터 입력 시 어느 샤드에 할당할 것인지


## Data node

데이터와 관련된 CRUD 작업과 관련있는 노드.

이 노드는 CPU, 메모리 등 자원을 많이 소모하므로 모니터링이 필요하며, master 노드와 분리되는 것이
좋다.

## Ingest node

데이터를 변환하는 등 사전 처리 파이프라인을 실행하는 역할을 한다.


## Coordination only node

data node와 master-eligible node의 일을 대신하는 이 노드는 대규모 클러스터에서 큰 이점이
있다.
즉 로드밸런서와 비슷한 역할을 한다고 보면 된다.


## 인덱스( index )

Elasticsearch에서 index는 RDBMS에서 database와 대응하는 개념.

또한 shard와 replica는 Elasticsearch에만 존재하는 개념이 아니라, 분산 데이터베이스
시스템에도 존재하는 개념.

## 샤드( Shard )

샤딩( sharding )은 데이터를 분산해서 저장하는 방법

즉, Elasticsearch에서 스케일 아웃을 위해 index를 여러 shard로 쪼갠 것.

기본적으로 1개가 존재하며, 검색 성능 향상을 위해 클러스터의 샤드 갯수를 조정하는 튜닝을 하기도 함.


## 복제( Replica )

replica는 또 다른 형태의 shard라고 할 수 있다.

노드를 손실했을 경우 데이터의 신뢰성을 위해 샤드들을 복제하는 것.

따라서 replica는 서로 다른 노드에 존재할 것을 권장한다.


---

## Elasticsearch 특징
Scale out : 샤드를 통해 수평적으로 규모가 늘어날 수 있다.

고가용성 : Replica를 통해 데이터의 안정성을 보장.

Schema Free : Json 문서를 통해 데이터 검색을 수행하므로 shcema 개념이 없다.

Restful : Data CRUD 처리는 Restful API를 통해 수행하고 데이터를 처리 (GET, POST, PUT,
DELETE)

### **REST API**

> **HTTP Method인 GET, POST, PUT, DELETE등 활용**

> **INSERT**
>
> POST http://127.0.0.1/user -d {"name" : "kevin", "gender" : "m" ...}

> **SELECT**
>
> GET http://127.0.0.1/user

등 http 메서드로 데이터를 처리함.



**UNIX curl**

MacOS, Linux와 같은 Unix기반 OS는 curl 명령어로 간편하게 REST API 사용이 가능
Elasticsearc가 있다면 curl commend로 이용해서  elasticsearch 클러스터의 최상위 경로를 호춞하며 다음과 같이 클러스터의 상태 정보가 json 형식으로 return 된다.

출처 : 공식 홈페이지
```
  $ curl -XGET "http://localhost:9200"
    {
      "name" : "어쩌구",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "hpmT8TPiR1Kk69YNao9V3w",
      "version" : {
        "number" : "7.3.0",
        "build_flavor" : "default",
        "build_type" : "tar",
        "build_hash" : "de777fa",
        "build_date" : "2019-07-24T18:30:11.767338Z",
        "build_snapshot" : false,
        "lucene_version" : "8.1.0",
        "minimum_wire_compatibility_version" : "6.8.0",
        "minimum_index_compatibility_version" : "6.0.0-beta1"
      },
      "tagline" : "You Know, for Search"
    }
```

## Query

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
------
## Mapping

### 1. Numeric
long(정수), float(실수) type은 null_value를 통해 null형식을 지정해줄 수 있음 (index
template 사용 : API로 요청해서 만들면 된다.)

  ```
  // [PUT] https://entriPoint/_template/templateName
  {
    "index_patterns": [
      "index명-*"
    ],
    "mappings": {
      "properties": {
        "변수명": {
          "type": "{long, float, double...}",
          "null_value": null
        },
        .
        .
        .
      }
    }
  }

  ```

### 2. String
text와 keyword Type이 존재

"analyzer" : "<애널라이저명>" - 색인에 사용할 애널라이저를 입력하며 디폴트로는 standard
애널라이저를 사용합니다. 토크나이저, 토큰필터들을 따로 지정할수가 없으며 필요하다면 사용자 정의
애널라이저를 settings에 정의 해 두고 사용한다.

"search_analyzer" : "<애널라이저명>" - 기본적으로 text 필드는 match 쿼리로 검색을 할 때
색인에 사용한 동일한 애널라이저로 검색 쿼리를 분석합니다. search_analyzer 를 지정하면
검색시에는 색인에 사용한 애널라이저가 아닌 다른 애널라이저를 사용합니다. 보통 NGram 방식으로 색인을 했을 때는 지정 해 주는 것이 바람직함.

"index" : <true | false> - 디폴트는 true 입니다. false로 설정하면 해당 필드는 역 색인을
만들지 않아 검색이 불가능하게 된다.

"boost" : <숫자 값> - 디폴트는 1 입니다. 값이 1 보다 높으면 풀텍스트 검색 시 해당 필드 스코어
점수에 가중치를 부여합니다. 1보다 낮은 값을 입력하면 가중치가 내려감.

"fielddata" : <true | false> - 디폴트는 false 입니다. true로 설정하면 해당 필드의 색인된
텀 들을 가지고 집계(aggregation) 또는 정렬(sorting)이 가능합니다. 이 설정은 다이나믹 설정으로
이미 정의된 매핑에 true 또는 false로 다시 적용하는 것이 가능하다

### 등등 여러가지 Type 들은 공홈 (https://esbook.kimjmin.net/07-settings-and-mappings)
