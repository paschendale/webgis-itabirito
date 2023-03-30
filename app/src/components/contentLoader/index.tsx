import ContentLoader from "react-content-loader"
import { LoaderContainer } from "./styles"

export default function Loader() {
  return (
    <ContentLoader 
      speed={1}
      height={640}
      width={320}
      backgroundColor="#cccccc"
      foregroundColor="#e0e0e0"
    >
      <rect x="10" y="10" width="330" height="80"/> 
      <rect x="10" y="100" width="330" height="80" /> 
      <rect x="10" y="190" width="330" height="80" /> 
      <rect x="10" y="280" width="330" height="80" /> 
      <rect x="10" y="370" width="330" height="80" /> 
      <rect x="10" y="460" width="330" height="80" /> 
      <rect x="10" y="550" width="330" height="80" /> 
      <rect x="10" y="640" width="330" height="80" /> 
    </ContentLoader>
  )
}