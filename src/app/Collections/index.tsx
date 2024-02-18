import { Collection } from "@/app/mocks/collections";
import { Button, Table } from "antd";
import targetUsers from "@/app/mocks/targetUsers";
import { useState } from "react";
import CollectionUpdateModal from "@/app/Collections/CollectionUpdateModal";

interface CollectionProps {
  collections: Collection[];
}

const Collections = ({ collections }: CollectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article>
      <h1>콜렉션</h1>
      <Button onClick={() => setIsModalOpen(true)}>변경하기</Button>
      <Table
        dataSource={collections.map((collection, index) => ({
          key: `collection-${index}`,
          index: index + 1,
          id: collection.id,
          collection: collection.collectionItems,
          collectionName: collection.collectionName,
          targetUser:
            targetUsers.find(({ value }) => value === collection.target)
              ?.label || "-",
          isActive: collection.isActive ? "노출" : "미노출",
        }))}
        columns={[
          {
            title: "",
            dataIndex: "index",
            key: "index",
          },
          {
            title: "콜렉션명",
            dataIndex: "collectionName",
            key: "collectionName",
          },
          {
            title: "콜렉션",
            dataIndex: "collection",
            key: "collection",
            render: (_, { collection }) => {
              return (
                <div>
                  {collection.map((collection) => (
                    <div key={collection.id}>{collection.name}</div>
                  ))}
                </div>
              );
            },
          },
          {
            title: "대상 사용자",
            dataIndex: "targetUser",
            key: "targetUser",
          },
          {
            title: "사용 여부",
            dataIndex: "isActive",
            key: "isActive",
          },
        ]}
      />

      <CollectionUpdateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collections={collections}
      />

      {/*<Modal*/}
      {/*  open={isModalOpen}*/}
      {/*  title="콜렉션 변경"*/}
      {/*  onCancel={() => setIsModalOpen(false)}*/}
      {/*>*/}
      {/*  <section>*/}
      {/*    <Select*/}
      {/*      style={{ width: 200 }}*/}
      {/*      placeholder="대상 사용자"*/}
      {/*      options={targetUsers}*/}
      {/*    />*/}
      {/*  </section>*/}
      {/*  <section style={{ display: "flex" }}>*/}
      {/*    <div style={{ flex: 1 }}>*/}
      {/*      <h4>전체</h4>*/}
      {/*      <Select*/}
      {/*        style={{ width: 100 }}*/}
      {/*        placeholder="전체"*/}
      {/*        defaultValue={defaultCollection.id}*/}
      {/*        options={collections*/}
      {/*          .filter((collection) => collection.target === "default")*/}
      {/*          .map((collection) => ({*/}
      {/*            label: collection.collectionName,*/}
      {/*            value: collection.id,*/}
      {/*            collection,*/}
      {/*          }))}*/}
      {/*      />*/}
      {/*      <div>*/}
      {/*        {defaultCollection.collectionItems.map((collection) => (*/}
      {/*          <div key={collection.id}>*/}
      {/*            {collection.name}*/}
      {/*            <Divider />*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div style={{ flex: 1 }}>*/}
      {/*      <h4>로그인</h4>*/}
      {/*    </div>*/}
      {/*    <div style={{ flex: 1 }}>*/}
      {/*      <h4>로그인/비구매</h4>*/}
      {/*    </div>*/}
      {/*    <div style={{ flex: 1 }}>*/}
      {/*      <h4>비로그인</h4>*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</Modal>*/}
      {/*{contextHolder}*/}
    </article>
  );
};

export default Collections;
