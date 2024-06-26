
// 마이페이지 메뉴
export const navigationItems = [
    {
        "type": "c",
        "id": "info",
        "path": "/mypage/info",
        "label": "내 정보 수정"
    },
    {
        "type": "s",
        "id": "class",
        "path": "/mypage/class",
        "label": "수강중인 강의"
    },
    {
        "type": "s",
        "id": "wish",
        "path": "/mypage/wish",
        "label": "찜한 강의"
    },
    {
        "type": "t",
        "id": "manage",
        "path": "/mypage/open",
        "label": "강의 관리",
        // "subItems": [
        //     {
        //         "type": "",
        //         "id": "",
        //         "path": "/mypage/open/write",
        //         "label": "강의 등록"
        //     },
        //     {
        //         "type": "",
        //         "id": "",
        //         "path": "/mypage/open",
        //         "label": "전체 (3)"
        //     },
        //     {
        //         "type": "",
        //         "id": "",
        //         "path": "/mypage/open?type=100",
        //         "label": "판매중 (1)"
        //     },
        //     {
        //         "type": "",
        //         "id": "",
        //         "path": "/mypage/open?type=200",
        //         "label": "승인대기중 (1)"
        //     },
        //     {
        //         "type": "",
        //         "id": "",
        //         "path": "/mypage/open?type=300",
        //         "label": "판매중지 (1)"
        //     }
        // ]
    },
    {
        "type": "t",
        "id": "profit",
        "path": "/mypage/profit",
        "label": "수익 관리"
    },
    {
        "type": "c",
        "id": "cs",
        "path": "/mypage/cs",
        "label": "고객센터",
        "subItems": [
            {
                "type": "",
                "path": "/mypage/cs/board/notice_list",
                "label": "공지사항"
            },
            {
                "type": "",
                "path": "/mypage/cs/board/fag_list",
                "label": "자주 묻는 질문"
            },
            {
                "type": "",
                "path": "/mypage/cs/board/inquiry_list",
                "label": "문의 내역"
            }
        ]
    }
];