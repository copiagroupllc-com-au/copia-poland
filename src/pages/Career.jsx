import { useState } from "react";
import CareerPage from "../components/career/CareerPage";
import JobDetailPage from "../components/career/JobDetailPage";
import ApplyPage from "../components/career/ApplyPage";

// Internal page states: "careers" | "detail" | "apply"
export default function Careers() {
  const [page, setPage]               = useState("careers");
  const [selectedRole, setSelectedRole] = useState("");

  
  const goDetail = (role) => { setSelectedRole(role); setPage("detail"); };
  const goApply  = (role) => { setSelectedRole(role); setPage("apply"); };
  const goBack   = ()     => { setSelectedRole(""); setPage("careers"); };
  
  return (
    <>
      {page === "careers" && <CareerPage onApply={goDetail} />}
      {page === "detail"  && (
        <JobDetailPage
          jobTitle={selectedRole}
          onApply={() => goApply(selectedRole)}
          onBack={goBack}
        />
      )}
      {page === "apply" && (
        <ApplyPage
          selectedJob={selectedRole}
          onBack={goBack}
        />
      )}
    </>
  );
}
