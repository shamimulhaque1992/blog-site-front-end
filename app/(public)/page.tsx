import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/service/getMyProfile";
import Image from "next/image";

export default async function HomePage() {
  const user = await getMyProfile();
  console.log("🚀 ~ HomePage ~ user:", user)
  return (
    <div className="">
      <Button>Click me</Button>
    </div>
  );
}
