# 예약 사이트 Nest.js 프로젝트

DB_HOST

DB_PORT

DB_USERNAME

DB_PASSWORD

DB_NAME

DB_SYNC

JWT_SECRET_KEY


API

로그인

localhost:3000/user/login


회원가입

localhost:3000/user/register


유저확인

localhost:3000/user/check/email


프로필

localhost:3000/user/:nickname


공연등록

localhost:3000/show

Ex)
"title": "test1",

"description" : "테스트 공연 소개입니다.",

"showDate": ["2023-12-22 12:22:22","2023-12-24 12:22:22"],

"price": 50000,

"venue": "서울 OO동 OO",

"category": "뮤직"



공연 전체 조회

localhost:3000/show/


공연 상세 조회

localhost:3000/show/detail/:showtitle


공연 검색

localhost:3000/show/search?keyword=(검색할 단어)


예약

localhost:3000/reservation/showid/:showid

ex)

"reservationName" : "testName",

"seats": 3


예약 확인

localhost:3000/reservation/:showid/check


예약 취소

localhost:3000/reservation/showid/:showid/:reservid

아쉬운점: 트랜잭션을 사용하는 방법에 대해서 아직 미숙하게 작업을 한 것이 아쉬우며, entity 관계설정을 하는 부분에서 아쉬운 부분이 많아서 이번 작업을 마무리하면서 아쉬운 마음이 많다.
또한 예약을 하여, 시간을 불러오는 부분에서 시간 테이블을 연결하는 부분에서 오류가 있어서 마무리를 못하고 제출하는 부분이 아쉽다..( 제출을 한 뒤에 마무리를 해보도록 해야겠다..)
