export interface Library {
  id: number;
  libraryTemplateId: number;
  title?: string;
  hospitalIds?: number[];
  tvIds?: number[];
}

const libraries: Library[] = [
  {
    id: 1,
    libraryTemplateId: 10,
    title: "병원 주목 영역 타이틀",
    hospitalIds: [3, 5, 6, 7],
  },
  { id: 2, libraryTemplateId: 1, title: "", hospitalIds: [] },
  { id: 3, libraryTemplateId: 2, title: "", hospitalIds: [] },
  { id: 4, libraryTemplateId: 3, title: "", hospitalIds: [] },
  { id: 5, libraryTemplateId: 5, title: "추천 이벤트", hospitalIds: [] },
  { id: 6, libraryTemplateId: 6, title: "추천 이벤트", hospitalIds: [] },
  { id: 7, libraryTemplateId: 11, title: "여신 TV", tvIds: [1, 2, 3, 4, 5] },
];

export default libraries;
