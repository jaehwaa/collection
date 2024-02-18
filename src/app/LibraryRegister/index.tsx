import { Button, Input, Select } from "antd";
import libraryTemplates, {
  LibraryTemplate,
} from "@/app/mocks/libraryTemplates";
import { useState } from "react";
import hospitals from "@/app/mocks/hospitals";
import libraries, { Library } from "@/app/mocks/libraries";

interface LibraryRegisterProps {
  onAddLibrary: (library: Library) => void;
}

const LibraryRegister = ({ onAddLibrary }: LibraryRegisterProps) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<LibraryTemplate | null>(null);
  const [title, setTitle] = useState("");
  const [hospitalIds, setHospitalIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    const template = libraryTemplates.find((template) => template.id === id);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  const handleAddLibrary = () => {
    if (selectedTemplate) {
      onAddLibrary({
        id: libraries.length + 1,
        libraryTemplateId: selectedTemplate.id,
        title,
        hospitalIds,
      });
    }
  };

  return (
    <article>
      <h1>라이브러리 추가</h1>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder={"라이브러리 템플릿 선택"}
        options={libraryTemplates.map((template) => ({
          label: template.name,
          value: template.id,
        }))}
        onChange={handleSelect}
      />
      {selectedTemplate?.required?.includes("title") && (
        <Input
          placeholder={"title을 입력하세요."}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      {selectedTemplate?.required?.includes("hospitalIds") && (
        <Select
          showSearch
          mode={"multiple"}
          placeholder={"병원을 선택하세요."}
          style={{ width: 200 }}
          options={hospitals.map((hospital) => ({
            label: hospital.name,
            value: hospital.id,
          }))}
          onSelect={(id) => setHospitalIds([...hospitalIds, id])}
        />
      )}
      <Button onClick={handleAddLibrary}>추가</Button>
    </article>
  );
};

export default LibraryRegister;
