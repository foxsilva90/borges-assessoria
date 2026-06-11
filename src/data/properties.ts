export type Property = {
  id: string
  slug: string
  title: string
  address: string
  neighborhood: string
  type: 'apartamento'
  status: 'venda'
  price: number
  area: number
  bedrooms: number
  suites: number
  bathrooms: number
  parking?: number
  iptu?: number
  condominio?: number
  description: string
  highlights: string[]
  amenities: string[]
  photos: string[]
  featured: boolean
}

export const properties: Property[] = [
  {
    id: 'apt-01',
    slug: 'apt-mio-residencial-3-quartos-510k',
    title: 'Apartamento 3 Quartos — Mio Residencial',
    address: 'Av. Mananciais, 1501',
    neighborhood: 'Taquara, Jacarepaguá',
    type: 'apartamento',
    status: 'venda',
    price: 510000,
    area: 89,
    bedrooms: 3,
    suites: 2,
    bathrooms: 2,
    parking: 1,
    iptu: 1912,
    condominio: 1000,
    description:
      'Apartamento no Condomínio Mio Residencial, andar alto com ampla varanda e vista livre. Móveis planejados em todos os ambientes. Infraestrutura completa de lazer.',
    highlights: ['Andar alto', 'Vista livre', 'Ampla varanda', 'Móveis planejados'],
    amenities: ['Piscina', 'Academia', 'Bistrô', 'Salões de jogos', 'Brinquedoteca', 'Hidromassagem', 'Espaço Maraca'],
    photos: [
      '/imoveis/apt-01/01.jpg',
      '/imoveis/apt-01/foto2.jpg',
      '/imoveis/apt-01/foto3.jpg',
      '/imoveis/apt-01/foto4.jpg',
      '/imoveis/apt-01/foto5.jpg',
    ],
    featured: true,
  },
  {
    id: 'apt-02',
    slug: 'apt-mio-residencial-3-quartos-490k',
    title: 'Apartamento 3 Quartos — Mio Residencial',
    address: 'Av. Mananciais',
    neighborhood: 'Taquara, Jacarepaguá',
    type: 'apartamento',
    status: 'venda',
    price: 490000,
    area: 89,
    bedrooms: 3,
    suites: 2,
    bathrooms: 2,
    parking: 1,
    iptu: 2086,
    condominio: 1000,
    description:
      'Apartamento no Condomínio Mio Residencial com ampla varanda e vista livre. Móveis planejados nos quartos, banheiros e cozinha.',
    highlights: ['Vista livre', 'Ampla varanda', 'Móveis planejados', 'Condomínio completo'],
    amenities: ['Piscina', 'Academia', 'Bistrô', 'Salões de jogos', 'Brinquedoteca', 'Hidromassagem', 'Espaço Maraca'],
    photos: [
      '/imoveis/apt-02/foto1.jpg',
      '/imoveis/apt-02/foto2.jpg',
      '/imoveis/apt-02/foto3.jpg',
      '/imoveis/apt-02/foto4.jpg',
      '/imoveis/apt-02/foto5.jpg',
    ],
    featured: true,
  },
  {
    id: 'apt-03',
    slug: 'apt-mio-residencial-2-quartos-430k',
    title: 'Apartamento 2 Quartos — Mio Residencial',
    address: 'Av. Mananciais',
    neighborhood: 'Taquara, Jacarepaguá',
    type: 'apartamento',
    status: 'venda',
    price: 430000,
    area: 67,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parking: 1,
    iptu: 1238,
    condominio: 700,
    description:
      'Apartamento no Condomínio Mio Residencial com suíte, lavabo e móveis planejados nos banheiros, cozinha e quartos.',
    highlights: ['Suíte', 'Lavabo', 'Móveis planejados', 'Condomínio completo'],
    amenities: ['Piscina', 'Academia', 'Bistrô', 'Salões de jogos', 'Brinquedoteca', 'Hidromassagem'],
    photos: [
      '/imoveis/apt-03/foto1.jpg',
      '/imoveis/apt-03/foto2.jpg',
      '/imoveis/apt-03/foto3.jpg',
      '/imoveis/apt-03/foto4.jpg',
      '/imoveis/apt-03/foto5.jpg',
    ],
    featured: false,
  },
  {
    id: 'apt-04',
    slug: 'apt-taquara-boiuna-2-quartos-199k',
    title: 'Apartamento 2 Quartos — Taquara/Boiuna',
    address: 'Taquara / Boiuna',
    neighborhood: 'Taquara, Jacarepaguá',
    type: 'apartamento',
    status: 'venda',
    price: 199000,
    area: 55,
    bedrooms: 2,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    description:
      'Apartamento térreo totalmente mobiliado com sala, 2 quartos, cozinha, banheiro, área de serviço e pequena varanda.',
    highlights: ['Totalmente mobiliado', 'Andar térreo', 'Área de serviço', 'Varanda'],
    amenities: ['Piscina', 'Salão de festas', 'Quadra de esportes', 'Parquinho infantil'],
    photos: [
      '/imoveis/apt-04/foto1.jpg',
      '/imoveis/apt-04/foto2.jpg',
      '/imoveis/apt-04/foto3.jpg',
      '/imoveis/apt-04/foto4.jpg',
      '/imoveis/apt-04/foto5.jpg',
    ],
    featured: false,
  },
]
