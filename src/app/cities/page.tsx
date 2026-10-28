import CitiesDirectory from "@/components/CitiesDirectory";
import { shanghaiDate } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default function CitiesPage() {
  return <CitiesDirectory asOf={shanghaiDate()} />;
}
