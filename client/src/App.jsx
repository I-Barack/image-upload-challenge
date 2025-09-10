import { useUploadContext } from "./hooks/useUploadContext";
import Hero from "./pages/Hero";

function App() {
  const { mode } = useUploadContext();
  return (
    <div className={mode ? "dark" : ""}>
      <Hero />
    </div>
  );
}

export default App;
