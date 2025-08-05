import { Suspense } from "react";
import StudentPageWrapper from "@/components/StudentPageWrapper";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <StudentPageWrapper />
    </Suspense>
  );
}
