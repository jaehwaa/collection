import { Button, message, Modal, Select } from "antd";
import targetUsers from "@/app/mocks/targetUsers";
import { Collection, Target } from "@/app/mocks/collections";
import { useState } from "react";

interface CollectionUpdateModal {
  open: boolean;
  collections: Collection[];
  onClose: () => void;
}

type RegisterCollection = { target: Target; id: number };

const isCollection = (
  collection: Collection | RegisterCollection,
): collection is Collection => {
  return "collectionName" in collection;
};

const CollectionUpdateModal = ({
  open,
  collections,
  onClose,
}: CollectionUpdateModal) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedTarget, setSelectedTarget] = useState<Target>("default");
  const [activeCollections, setActiveCollections] = useState<
    (RegisterCollection | Collection)[]
  >(collections.filter((collection) => collection.isActive));

  const handleDelete = (id: number) => {
    setActiveCollections((prev) =>
      prev.filter((collection) => collection.id !== id),
    );
  };

  const handleSelectTarget = () => {
    setActiveCollections((prev) => [
      ...prev,
      { target: selectedTarget, id: collections.length * 100 },
    ]);
  };

  const handleSelectCollection = (
    collectionId: number,
    registerCollectionId: number,
  ) => {
    setActiveCollections((prev) =>
      prev.map((collection) => {
        if (collection.id === registerCollectionId) {
          return collections.find((c) => c.id === collectionId) || collection;
        }
        return collection;
      }),
    );
  };

  const handleOk = () => {
    const hasDefaultCollection = activeCollections.some(
      (collection) => collection.target === "default",
    );

    if (!hasDefaultCollection) {
      messageApi.error("전체 콜렉션은 필수 값입니다.");
    }
    onClose();
  };

  return (
    <Modal title="콜렉션 변경" open={open} onCancel={onClose} onOk={handleOk}>
      <section>
        <h4>대상 사용자(타겟 그룹)</h4>
        <div style={{ display: "flex" }}>
          <Select
            style={{ width: 200 }}
            placeholder="대상 사용자"
            options={targetUsers}
            value={selectedTarget}
            onChange={setSelectedTarget}
          />
          <Button onClick={handleSelectTarget}>선택</Button>
        </div>
        <p>대상 사용자(타겟 그룹)은 API 응답을 토대로 노출.</p>
      </section>
      <section style={{ display: "flex" }}>
        {activeCollections
          .filter((collection) => !isCollection(collection))
          .map((collection, index) => (
            <div key={`${index}`} style={{ width: 200 }}>
              <h4>{collection.target}</h4>
              <Select
                placeholder={"콜렉션을 선택하세요."}
                options={collections.map((collection) => ({
                  label: collection.collectionName,
                  value: collection.id,
                }))}
                onSelect={(value) =>
                  handleSelectCollection(value, collection.id)
                }
              />
            </div>
          ))}
        {activeCollections.filter(isCollection).map((collection) => (
          <div key={`${collection.id}`} style={{ width: 200 }}>
            <h4>{collection.collectionName}</h4>
            {collection.collectionItems.map((collection) => (
              <div key={collection.id}>{collection.name}</div>
            ))}
            <Button onClick={() => handleDelete(collection.id)}>삭제</Button>
          </div>
        ))}
      </section>
      {contextHolder}
    </Modal>
  );
};

export default CollectionUpdateModal;
