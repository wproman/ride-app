import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAuthPersistence } from "./hooks/useAuthPersistence";

function App() {

 useAuthPersistence(); 


  return (
    <CommonLayout>
     
      <Outlet />
    </CommonLayout>
  )
}

export default App
