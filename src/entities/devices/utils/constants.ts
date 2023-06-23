import { Nullable } from '@/utils'
import { CarDriveType, CarEcoType, CarFuelType, CarTransmissionType } from './types'

export const CAR_TYPE_NEW = 0
export const CAR_TYPE_USED = 1

export const CAR_TYPE_CONSTANTS_KEYS = ['Новый', 'Б/У']

export const CAR_TYPE_FUEL_PETROL = 0
export const CAR_TYPE_FUEL_DIESEL = 1
export const CAR_TYPE_FUEL_HYBRID = 2
export const CAR_TYPE_FUEL_ELECTRO = 3
export const CAR_TYPE_FUEL_LPG = 4
export const CAR_TYPE_FUEL_NATURAL_GAS = 5
export const CAR_TYPE_FUEL_HYDROGEN = 6

export const CAR_TYPE_FUEL_CONSTANTS_KEYS = [
  'Бензин',
  'Дизель',
  'Гибрид',
  'Электро',
  'Пропан-бутан',
  'Метан',
  'Водород',
]

export const CAR_TYPE_TRANSMISSION_AUTOMATIC = 0
export const CAR_TYPE_TRANSMISSION_ROBOT = 1
export const CAR_TYPE_TRANSMISSION_VARIABLE_SPEED_DRIVE = 2
export const CAR_TYPE_TRANSMISSION_MECHANICS = 3

export const CAR_TYPE_TRANSMISSION_CONSTANTS_KEYS = ['Автоматическая', 'Робот', 'Вариатор', 'Механическая']

export const CAR_TYPE_DRIVE_FWD = 0
export const CAR_TYPE_DRIVE_RWD = 1
export const CAR_TYPE_DRIVE_4WD = 2
export const CAR_TYPE_DRIVE_AWD = 3

export const CAR_TYPE_DRIVE_CONSTANTS_KEYS = ['FWD', 'RWD', '4WD', 'AWD']

export const CAR_TYPE_ECO_EURO_1 = 0
export const CAR_TYPE_ECO_EURO_2 = 1
export const CAR_TYPE_ECO_EURO_3 = 2
export const CAR_TYPE_ECO_EURO_4 = 3
export const CAR_TYPE_ECO_EURO_5 = 4
export const CAR_TYPE_ECO_EURO_6 = 5

export const CAR_TYPE_ECO_CONSTANTS_KEYS = ['EURO 1', 'EURO 2', 'EURO 3', 'EURO 4', 'EURO 5', 'EURO 6']

export const CAR_TYPE_WARRANTY_1 = 0
export const CAR_TYPE_WARRANTY_2 = 1
export const CAR_TYPE_WARRANTY_3 = 2

export const CAR_TYPE_WARRANTY_CONSTANTS_KEYS = ['Отсутствует', 'Страховая с СТО', 'Расширенная']

export const COLOR_TYPE_INTER = 0
export const COLOR_TYPE_BODY = 1

export const CAR_ORDER_BY_YEAR = 'order[year]'
export const CAR_ORDER_BY_MILEAGE = 'order[mileage]'
export const CAR_ORDER_BY_PRICE = 'order[price.value]'

export const CAR_FAVORITE_ADD = 'Add to favorites'
export const CAR_FAVORITE_REMOVED = 'Removed from favorites'

export const CARS_REQUEST_TARGET = '/autos'

export const CAR_SINGLE_URL = CARS_REQUEST_TARGET + '/[id]'

export const COUNTRIES_REQUEST_TARGET = '/countries'

export const CAR_COLLECTION_PRIMARY_KEY = [CARS_REQUEST_TARGET, 'cars-collection']

export const CAR_REQUEST_TARGET = '/autos/:id'

export const CAR_SINGLE_PRIMARY_KEY = [CAR_REQUEST_TARGET, 'car-single']

export const BRANDS_REQUEST_TARGET = '/brands'

export const BRANDS_COLLECTION_PRIMARY_KEY = [BRANDS_REQUEST_TARGET, 'brands-collection']

export const MODELS_REQUEST_TARGET = '/models'

export const MODELS_COLLECTION_PRIMARY_KEY = [MODELS_REQUEST_TARGET, 'models-collection']

export const GENERATIONS_REQUEST_TARGET = '/generations'

export const GENERATIONS_COLLECTION_PRIMARY_KEY = [GENERATIONS_REQUEST_TARGET, 'generations-collection']

export const COLORS_REQUEST_TARGET = '/colors'

