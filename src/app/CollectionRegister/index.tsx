import { Library } from "@/app/mocks/libraries";
import { Button, Card, Input, Select } from "antd";
import { useState } from "react";
import libraryTemplates from "@/app/mocks/libraryTemplates";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import collections, {
  Collection,
  CollectionItems,
  Target,
} from "@/app/mocks/collections";
import targetUsers from "@/app/mocks/targetUsers";

interface CollectionRegisterProps {
  libraries: Library[];
  onAddCollection: (collection: Collection) => void;
}

const CollectionRegister = ({
  libraries,
  onAddCollection,
}: CollectionRegisterProps) => {
  const [selectedCollection, setSelectedCollection] = useState<
    CollectionItems[]
  >([]);
  const [target, setTarget] = useState<Target>("default");
  const [collectionName, setCollectionName] = useState("");

  const handleSelect = (id: number) => {
    setSelectedCollection((prev) => {
      const library = libraries.find((lib) => lib.id === id);
      if (library) {
        const collection: CollectionItems = {
          ...library,
          name:
            libraryTemplates.find((lib) => lib.id === library.libraryTemplateId)
              ?.name || "-",
        };
        return [...prev, collection];
      }
      return prev;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    setSelectedCollection((prev) => {
      const newCollection = [...prev];
      const [removed] = newCollection.splice(result.source.index, 1);
      newCollection.splice(result.destination?.index || 0, 0, removed);
      return newCollection;
    });
  };

  const handleTargetChange = (value: Target) => {
    setTarget(value);
  };

  const handleAdd = () => {
    onAddCollection({
      collectionName: collectionName,
      collectionItems: selectedCollection,
      target: target,
      isActive: true,
      id: collections.length + 1,
    });
  };

  return (
    <article>
      <h1>콜렉션 추가</h1>
      <Select
        style={{ width: 200 }}
        placeholder={"대상 사용자"}
        defaultValue={target}
        options={targetUsers}
        onSelect={handleTargetChange}
      />
      <Input
        style={{ width: 200 }}
        placeholder="콜렉션명"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <p>콜렉션에는 하나의 라이브러리만 추가할 수 있음</p>
      <Select
        placeholder="라이브러리를 선택해주세요."
        style={{ width: 200 }}
        options={libraries
          .filter(
            (lib) =>
              !selectedCollection.some(
                (collection) => collection.id === lib.id,
              ),
          )
          .map((library) => ({
            label:
              libraryTemplates.find(
                (lib) => lib.id === library.libraryTemplateId,
              )?.name || "-",
            value: library.id,
          }))}
        onSelect={handleSelect}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="collection">
          {(provided) => (
            <div ref={provided.innerRef}>
              {selectedCollection.map((library, index) => (
                <Draggable
                  key={library.id}
                  draggableId={library.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        title={library.name}
                        bordered={true}
                        style={{ width: 300 }}
                      >
                        {library.title && <p>title: {library.title}</p>}
                        {library.hospitalIds &&
                          library.hospitalIds.length > 0 && (
                            <p>hospitalIds: {library.hospitalIds.join(",")}</p>
                          )}
                        {library.tvIds && library.tvIds.length > 0 && (
                          <p>tvIds: {library.tvIds.join(",")}</p>
                        )}
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleAdd}>추가</Button>
    </article>
  );
};

export default CollectionRegister;
