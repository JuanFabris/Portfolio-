import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { useState, useEffect } from "react";
import {ScrollManager} from "./components/ScrollManager";
import { Menu } from "./components/Menu";

function App() {

  const [section, setSection] = useState(0)
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);


  return (
    <>
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }} >
      <color attach="background" args={["#ececec"]} />
      <ScrollControls pages={4 } damping={0.1}>
        <ScrollManager section = {section} onSectionChange={setSection}/>
       
          <Experience section={section} menuOpened={menuOpened}/>
       
      <Scroll html>
        <Interface/>
      </Scroll>
      </ScrollControls>
    </Canvas>
    <Menu onSectionChange={setSection} menuOpened = {menuOpened} setMenuOpened={setMenuOpened}/>
    </>
  );
}

export default App;
