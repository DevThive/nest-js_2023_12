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
