// import { Listings } from "./Listings";
// import { Coordinate, Location } from "./LocationTypes"

interface Coordinate {
  lat: number,
  long: number
}

interface Location {
  id: string,
  coordinates: Coordinate
}

const Listings: Location[] = 
[
    { id: "key1", coordinates: { lat: 38, long: 144 }},
    { id: "key2", coordinates: { lat: 38, long: 141} },
    { id: "key13", coordinates: { lat: 38, long: 142} },
]

class LocationService {
  private locations: Location[]
  constructor() {
    this.locations = Listings
  }

    // text search
  public searchListings(listing: string): Location[] {
    const result = this.locations.filter(e => e.id.toLowerCase().includes(listing))
    if (result.length === 0) {
        console.log("Provided listing is not found")
        return result
    } else {
      console.log("Provided listing found")
      return result
    }
  }
  // gps search. change "center" to either the user or pin coordinate
  public findLocationsNearby(center: Coordinate, radius: number): Location[] {
    const result: Location[] = this.locations.filter((location) => {
      return this.isWithinRadius(center, location.coordinates, radius)
    })
    console.log('Found locations within ' + radius + 'km')
    return result
  }

  private calculateDistance(coord1: Coordinate, coord2: Coordinate){
    const earthRadius = 6371 // in km
    const latDiff = (coord2.lat - coord1.lat) * (Math.PI / 180)
    const lonDiff = (coord2.long - coord1.long) * (Math.PI / 180)

    const a = 
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return distance
  }

  private isWithinRadius(center: Coordinate, target: Coordinate, radius: number): boolean {
    const distance = this.calculateDistance(center, target)
    return distance <= radius
  }
}

const ex = new LocationService()
const user = {lat: 38, long: 144}

console.log(ex.searchListings('key'))
console.log(ex.searchListings('not found'))
console.log(ex.searchListings('13'))
console.log(ex.findLocationsNearby(user, 100))
console.log(ex.findLocationsNearby(user, 200))
console.log(ex.findLocationsNearby(user, 500))