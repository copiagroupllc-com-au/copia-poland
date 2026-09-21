import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CareerPage from "../components/career/CareerPage";
import ApplyPage from "../components/career/ApplyPage";
import { toSlug } from "../data/careerConstants";

// Internal page states: "careers" | "apply"
export default function Careers() {
  const [page, setPage]             = useState("careers");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const goDetail = (role) => { navigate(`/career/${toSlug(role.title)}`); };
  const goApply  = (role) => { setSelectedRole(role); setPage("apply"); };
  const goBack   = ()     => { setSelectedRole(""); setPage("careers"); };

  return (
    <>
      {page === "careers" && <CareerPage onApply={goDetail} />}
      {page === "apply" && (
        <ApplyPage
          selectedJob={selectedRole}
          onBack={goBack}
        />
      )}
    </>
  );
}
