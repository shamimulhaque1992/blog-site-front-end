import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/service/getMyProfile";

export default async function HomePage() {
  const user = await getMyProfile();
  return (
    <div className="">
      <Button>Click me</Button>
    </div>
  );
}
