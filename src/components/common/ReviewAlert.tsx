import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

interface props {
  id: String
}

export default function ReviewAlert() {
  const router = useRouter()

  const routeToReview = () => {
    router.push(`/review/1`)
  }
  return (
    <>
      <Alert severity="info" className="cursor-pointer" onClick={() => routeToReview()}>
        Click for Review [ชื่อ]
      </Alert>
    </>
  )
}