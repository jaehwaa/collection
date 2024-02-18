export interface LibraryTemplate {
  id: number;
  name: string;
  required?: LibraryTemplateRequired[];
}

type LibraryTemplateRequired = "title" | "hospitalIds" | "tvIds";

const libraryTemplates: LibraryTemplate[] = [
  {
    id: 1,
    name: "추천 검색어",
  },
  {
    id: 2,
    name: "쇼케이스 배너",
  },
  {
    id: 3,
    name: "퀵 메뉴",
  },
  {
    id: 5,
    name: "추천 이벤트 - 이건 어때요 1줄",
    required: ["title"],
  },
  {
    id: 6,
    name: "추천 이벤트 - 인기 시술 1줄",
    required: ["title"],
  },
  {
    id: 10,
    name: "병원 주목 영역",
    required: ["hospitalIds", "title"],
  },
  {
    id: 11,
    name: "여신 TV 영상",
    required: ["title", "tvIds"],
  },
];

export default libraryTemplates;
