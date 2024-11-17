import { Normalized } from 'types/commons'


const a = {
  mainImageBase64: 'string',
  description: 'string',
  priceUnit: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  price: 0,
  brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  modelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  year: 0,
  vin: 'string',
  modificationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  colorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  mileage: 0,
  purchaseDate: '2024-11-14',
  damaged: true,
  runAndGo: true,
  underWarranty: true,
  clearance: true,
  name: 'string',
  email: 'string',
  phoneNumber: 'string',
  lookupAddress: 'string',
  
  document: 0,
  ownerNumber: 0,
  availability: 0,
  category: 0,
  bodyType: 0,
  engine: 0,
  drive: 0,
  transmission: 0,
}

// const b = {
//   value: [
//     {
//       availability: 0,
//       image: 'https://ddd.com',
//       description: 'string',
//       priceUnitId: '',
//       price: {
//         primary: 5000,
//         secondary: 2000,
//       },
//       status: 'WaitingForPayment',
//       carDetails: {
//         brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         modelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         year: 2_000,
//         vin: 'string',
//         modificationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         colorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         mileage: 20_000,
//         purchaseDate: '2024-11-13',
//         damaged: true,
//         runAndGo: true,
//         underWarranty: true,
//         clearance: true,
//         document: 0,
//         ownerNumber: 0,
//         category: 0,
//         bodyType: 0,
//         engine: 0,
//         drive: 0,
//         transmission: 0,
//       },
//       contactInfo: {
//         contactName: 'string',
//         contactEmail: 'string',
//         contactPhoneNumber: 'string',
//         lookupAddress: 'string',
//       },
//       authorId: 'dc4af850-39f5-4e71-8ce3-1c618fb246f5',
//       authorShortInfo: null,
//       createdDateUtc: '2024-11-13T23:03:46.665187Z',
//       modifiedDateUtc: null,
//       options: [],
//       images: [],
//       id: '83d8a358-1406-442a-af3f-89a6ed4a9362',
//     },
//     {
//       imageId: '25c3555b-28d2-40b3-b6f7-450744b3e3be',
//       description: 'string',
//       availability: 0,
//       price: { unit: '3fa85f64-5717-4562-b3fc-2c963f66afa6', amount: 0 },
//       status: 'WaitingForPayment',
//       carDetails: {
//         brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         modelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         year: 0,
//         vin: 'string',
//         category: 0,
//         bodyType: 0,
//         engine: 0,
//         drive: 0,
//         transmission: 0,
//         modificationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         colorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
//         mileage: 0,
//         document: 0,
//         ownerNumber: 0,
//         purchaseDate: '2024-11-13',
//         damaged: true,
//         runAndGo: true,
//         underWarranty: true,
//         clearance: true,
//       },
//       contactInfo: {
//         contactName: 'string',
//         contactEmail: 'string',
//         contactPhoneNumber: 'string',
//         lookupAddress: 'string',
//       },
//       authorId: 'dc4af850-39f5-4e71-8ce3-1c618fb246f5',
//       createdDateUtc: '2024-11-14T07:03:26.621386Z',
//       modifiedDateUtc: null,
//       author: null,
//       options: [],
//       images: [],
//       id: '66529c2d-3b44-4c8f-b6c5-3ba1cd9d4a2b',
//     },
//   ],
//   isSuccess: true,
//   isFailure: false,
//   error: { code: '', description: null },
// }

export type PostsSlice = {
  list: Normalized<Post>
  favoritePostIds: Post['id'][]
}

export type Post = {
  id: string,
  authorShortInfo: string,
  createdDateUtc: string,
  modifiedDateUtc: string,
  // ?? isAvailable?
  availabilityId: string,
  status: string,
  description: string,
  images: {
    primary: string
    secondaries: string[] 
  }
  carDetails: {
    price: {
      unitId: string
      car: number,
      secondary: number,
    },
    brandId: string,
    modelId: string,
    year: number,
    vin: string,
    modificationId: string,
    colorId: string,
    mileage: number,
    purchaseDate: string,
    damaged: boolean,
    runAndGo: boolean,
    underWarranty: boolean,
    clearance: boolean,
    ownerNumber: number,
    category: string,
    engine: string,
    transmission: string,
    bodyType: string,
    drive: string,
    documentType: string,
  },
  contactInfo: {
    contactName: string,
    contactEmail: string,
    contactPhoneNumber: string,
    lookupAddress: string,
  },
  // ????
  options: string[],
},

export type PostsActionPayloads = {
  initPosts: PostsSlice['list']
}
