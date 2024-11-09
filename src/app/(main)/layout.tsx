import { Suspense } from "react";

import { CreatePostModal } from "@/features/posts/components/create-post-modal";
import type { ReadonlyChildren } from "@/lib/types";

export default function MainLayout({ children }: ReadonlyChildren) {
  return (
    <>
      <Suspense>
        <CreatePostModal />
      </Suspense>
      {children}
    </>
  );
}
