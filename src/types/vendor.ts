
export type LatLng = {
  lat: number
  lng: number
}

export type Vendor = {
  id: string
  brandName: string
  ownerName: string
  phone: string
  location: LatLng
  address?: string
  logo?: string
  user_id?: string
  
}
