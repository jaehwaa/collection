import { Library } from "@/app/mocks/libraries";

export type Target = "non-login" | "login" | "login-non-purchase" | "default";

export interface CollectionItems extends Library {
  name: string;
}

export interface Collection {
  collectionItems: CollectionItems[];
  target: Target;
  isActive: boolean;
  collectionName: string;
  id: number;
}

const collections: Collection[] = [
  {
    id: 1,
    target: "default",
    isActive: true,
    collectionName: "기본",
    collectionItems: [
      {
        id: 2,
        libraryTemplateId: 1,
        title: "",
        hospitalIds: [],
        name: "추천 검색어",
      },
      {
        id: 3,
        libraryTemplateId: 2,
        title: "",
        hospitalIds: [],
        name: "쇼케이스 배너",
      },
      {
        id: 4,
        libraryTemplateId: 3,
        title: "",
        hospitalIds: [],
        name: "퀵 메뉴",
      },
      {
        id: 5,
        libraryTemplateId: 5,
        title: "추천 이벤트",
        hospitalIds: [],
        name: "추천 이벤트 - 이건 어때요 1줄",
      },
      {
        id: 1,
        libraryTemplateId: 10,
        title: "병원 주목 영역 타이틀",
        hospitalIds: [3, 5, 6, 7],
        name: "병원 주목 영역",
      },
      {
        id: 6,
        libraryTemplateId: 6,
        title: "추천 이벤트",
        hospitalIds: [],
        name: "추천 이벤트 - 인기 시술 1줄",
      },
    ],
  },
  {
    id: 2,
    collectionName: "비로그인",
    collectionItems: [
      {
        id: 2,
        libraryTemplateId: 1,
        title: "",
        hospitalIds: [],
        name: "추천 검색어",
      },
      {
        id: 3,
        libraryTemplateId: 2,
        title: "",
        hospitalIds: [],
        name: "쇼케이스 배너",
      },
      {
        id: 4,
        libraryTemplateId: 3,
        title: "",
        hospitalIds: [],
        name: "퀵 메뉴",
      },
      {
        id: 5,
        libraryTemplateId: 5,
        title: "추천 이벤트",
        hospitalIds: [],
        name: "추천 이벤트 - 이건 어때요 1줄",
      },
      {
        id: 7,
        libraryTemplateId: 11,
        title: "여신 TV",
        tvIds: [1, 2, 3, 4, 5],
        name: "여신 TV 영상",
      },
      {
        id: 6,
        libraryTemplateId: 6,
        title: "추천 이벤트",
        hospitalIds: [],
        name: "추천 이벤트 - 인기 시술 1줄",
      },
    ],
    target: "non-login",
    isActive: false,
  },
];

export default collections;
