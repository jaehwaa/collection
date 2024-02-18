"use client";

import { Divider } from "antd";
import LibraryRegister from "@/app/LibraryRegister";
import { useState } from "react";
import mockLibraries from "@/app/mocks/libraries";
import CollectionRegister from "@/app/CollectionRegister";
import { Collection } from "@/app/mocks/collections";
import mockCollections from "@/app/mocks/collections";
import Libraries from "@/app/Libraries";
import Collections from "@/app/Collections";

export default function Home() {
  const [libraries, setLibraries] = useState(mockLibraries);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);

  return (
    <main>
      <LibraryRegister
        onAddLibrary={(library) => setLibraries((prev) => [...prev, library])}
      />
      <Divider />
      <Libraries libraries={libraries} />
      <Divider />
      <CollectionRegister
        libraries={libraries}
        onAddCollection={(collection) =>
          setCollections((prev) => [...prev, collection])
        }
      />
      <Collections collections={collections} />
    </main>
  );
}
