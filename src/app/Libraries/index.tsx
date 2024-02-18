import { Library } from "@/app/mocks/libraries";
import { Table } from "antd";
import libraryTemplates from "@/app/mocks/libraryTemplates";

interface LibrariesProps {
  libraries: Library[];
}

const Libraries = ({ libraries }: LibrariesProps) => {
  return (
    <article>
      <h1>라이브러리</h1>
      <Table
        dataSource={libraries.map((library) => ({
          key: library.libraryTemplateId,
          name:
            libraryTemplates.find((lib) => lib.id === library.libraryTemplateId)
              ?.name || "-",
          title: library.title,
          hospitalIds: library.hospitalIds?.join(", "),
        }))}
        columns={[
          {
            title: "라이브러리 템플릿명",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "병원 ids",
            dataIndex: "hospitalIds",
            key: "hospitalIds",
          },
        ]}
      />
    </article>
  );
};

export default Libraries;
