import FarmAddress from "../../../domain/farm/entity/farm-address.entity"
import Farm from "../../../domain/farm/entity/farm.entity"
import Producer from "../../../domain/producer/entity/producer.entity"

export const validUuidFormat = (): string => {
 return '97fc317b-8842-47d0-8914-80bd3b5eac3a'
}

export const validCpfFormat = (): string => {
  return "292.256.890-39"
 }

export const farmAddressStub = (): FarmAddress => {
  return new FarmAddress(
    'Farm city',
    'Farm state'
  )
}

export const farmStub = (): Farm => {
  return new Farm(
    'Farm name',
    farmAddressStub(),
    validUuidFormat()
  )
}

export const producerStub = (): Producer => {
  return new Producer(
    "Name",
    validCpfFormat()
  )
}

export const inputCreateFarmStub = () => {
  return {
    name: 'Farm name',
    city: 'City',
    state: 'State',
    producerId: '97fc317b-8842-47d0-8914-80bd3b5eac3a',
    totalArea: 10,
    arableArea: 2,
    vegetationArea: 4,
    crops: [
      'cotton',
      'coffe'
    ]
  }
}


export const inputUpdateProducerStub = () => {
  return {
    name: 'Producer Name'
  }
}