export const COLORS_COLLECTION_PRIMARY_KEY = [COLORS_REQUEST_TARGET, 'colors-collection']

export const MANUFACTURERS_REQUEST_TARGET = '/manufacturers'

export const MANUFACTURERS_COLLECTION_PRIMARY_KEY = [MANUFACTURERS_REQUEST_TARGET, 'manufacturers-collection']

export const BODY_TYPES_REQUEST_TARGET = '/body_types'

export const BODY_TYPES_COLLECTION_PRIMARY_KEY = [BODY_TYPES_REQUEST_TARGET, 'body_types-collection']

export const DEALERS_REQUEST_TARGET = '/dealers'

export const DEALERS_COLLECTION_PRIMARY_KEY = [DEALERS_REQUEST_TARGET, 'dealers-collection']

export const ADDRESSES_REQUEST_TARGET = '/addresses'

export const LOCATIONS_COLLECTION_PRIMARY_KEY = [COUNTRIES_REQUEST_TARGET, 'locations-collection']

export const FAVORITES_REQUEST_TARGET = CAR_REQUEST_TARGET + '/favorite'

export const FAVORITES_PRIMARY_KEY = [FAVORITES_REQUEST_TARGET, 'favorites-single']

export const FAVORITES_COLLECTION_REQUEST_TARGET = '/user_car_favorites'

export const FAVORITES_COLLECTION_PRIMARY_KEY = [FAVORITES_COLLECTION_REQUEST_TARGET, 'favorites-collection']

export const FAVORITE_SINGLE_REQUEST_TARGET = FAVORITES_COLLECTION_REQUEST_TARGET + '/id'

export const FAVORITE_SINGLE_PRIMARY_KEY = [FAVORITE_SINGLE_REQUEST_TARGET, 'favorite-single']

export const MANUFACTURERS_COUNTRY_COLLECTION_PRIMARY_KEY = [
  COUNTRIES_REQUEST_TARGET,
  'manufacturer-countries-collection',
]

export const CONFIGURATIONS_REQUEST_TARGET = '/configurations'

export const CONFIGURATIONS_COLLECTION_PRIMARY_KEY = [CONFIGURATIONS_REQUEST_TARGET, 'configurations-collection']

export const FILTER_DATA_REQUEST_TARGET = '/autos/filter-data'

export const FILTER_DATA_COLLECTION_PRIMARY_KEY = [FILTER_DATA_REQUEST_TARGET, 'filter-data-collection']

export const STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET = CARS_REQUEST_TARGET + '/set_visible/:id'

export const STOCK_SINGLE_UPDATE_PRIMARY_KEY = [STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET, 'stock-single-update']

export const CAR_COLLECTION_INITIAL_FILTERS_ATOM_VALUES = {
  page: 1,
  itemsPerPage: 10,
  type: 1,
  brand: null as Nullable<number>,
  model: null as Nullable<number>,
  generation: null as Nullable<number>,
  'location.country.name': null as Nullable<number>,
  'manufacturer.location.country': null as Nullable<number>,
  bodyType: null as Nullable<number>,
  manufacturer: null as Nullable<number>,
  dealer: null as Nullable<number>,
  fuelType: null as Nullable<CarFuelType>,
  transmissionType: null as Nullable<CarTransmissionType>,
  driveType: null as Nullable<CarDriveType>,
  ecoType: null as Nullable<CarEcoType>,
  configuration: null as Nullable<number>,
  price: null as Nullable<number[]>,
  'mileage[between]': null as Nullable<number[]>,
  'ownersCount[between]': null as Nullable<number[]>,
  'year[between]': null as Nullable<number[]>,
  'enginePower[between]': null as Nullable<number[]>,
  'literEngineVolume[between]': null as Nullable<number[]>,
  interiorColors: null as Nullable<number[]>,
  сolors: null as Nullable<number[]>,
}

export const CAR_COLLECTION_INITIAL_FILTERS = {
  ...CAR_COLLECTION_INITIAL_FILTERS_ATOM_VALUES,
  'price.value[gte]': null as Nullable<number>,
  'price.value[lte]': null as Nullable<number>,
  'mileage[between]': null as Nullable<string>,
  'ownersCount[between]': null as Nullable<string>,
  'year[between]': null as Nullable<string>,
  'enginePower[between]': null as Nullable<string>,
  'literEngineVolume[between]': null as Nullable<string>,
}

export const SELECT_FILTER_COLLECTION_INITIAL_FILTERS = {
  page: 1,
  itemsPerPage: 100,
  name: '',
}
