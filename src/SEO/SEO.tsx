import { Helmet } from 'react-helmet-async'
interface Props {
  title: string
  description: string
  type: 'summary' | 'summary_large_image' | 'app' | 'player'
  img: string
  name: string
}
export default function SEO({ title, description, type, img, name }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:image' content={img} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  )
}
