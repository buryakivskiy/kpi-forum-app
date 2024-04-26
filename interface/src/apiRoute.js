let API_ROUTE

process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://localhost:3333/api'
  : API_ROUTE = 'http://localhost:3333/api'


export default API_ROUTE