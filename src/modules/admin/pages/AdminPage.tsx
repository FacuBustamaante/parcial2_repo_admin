
import { useUsers } from "../hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserList from "../components/UserList";
import Navbar from "../../../shared/layout/NavBar";

function AdminPage() {
  
  const { data, isLoading } = useUsers(1);

  if (isLoading)
    return (
      <div>
        <ClipLoader />
      </div>
    );
  return (
    <div>
      <Navbar/>
      <h1>Admin Page</h1>
      <UserList users = {data ?? []} />
    
    </div>
  );
}
export default AdminPage;
