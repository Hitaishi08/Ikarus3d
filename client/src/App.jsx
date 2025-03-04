import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./app.css";

const models = [
  { name: "Car", url: "/models/car.glb" },
  { name: "Robot", url: "/models/robot.glb" },
  { name: "Tree", url: "/models/tree.glb" },
];

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} />;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0].url);

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>3D Model Viewer</h1>
      <input
        type="text"
        placeholder="Search models..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="model-list">
        {filteredModels.map((model) => (
          <button key={model.url} onClick={() => setSelectedModel(model.url)}>
            {model.name}
          </button>
        ))}
      </div>
      <div className="model-display">
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Model url={selectedModel} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
