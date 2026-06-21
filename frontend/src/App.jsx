import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Students from "./pages/Students";
import {Routes , Route} from "react-router-dom";
function App(){
  return(
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/courses" element={<Courses/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/students" element={<Students/>}></Route>
    </Routes>
    </>
  )
}
export default App;