import ContentLoader from "react-content-loader"
import { LoaderContainer } from "./styles"

export default function Loader() {
  return (
    <LoaderContainer>
      <ContentLoader 
        speed={1}
        width={300}
        height={80}
        backgroundColor="#cccccc"
        foregroundColor="#e0e0e0"
      >
        <rect x="10" y="40" rx="3" ry="3" width="180" height="10" /> 
        <rect x="10" y="65" rx="3" ry="3" width="250" height="10" /> 
      </ContentLoader>
    </LoaderContainer>
  )
}