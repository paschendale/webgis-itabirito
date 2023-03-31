import ContentLoader from "react-content-loader";
import { Card, CardHref, CardSubtitle, CardTitle, ServiceCardContainer } from "./styles";

interface ServiceCardProps {
  title?: string;
  subtitle?: string;
  url?: string;
  backgroundColor?: string;
  color?: string;
}

export default function ServiceCard({title,subtitle,url,backgroundColor,color}: ServiceCardProps) {

  if(title !== undefined && title.includes('WebGIS - ')) {
    subtitle = title.split('WebGIS - ')[1]
    title = 'WebGIS'
  }


  return (
    (title === undefined && subtitle === undefined) ? (
      <ServiceCardContainer>
        <ContentLoader 
          speed={1}
          height={150}
          width={150}
          backgroundColor="#cccccc"
          foregroundColor="#e0e0e0"
        >
          <rect x="0" y="0" width="200" height="200"/> 
        </ContentLoader>
      </ServiceCardContainer>
    ) : (
      <ServiceCardContainer>
        <CardHref href={url} target={'_blank'} rel="noreferrer">
          <Card style={{backgroundColor: backgroundColor, color: color}}>
            {
              (
                subtitle !== undefined
              ) ? (
                <>
                  <CardTitle>{title}</CardTitle>
                  <CardSubtitle>{subtitle}</CardSubtitle>
                </>
              ) : (
                <CardTitle>{title}</CardTitle>
              )
            }
          </Card>
        </CardHref>
      </ServiceCardContainer>
    )
  )
}